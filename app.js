const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client/build"));

app.get("/test/:id", (req, res) => res.json({ result: req.params.id }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
