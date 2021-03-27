const { Model } = require('sequelize');

const UserSchema = require('#database/schema/user')
const AccountSchema = require('#database/schema/account')
const TransactionSchema = require('#database/schema/transaction')

class AccountDbModel extends Model {
    static init(sequelize) {
        super.init(AccountSchema.columns, { sequelize, modelName: AccountSchema.table_name })
    }

    static associate(models) {
        this.belongsTo(models[UserSchema.table_name], { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = AccountDbModel