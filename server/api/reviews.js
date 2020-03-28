const db = require('../db/models');
const compact = require('lodash/compact');

module.exports = {};
module.exports.getReviews = async function(params, userId) {
  let whereClause = compact(['id', 'gameId', 'reviewerId'].map(field => params[field] && `"${field}" = :${field}`)).join(', ');
  if (!whereClause) {
    throw new Error("You must provide at least one of id, gameId, and reviewerId");
  }
  const allowFlagged = params.allowFlagged === 'true';
  if (!allowFlagged) {
    whereClause += `
      AND review.id NOT IN (SELECT "reviewId" FROM flagged_review WHERE flagged_review."userId"=:userId)
      AND "reviewerId" NOT IN (SELECT "reviewerId" FROM flagged_reviewer WHERE flagged_reviewer."userId"=:userId)
    `;
  }
  const query = `
    SELECT review.* ${ params.reviewerId ? ', game.name as "gameName"' : ''} FROM review 
    LEFT OUTER JOIN flagged_review ON flagged_review."reviewId" = review.id
    ${ params.reviewerId ? 'JOIN game ON review."gameId"=game.id' : ''}
    WHERE ${whereClause} LIMIT 50
  `;
  return (await db.customQuery(query, { ...params, userId } ));
}