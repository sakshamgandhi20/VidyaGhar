const express = require('express')
const { fetchOrderHistroy } = require('../Controller/orderHistroyController')
const jwtAuthWithNext = require('../auth/validate-token-with-next')

const app = express.Router();

app.get('/fetchHistroy',fetchOrderHistroy);

module.exports = app;