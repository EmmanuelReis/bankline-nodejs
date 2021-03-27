const Mongoose = require('mongoose')

const BaseRepository = require('#repository/_base-repository')
const TransactionDB = require('#database/model/transaction')
const TransactionType = require('#model/transaction-type')
const { AccountDB, AccountPlanDB, UserDB, conn } = require('#database/postgres')

class TransactionRepository extends BaseRepository {
    constructor() {
        super(TransactionDB)
    }

    async create(model) {
        const { type, value, source_account_id, target_account_id } = model
        
        const accountDbSource = await AccountDB.findByPk(source_account_id)
        
        if(!accountDbSource)
            throw Error('Ops!')
       
        const source = accountDbSource.get()
        
        const new_balance = source.balance + value * TransactionType[type].factor

        if(new_balance >= 0) {
            const transactionMongo = await Mongoose.startSession();
            const transactionPostgres = await conn.transaction()

            await transactionMongo.startTransaction();

            try {
                accountDbSource.balance = new_balance

                accountDbSource.save({ transaction: transactionPostgres })

                if(type == "TRANSFERENCIA") {
                    const accountDbTarget = await AccountDB.findByPk(target_account_id)
                    
                    if(!accountDbTarget)
                        throw new Error('Ops!')
                    
                    const target = accountDbTarget.get()
                    
                    accountDbTarget.balance = +target.balance + value

                    accountDbTarget.save({ transaction: transactionPostgres })
                }
                else {
                    model.target_account_id = ""
                }

                const new_transaction = new TransactionDB(model)
                
                await new_transaction.save({ session: transactionMongo });

                await transactionMongo.commitTransaction()
                await transactionPostgres.commit()
                
                return new_transaction
            }
            catch(error) {
                await transactionPostgres.rollback()
                await transactionMongo.abortTransaction()
                
                throw new Error("Ops!")
            }
        }

        throw new Error('Ops!')
    }

    async find(id, options) {
        let transactions = await new Promise((resolve, reject) => this._db_model.find(Object.assign({ $or: [{ source_account_id: id }, { target_account_id: id }] }, options),
                                                                                        (error, docs) => { error ? reject(error) : resolve(docs) }))

        let accounts_id = transactions.map(transaction => { return transaction.source_account_id == id ? transaction.target_account_id : transaction.source_account_id })
                                        .filter((account, index, self) => account && self.indexOf(account) == index)
        accounts_id.push(id)

        let types_id = transactions.map(transaction => transaction.type_id).filter((type, index, self) => type && self.indexOf(type) == index)
        let accounts = []
        let types =[]
        let usersByAccount = []

        for(let id of accounts_id) {
            accounts.push(await AccountDB.findByPk(id))
        }

        for(let id of types_id) {
            types.push(await AccountPlanDB.findByPk(id))
        }

        for(let account of accounts) {
            const { id, user_id } = account.get()

            usersByAccount.push({
                account_id: id, 
                user: await UserDB.findByPk(user_id)
            })
        }

        return transactions.map(transaction => {
            const t = transaction._doc
            
            return {
                ...t,
                plan: types.find(type => transaction.type_id == type.id).name, 
                source_user: usersByAccount.find(user => transaction.source_account_id == user.account_id).user.get().name,
                target_user: usersByAccount.find(user => transaction.target_account_id == user.account_id)?.user.get().name ?? ''
            }
        })
    }

    async list() {
        return await new Promise((resolve, reject) => this._db_model.find({}, (error, docs) => { error ? reject(error) : resolve(docs.map(doc => doc._doc)) })) 
    }
}

module.exports = TransactionRepository