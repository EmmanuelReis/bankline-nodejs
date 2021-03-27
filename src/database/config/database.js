require('dotenv').config()

module.exports = {
  postgres: {
    username: process.env.POSTGRES_USER_DB,
    password: process.env.POSTGRES_PASSWD_DB,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "mysql",
    define:{
      timestamps: false,
      underscored: true,
      freezeTableName: true 
    }
  },
  mongo: {
    username: process.env.MONGO_USER_DB,
    password: process.env.MONGO_PASSWD_DB,
    database: process.env.MONGO_DATABASE,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  }
}
