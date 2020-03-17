'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    CREATE TABLE "game" (
      "id" VARCHAR(255) NOT NULL,
      "name" VARCHAR(255) NOT NULL,
      "thumbnail" VARCHAR(255),
      "description" TEXT,
      "bgg_rank" integer,
      "bgg_average" FLOAT,
      "bgg_num_reviews" integer,
      "bgg_score" FLOAT,
      "play_time" integer,
      "min_play_time" integer,
      "max_play_time" integer,
      "min_players" integer,
      "max_players" integer,
      "min_age" FLOAT,
      CONSTRAINT "game_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );

    CREATE TABLE "game_category" (
      "id" serial NOT NULL,
      "gameId" VARCHAR(255) NOT NULL REFERENCES "game"("id"),
      "category" VARCHAR(255) NOT NULL,
      CONSTRAINT "game_category_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    
    CREATE TABLE "game_designer" (
      "id" serial NOT NULL,
      "gameId" VARCHAR(255) NOT NULL REFERENCES "game"("id"),
      "designer" VARCHAR(255) NOT NULL,
      CONSTRAINT "game_designer_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    
    CREATE TABLE "game_mechanic" (
      "id" serial NOT NULL,
      "gameId" VARCHAR(255) NOT NULL REFERENCES "game"("id"),
      "mechanic" VARCHAR(255) NOT NULL,
      CONSTRAINT "game_mechanic_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );

    CREATE TABLE "user" (
      "id" serial NOT NULL,
      "name" VARCHAR(255) NOT NULL,
      CONSTRAINT "user_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );

    CREATE TABLE "reviewer" (
      "id" VARCHAR(255) NOT NULL,
      "name" VARCHAR(255) NOT NULL,
      CONSTRAINT "reviewer_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    
    CREATE TABLE "review" (
      "id" serial NOT NULL,
      "reviewerId" VARCHAR(255) NOT NULL REFERENCES "reviewer"("id"),
      "gameId" VARCHAR(255) NOT NULL REFERENCES "game"("id"),
      "rating" integer NOT NULL,
      "comment" TEXT,
      CONSTRAINT "review_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    
    CREATE TABLE "flagged_reviewer" (
      "id" serial NOT NULL,
      "reviewerId" VARCHAR(255) NOT NULL REFERENCES "reviewer"("id"),
      "userId" INT NOT NULL REFERENCES "user"("id"),
      CONSTRAINT "flagged_reviewer_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    
    CREATE TABLE "flagged_review" (
      "id" serial NOT NULL,
      "reviewId" INT NOT NULL REFERENCES "review"("id"),
      "userId" INT NOT NULL REFERENCES "user"("id"),
      CONSTRAINT "flagged_review_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    `, { type: Sequelize.QueryTypes.RAW });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "flagged_review", "flagged_reviewer", "review", "reviewer", "user", "game_category", "game_designer", "game_mechanic", "game";
    `, { type: Sequelize.QueryTypes.RAW });
  }
};
