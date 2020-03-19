const db = require('../db/models');

module.exports = {};
module.exports.getUsers = function() {
  return db.customQuery(`SELECT id, name FROM public.user`);
}