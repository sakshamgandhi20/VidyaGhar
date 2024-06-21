const express = require("express")
const {doAdd,doShowCartPrdt} = require('../Controller/cartController')
const app = express.Router();

app.post('/addToCart',doAdd);
app.post('/showCart',doShowCartPrdt);

module.exports=app