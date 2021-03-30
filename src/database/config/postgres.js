require('dotenv').config()

module.exports = {
    username: process.env.POSTGRES_USER_DB,
    password: process.env.POSTGRES_PASSWD_DB,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    define:{
        timestamps: false,
        underscored: true,
        freezeTableName: true 
    },
    dialectOptions: {
        ssl: { 
            require: true,
            rejectUnauthorized: false 
        }
    }
}