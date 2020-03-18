import api from '.';

export function getReviews({ id, gameId, reviewerId }) {
  return api.get("/reviews", { params: { id, gameId, reviewerId }}).then((r => r.data));
}