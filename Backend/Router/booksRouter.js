const express = require("express");
const jwtAuthWithNext = require("../auth/validate-token-with-next");
const {
  dosave,
  doShow,
  doShowAll,
  doUpdateBook,
  doRemove,
  doSearchBookDetail,
  doFetchCategory,
} = require("../Controller/booksController");
const app = express.Router();

app.post("/save",jwtAuthWithNext, dosave);
app.get("/searchBook", doSearchBookDetail);
app.get("/fetch", jwtAuthWithNext, doShow);
app.post("/updateBook", doUpdateBook);
app.post("/showAll", doShowAll);
app.post("/remove", doRemove);
app.get("/fetchCategory",doFetchCategory)

module.exports = app;
