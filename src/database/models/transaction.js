const { Model } = require('sequelize');

const TransactionSchema = require('#database/schema/transaction')
const AccountSchema = require('#database/schema/account')

class TransactionDbModel extends Model {
    static init(sequelize) {
        super.init(TransactionSchema.columns, { sequelize, modelName: TransactionSchema.table_name })
    }

    static associate(models) {
        this.belongsTo(models[AccountSchema.table_name], { foreignKey: 'source_account_id', as:'source_account' })
        this.belongsTo(models[AccountSchema.table_name], { foreignKey: 'target_account_id', as:'target_account' })
    }
}

module.exports = TransactionDbModel