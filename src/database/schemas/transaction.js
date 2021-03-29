const { DataTypes } = require("sequelize");

const BaseColumns = require('#database/schema/_base')
const AccountSchema = require('#database/schema/account')
const AccountPlanSchema = require('#database/schema/account-plan')

module.exports = {
    table_name: 'transactions',
    columns: {
        ...BaseColumns,
        value: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 0
        },
        type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: AccountPlanSchema.table_name,
                key: 'id'
            }
        },
        source_account_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: AccountSchema.table_name,
                key: 'id'
            }
        },
        target_account_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: AccountSchema.table_name,
                key: 'id'
            }
        }
    }
}