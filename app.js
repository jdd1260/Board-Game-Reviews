const express = require("express");
const cors = require("cors");
const toNumber = require("lodash/toNumber");

const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const { createView, getGame, getGames } = require("./server/api/games");
const { getReviews } = require("./server/api/reviews");
const { getUsers } = require("./server/api/users");
const {
  getReviewFlags,
  flagReview,
  getReviewerFlags,
  flagReviewer,
  deleteReviewFlag,
  deleteReviewerFlag
} = require("./server/api/flags");

app.use(express.static("build"));

const allowedUsersPromise = getUsers();

app.use(async (req, res, next) => {
  try {
    const allowedUsers = await allowedUsersPromise;
    const userName = req.headers.authorization;
    const matchingUser = allowedUsers.find(u => u.name === userName);
    if (matchingUser) {
      req.user = matchingUser.id;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get("/api/ping", async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    await createView(req.user);
    res.sendStatus(200);
  }
});

app.get("/api/games/:id", async (req, res, next) => {
  try {
    const game = await getGame(req.params.id, req.user);
    if (game) {
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/api/games", async (req, res, next) => {
  try {
    const {
      sortBy,
      sortDescending,
      page,
      category,
      designer,
      mechanic
    } = req.query;
    const game = await getGames(
      {
        sortBy,
        sortDescending,
        page: page && toNumber(page),
        category,
        designer,
        mechanic
      },
      req.user
    );
    if (game) {
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/api/reviews", async (req, res, next) => {
  try {
    const { id, gameId, reviewerId, allowFlagged } = req.query;
    const reviews = await getReviews(
      { id, gameId, reviewerId, allowFlagged },
      req.user
    );
    res.json(reviews);
  } catch (e) {
    next(e);
  }
});

app.get("/api/flags/reviews", async (req, res, next) => {
  try {
    const flags = await getReviewFlags(req.user);
    res.json(flags);
  } catch (e) {
    next(e);
  }
});

app.post("/api/flags/games/:gameId/reviews/:reviewId", async (req, res, next) => {
  try {
    await flagReview(req.params.reviewId, req.params.gameId, req.user);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.delete("/api/flags/reviews/:reviewId", async (req, res, next) => {
  try {
    await deleteReviewFlag(req.params.reviewId, req.user);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.get("/api/flags/reviewers", async (req, res, next) => {
  try {
    const flags = await getReviewerFlags(req.user);
    res.json(flags);
  } catch (e) {
    next(e);
  }
});

app.post("/api/flags/reviewers/:reviewerId", async (req, res, next) => {
  try {
    await flagReviewer(req.params.reviewerId, req.user);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.delete("/api/flags/reviewers/:reviewerId", async (req, res, next) => {
  try {
    await deleteReviewerFlag(req.params.reviewerId, req.user);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
