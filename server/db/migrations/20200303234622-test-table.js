'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table test(
        ID  SERIAL PRIMARY KEY,
        NAME           TEXT      NOT NULL
      );
    `, { type: Sequelize.QueryTypes.RAW });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE test;
    `, { type: Sequelize.QueryTypes.RAW });
  }
};
