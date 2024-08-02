const express = require("express");
const { doAdd, doShowCartPrdt,doRemovePrdt,doCheckOutCart,update } = require("../Controller/cartController");
const jwtAuthWithNext = require("../auth/validate-token-with-next");

const app = express.Router();

app.post("/addToCart", jwtAuthWithNext, doAdd);
app.post("/showCart",jwtAuthWithNext, doShowCartPrdt);
app.post("/removePrdt",jwtAuthWithNext, doRemovePrdt);
app.post("/checkCart",jwtAuthWithNext, doCheckOutCart);

module.exports = app;
