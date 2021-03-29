require('dotenv').config()

const CryptoJS = require('crypto-js')
const { DataTypes } = require("sequelize");

const BaseColumns = require('#database/schema/_base')

module.exports = {
    table_name: 'users',
    columns: {
        ...BaseColumns,
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 0
        },
        login: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
            set(value) {
                this.dataValues.password = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString()
            },
            get() {
                return CryptoJS.AES.decrypt(this.dataValues.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
            }
        }
    }
}