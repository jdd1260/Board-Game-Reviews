const express = require("express");
var cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.API_PORT || 3000;

const { getGame } = require("./server/api/games");

app.use(express.static("build"));

app.get("/api/games/:id", async (req, res, next) => {
  try {
    const game = await getGame(req.params.id);
    if (game) {
      game.designers = ['P1'];
      game.mechanics = ['fun', 'long'];
      game.categories = ['rpg', 'dice', 'cards'];
      res.json(game)
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e) 
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
