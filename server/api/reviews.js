const db = require('../db/models');
const compact = require('lodash/compact');

module.exports = {};
module.exports.getReviews = async function(params) {
  const whereClause = compact(['id', 'gameId', 'reviewerId'].map(field => params[field] && `"${field}" = :${field}`)).join(', ');
  if (!whereClause) {
    throw new Error("You must provide at least one of id, gameId, and reviewerId");
  }
  return (await db.customQuery(`SELECT * FROM review WHERE ${whereClause}`, params));
}