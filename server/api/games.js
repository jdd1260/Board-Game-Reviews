const db = require('../db/models/');

module.exports = {};
module.exports.getGame =  async function(id) {
  return (await db.customQuery("SELECT * FROM test WHERE id=:id", { id }))[0];
}