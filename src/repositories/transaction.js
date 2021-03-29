const Mongoose = require('mongoose')
const Boom = require('@hapi/boom')

const BaseRepository = require('#repository/_base-repository')
const TransactionDB = require('#database/model/transaction')
const TransactionType = require('#model/transaction-type')
const { AccountDB, AccountPlanDB, UserDB, Op, conn } = require('#database/postgres')

class TransactionRepository extends BaseRepository {
    constructor() {
        super(TransactionDB)
    }

    async create(model) {
        const { type, value, source_account_id, target_account_id } = model
        
        const accountDbSource = await AccountDB.findByPk(source_account_id)
        
        if(!accountDbSource)
            throw Boom.notFound('Source account not found')
       
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
                        throw Boom.notFound('Target account not found')
                    
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
                
                throw new Boom.internal()
            }
        }

        throw Boom.notAcceptable('Insufficient funds')
    }

    async find(id, options) {
        let transactions = await this._db_model.find(Object.assign({ $or: [{ source_account_id: id }, { target_account_id: id }] }, options))

        let types_id = transactions.map(transaction => transaction.type_id).filter((type, index, self) => type && self.indexOf(type) == index)
        let accounts_id = transactions.map(transaction => { return transaction.source_account_id == id ? transaction.target_account_id : transaction.source_account_id })
                                        .filter((account, index, self) => account && self.indexOf(account) == index)
        accounts_id.push(id)

        let accounts = await AccountDB.findAll({ [Op.or]: accounts_id, include: ['user'] })
        let types = await AccountPlanDB.findAll({ [Op.or]: types_id })

        return transactions.map(transaction => {
            return {
                ...transaction._doc,
                plan: types.find(type => transaction.type_id == type.id).name, 
                source_user: accounts.find(account => transaction.source_account_id == account.get().id).user.get().name,
                target_user: transaction.target_account_id ? accounts.find(account => transaction.target_account_id == account.get().id).user.get().name : ''
            }
        })
    }

    async list() {
        return await this._db_model.find() 
    }
}

module.exports = TransactionRepository