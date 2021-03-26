const AccountSchema = require("#database/schema/account")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(AccountSchema.table_name, AccountSchema.columns)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(AccountSchema.table_name);
  }
};
