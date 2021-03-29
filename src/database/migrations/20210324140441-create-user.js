const UserSchema = require("#database/schema/user")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(UserSchema.table_name, UserSchema.columns)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(UserSchema.table_name);
  }
};
