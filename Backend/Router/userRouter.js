const express = require("express")
const {doSave, doLogin} = require("../Controller/userController")
const app = express.Router();

app.post('/save',doSave);
app.post('/login',doLogin);

module.exports=app