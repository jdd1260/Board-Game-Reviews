'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      TRUNCATE TABLE flagged_review;
      ALTER TABLE flagged_review ADD COLUMN "gameId" VARCHAR(255) NOT NULL REFERENCES "game"("id");
    `, {  type: Sequelize.QueryTypes.RAW });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE flagged_review DROP COLUMN "gameId";
    `, {  type: Sequelize.QueryTypes.RAW });
  }
};
