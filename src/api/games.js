import getApi from '.';

export function getGameInfo(id) {
  return getApi().get("/games/" + id).then((r => r.data));
}

export function getGames({ field, item, page }, useCustomRanking=false) {
  return getApi().get("/games/", { params: {
    [field]: item,
    page,
    sortBy: useCustomRanking ? 'custom_rank' : 'bgg_rank'
  }}).then((r => r.data));
}