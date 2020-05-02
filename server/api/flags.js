const db = require('../db/models');

module.exports = {};

function refreshView(userId) {
  db.customQuery(`
    REFRESH MATERIALIZED VIEW game_rankings_${userId}
  `);
}

module.exports.getReviewFlags = function(userId) {
  return db.customQuery(`
    SELECT review.*, game.name as "gameName" FROM flagged_review 
    JOIN review ON flagged_review."reviewId"=review.id AND flagged_review."gameId"=review."gameId"
    JOIN game ON review."gameId"=game.id
    WHERE flagged_review."userId"=:userId
  `, { userId } )
}

module.exports.flagReview = function(reviewId, gameId, userId) {
  return db.customQuery(`
    INSERT INTO flagged_review ("reviewId", "userId", "gameId")
    VALUES (:reviewId, :userId, :gameId)
  `, { reviewId, userId, gameId } ).then(() => refreshView(userId));
}

module.exports.deleteReviewFlag = function(reviewId, userId) {
  return db.customQuery(`
    DELETE FROM flagged_review
    WHERE "reviewId"=:reviewId AND "userId"=:userId
  `, { reviewId, userId } ).then(() => refreshView(userId));
}

module.exports.getReviewerFlags = function(userId) {
  return db.customQuery(`
    SELECT * FROM flagged_reviewer WHERE "userId"=:userId
  `, { userId } );
}

module.exports.flagReviewer = function(reviewerId, userId) {
  return db.customQuery(`
    INSERT INTO flagged_reviewer ("reviewerId", "userId")
    VALUES (:reviewerId, :userId)
  `, { reviewerId, userId } ).then(() => refreshView(userId));
}

module.exports.deleteReviewerFlag = function(reviewerId, userId) {
  return db.customQuery(`
    DELETE FROM flagged_reviewer
    WHERE "reviewerId"=:reviewerId AND "userId"=:userId
  `, { reviewerId, userId } ).then(() => refreshView(userId));
}