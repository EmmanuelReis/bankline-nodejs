const { Model } = require('sequelize');

const UserSchema = require('#database/schema/user')
const AccountSchema = require('#database/schema/account')
const AccountPlanSchema = require('#database/schema/account-plan')

class UserDbModel extends Model {
    static init(sequelize) {
        super.init(UserSchema.columns, { sequelize, modelName: UserSchema.table_name })
    }

    static associate(models) {
        this.hasOne(models[AccountSchema.table_name], { foreignKey: 'user_id', as: 'account' })
        this.hasMany(models[AccountPlanSchema.table_name], { foreignKey: 'user_id', as: 'account_plans' })
    }
}

module.exports = UserDbModel