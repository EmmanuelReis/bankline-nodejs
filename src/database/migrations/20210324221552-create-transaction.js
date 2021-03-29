const TransactionSchema = require("#database/schema/transaction")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TransactionSchema.table_name, TransactionSchema.columns)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TransactionSchema.table_name);
  }
};
