import getApi from '.';

export function getGameInfo(id) {
  return getApi().get("/games/" + id).then((r => r.data));
}

export function getGames({ field, item, page }) {
  return getApi().get("/games/", { params: {
    [field]: item,
    page
  }}).then((r => r.data));
}