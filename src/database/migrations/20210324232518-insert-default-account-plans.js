const { v4 } = require('uuid')

const now = (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`INSERT INTO account_plans (id, name, type_code, created_at, updated_at, active) values ("${v4()}", "RECEITA", "R", "${now}", "${now}", true),
                                                                                                                            ("${v4()}", "DESPESA", "D", "${now}", "${now}", true),
                                                                                                                            ("${v4()}", "TRANSFERENCIA", "T", "${now}", "${now}", true)`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DELETE FROM account_plans WHERE user_id IS NULL')
  }
};
