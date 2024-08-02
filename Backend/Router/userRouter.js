const express = require("express");
const jwtAuthWithNext = require("../auth/validate-token-with-next");
const { doSave, doLogin, forgotPassword, resetPassword } = require("../Controller/userController");
const app = express.Router();

app.post("/save", doSave);
app.post("/login", doLogin);
app.get("/forgotPassword", forgotPassword);
app.post("/resetPassword",jwtAuthWithNext, resetPassword);

module.exports = app;
