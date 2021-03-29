const { v4 } = require('uuid')

const now = (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ')
const AccountPlanSchema = require('#database/schema/account-plan')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`INSERT INTO ${AccountPlanSchema.table_name} (id, name, type_code, created_at, updated_at, active) VALUES ('${v4()}', 'RECEITA', 'R', '${now}', '${now}', true),
                                                                                                                            ('${v4()}', 'DESPESA', 'D', '${now}', '${now}', true),
                                                                                                                            ('${v4()}', 'TRANSFERENCIA', 'T', '${now}', '${now}', true)`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DELETE FROM ${AccountPlanSchema.table_name} WHERE user_id IS NULL`)
  }
};
