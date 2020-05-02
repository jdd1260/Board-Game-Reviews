import getApi from '.';

export function flagReview(reviewId, gameId) {
  return getApi().post("/flags/games/" + gameId + "/reviews/" + reviewId).then((r => r.data));
}

export function deleteReviewFlag(reviewId) {
  return getApi().delete("/flags/reviews/" + reviewId).then((r => r.data));
}

export function getFlaggedReviews() {
  return getApi().get("/flags/reviews").then((r => r.data));
}

export function flagReviewer(reviewerId) {
  return getApi().post("/flags/reviewers/" + reviewerId).then((r => r.data));
}

export function getFlaggedReviewers() {
  return getApi().get("/flags/reviewers").then((r => r.data));
}

export function deleteReviewerFlag(reviewerId) {
  return getApi().delete("/flags/reviewers/" + reviewerId).then((r => r.data));
}