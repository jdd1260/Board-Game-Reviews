import getApi from '.';

export function getReviews({ id, gameId, reviewerId }) {
  const params = { id, gameId, reviewerId };
  if (reviewerId) {
    params.allowFlagged = true;
  } 
  return getApi().get("/reviews", { params }).then((r => r.data));
}