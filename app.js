const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const m = require('./server/db/models/');

app.use(express.static("client/build"));

app.get("/test/:id", async (req, res, next) => {
  try {
    const result = (await m.customQuery("SELECT * FROM test WHERE id=:id", { id: req.params.id }))[0];
    if (result) {
      res.json(result)
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e) 
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
