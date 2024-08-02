const express = require('express')
const { fetchOrderHistory } = require('../Controller/orderHistoryController')
const jwtAuthWithNext = require('../auth/validate-token-with-next')

const app = express.Router();

app.get('/fetchHistory',jwtAuthWithNext, fetchOrderHistory);

module.exports = app;