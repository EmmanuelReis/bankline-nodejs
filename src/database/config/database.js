require('dotenv').config()

module.exports = {
  username: process.env.SEQUELIZE_USER_DB,
  password: process.env.SEQUELIZE_PASSWD_DB,
  database: process.env.SEQUELIZE_DATABASE,
  host: process.env.HOST,
  dialect: "mysql",
  define:{
    timestamps: false,
    underscored: true,
    freezeTableName: true 
  }
}
