const express = require("express");
const cors = require('cors');
const toNumber = require('lodash/toNumber')

const app = express();
app.use(cors());
const port = process.env.API_PORT || 3000;

const { getGame, getGames } = require("./server/api/games");
const { getReviews } = require("./server/api/reviews");

app.use(express.static("build"));

app.get("/api/games/:id", async (req, res, next) => {
  try {
    const game = await getGame(req.params.id);
    if (game) {
      res.json(game)
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e) 
  }
});

app.get("/api/games", async (req, res, next) => {
  try {
    const { sortBy, sortDescending, page, category, designer, mechanic } = req.query;
    const game = await getGames({ 
      sortBy, 
      sortDescending, 
      page: page && toNumber(page),
      category, 
      designer, 
      mechanic 
    });
    if (game) {
      res.json(game)
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e) 
  }
});

app.get("/api/reviews", async (req, res, next) => {
  try {
    const { id, gameId, reviewerId } = req.query;
    const reviews = await getReviews({ id, gameId, reviewerId });
    res.json(reviews)
  } catch (e) {
    next(e) 
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
