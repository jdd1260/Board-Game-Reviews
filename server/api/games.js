const db = require("../db/models/");

const regulatingReviewScore = 5.5;
const regulatingReviewCount = 200;
const customParams = { regulatingReviewScore, regulatingReviewCount };

module.exports = {};

const allowedSortFields = [
  "name",
  "play_time",
  "min_age",
  "bgg_rank",
  "custom_rank",
  "bgg_score",
  "bgg_average",
  "custom_avg",
  "bgg_num_reviews",
  "review_count"
];

module.exports.getGame = async function(id, userId) {
  const gameWithCustomRankingQuery = `
    SELECT *, game_rankings_${userId}.* FROM game
    JOIN game_rankings_${userId} ON game.id=game_rankings_${userId}."gameId"
    WHERE game.id=:id
  `;
  const [game, mechanics, categories, designers] = await Promise.all([
    db.customQuery(gameWithCustomRankingQuery, { id, userId }).then(r => r[0]),
    db.customQuery(`SELECT * FROM game_mechanic WHERE "gameId"=:id`, { id }),
    db.customQuery(`SELECT * FROM game_category WHERE "gameId"=:id`, { id }),
    db.customQuery(`SELECT * FROM game_designer WHERE "gameId"=:id`, { id })
  ]);
  if (game) {
    game.mechanics = mechanics.map(r => r.mechanic);
    game.categories = categories.map(r => r.category);
    game.designers = designers.map(r => r.designer);
  }
  return game;
};

module.exports.getGames = async function(
  {
    sortBy = "bgg_rank",
    sortDescending = false,
    page = 0,
    category,
    designer,
    mechanic
  },
  userId
) {
  if (!allowedSortFields.includes(sortBy)) {
    throw Error("Sort By field not allowed");
  }
  const joinField = category
    ? "category"
    : mechanic
    ? "mechanic"
    : designer
    ? "designer"
    : null;
  const query = `
    SELECT 
      ${allowedSortFields.join(", ")}, thumbnail, game.id
    FROM game
      JOIN game_rankings_${userId} ON game.id=game_rankings_${userId}."gameId"
      ${
        joinField
          ? `JOIN game_${joinField} on game.id=game_${joinField}."gameId" WHERE ${joinField}=:${joinField}`
          : ""
      }
      ORDER BY ${sortBy} ${
    sortDescending === "true" ? "DESC" : "ASC"
  } NULLS LAST, bgg_rank DESC NULLS LAST
    LIMIT 10
    OFFSET :page*10
  `;
  return db.customQuery(query, { page, category, mechanic, designer, sortBy });
};

module.exports.createView = function(userId) {
  const statement = `
    CREATE MATERIALIZED VIEW IF NOT EXISTS game_rankings_${userId} AS (
      WITH scores AS (
        SELECT 
          "gameId", 
          ROUND((SUM("rating")+:regulatingReviewCount*:regulatingReviewScore)/(COUNT(*)+:regulatingReviewCount), 2) as custom_avg, 
          COUNT(*) as "review_count"
        FROM review
        WHERE 
          review.id NOT IN (SELECT "reviewId" FROM flagged_review WHERE "userId"=:userId) AND
          review."reviewerId" NOT IN (SELECT "reviewerId" FROM flagged_reviewer WHERE "userId"=:userId)
        GROUP BY "gameId"
      ) 
      SELECT *, RANK() OVER (ORDER BY custom_avg DESC) custom_rank FROM scores
    ) WITH DATA;
    CREATE UNIQUE INDEX IF NOT EXISTS game_rankings_${userId}_pkey ON game_rankings_${userId} ("gameId");
  `;
  return db.customQuery(statement, { userId, ...customParams });
};
