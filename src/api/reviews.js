import getApi from '.';

export function getReviews({ id, gameId, reviewerId }) {
  return getApi().get("/reviews", { params: { id, gameId, reviewerId }}).then((r => r.data));
}