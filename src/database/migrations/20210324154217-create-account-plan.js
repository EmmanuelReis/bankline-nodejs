const AccountPlanSchema = require("#database/schema/account-plan")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(AccountPlanSchema.table_name, AccountPlanSchema.columns)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(AccountPlanSchema.table_name);
  }
};
