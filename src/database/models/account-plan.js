const { Model } = require('sequelize');

const AccountPlanSchema = require('#database/schema/account-plan')
const UserSchema = require('#database/schema/user')

class AccountPlanDbModel extends Model {
    static init(sequelize) {
        super.init(AccountPlanSchema.columns, { sequelize, modelName: AccountPlanSchema.table_name })
    }

    static associate(models) {
        this.belongsTo(models[UserSchema.table_name], { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = AccountPlanDbModel