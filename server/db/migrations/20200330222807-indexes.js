'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE INDEX "review-reviewer" ON "review" ("reviewerId");
      CREATE INDEX "review-game" ON "review" ("gameId");

      CREATE INDEX "mechanic-game" ON "game_mechanic" ("gameId");
      CREATE INDEX "mechanic" ON "game_mechanic" ("mechanic");
      CREATE INDEX "designer-game" ON "game_designer" ("gameId");
      CREATE INDEX "designer" ON "game_designer" ("designer");
      CREATE INDEX "category-game" ON "game_category" ("gameId");
      CREATE INDEX "category" ON "game_category" ("category");
     
    `, {  type: Sequelize.QueryTypes.RAW });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP INDEX "review-reviewer";
      DROP INDEX "review-game";

      DROP INDEX "mechanic-game";
      DROP INDEX "mechanic";
      DROP INDEX "designer-game";
      DROP INDEX "designer";
      DROP INDEX "category-game";
      DROP INDEX "category";
    `, {  type: Sequelize.QueryTypes.RAW });
  }
};
