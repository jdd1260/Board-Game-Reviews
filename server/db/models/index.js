const Sequelize = require('sequelize');

const db = require("../../db");

module.exports = {};
module.exports.customQuery = function customQuery(queryString, replacements = {}, queryType = Sequelize.QueryTypes.SELECT) {
  return db.query(queryString, { replacements, type: queryType });
}