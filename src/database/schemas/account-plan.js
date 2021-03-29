const { DataTypes } = require('sequelize');

const BaseColumns = require('#database/schema/_base')
const UserSchema = require('#database/schema/user')

module.exports = {
    table_name: 'account_plans',
    columns: {
        ...BaseColumns,
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        type_code: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: UserSchema.table_name,
                key: 'id'
            }
        }
    }
}