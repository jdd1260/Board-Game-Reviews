import api from '.';

export function getGameInfo(id) {
  return api.get("/games/" + id).then((r => r.data));
}

export function getGames({ field, item, page }) {
  return api.get("/games/", { params: {
    [field]: item,
    page
  }}).then((r => r.data));
}