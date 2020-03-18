const db = require('../db/models/');

module.exports = {};
module.exports.getGame =  async function(id) {
  const [
    game,
    mechanics,
    categories,
    designers
  ] = await Promise.all([
    db.customQuery("SELECT * FROM game WHERE id=:id", { id }).then(r => r[0]),
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
}

const allowedSortFields = ['name', 'play_time', 'min_age', 'bgg_rank', 'bgg_score', 'bgg_average', 'bgg_num_reviews']

module.exports.getGames =  async function({ sortBy = 'bgg_rank', sortDescending = false, page=0, category, designer, mechanic  }) {
  if (!allowedSortFields.includes(sortBy)) {
    throw Error("Sort By field not allowed");
  }
  const joinItem = category ? 'category' : (mechanic ? 'mechanic' : (designer ? 'designer' : null));

  const query = `
    SELECT 
      ${allowedSortFields.join(', ')}, thumbnail, game.id
    FROM game
      ${ joinItem ? `JOIN game_${joinItem} on game.id="gameId" WHERE ${joinItem}=:${joinItem}` : '' }
    ORDER BY ${sortBy} ${ sortDescending === 'true' ? 'DESC' : 'ASC' } NULLS LAST, bgg_rank DESC NULLS LAST
    LIMIT 10
    OFFSET :page*10
  `;
  return db.customQuery(query, { page, category, mechanic, designer });
}