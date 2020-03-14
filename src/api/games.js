import api from '.';

export function getGameInfo(id) {
  return api.get("/games/" + id).then((r => r.data));
}