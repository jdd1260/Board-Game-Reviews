const db = require('../db/models');

module.exports = {};
module.exports.getReviewFlags = function(userId) {
  return db.customQuery(`
    SELECT review.*, game.name as "gameName" FROM flagged_review 
    JOIN review ON flagged_review."reviewId"=review.id
    JOIN game ON review."gameId"=game.id
    WHERE flagged_review."userId"=1
  `, { userId } )
}

module.exports.flagReview = function(reviewId, userId) {
  return db.customQuery(`
    INSERT INTO flagged_review ("reviewId", "userId")
    VALUES (:reviewId, :userId)
  `, { reviewId, userId } );
}

module.exports.deleteReviewFlag = function(reviewId, userId) {
  return db.customQuery(`
    DELETE FROM flagged_review
    WHERE "reviewId"=:reviewId AND "userId"=:userId
  `, { reviewId, userId } );
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
  `, { reviewerId, userId } );
}

module.exports.deleteReviewerFlag = function(reviewerId, userId) {
  return db.customQuery(`
    DELETE FROM flagged_reviewer
    WHERE "reviewerId"=:reviewerId AND "userId"=:userId
  `, { reviewerId, userId } );
}