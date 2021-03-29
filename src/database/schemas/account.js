const { DataTypes } = require('sequelize');

const BaseColumns = require('#database/schema/_base')
const UserSchema = require('#database/schema/user')

module.exports = {
    table_name: 'accounts',
    columns: {
        ...BaseColumns,
        saldo: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserSchema.table_name,
                key: 'id'
            }
        }
    }
}