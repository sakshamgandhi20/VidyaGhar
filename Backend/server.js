const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyparser = require("body-parser");
// const dbObj = require("./config/dbConfig"); //for security resons we cannot use this instead use .env
const userRouter = require("./Router/userRouter");
const profileRouter = require("./Router/profileRouter");
const booksRouter = require("./Router/booksRouter");
const cartRouter = require("./Router/cartRouter");
const dotenv = require("dotenv");

const app = express();
app.use("/uploadbook", express.static("bookspics"));
dotenv.config();
app.use(fileUpload());
app.use(cors());
app.use(bodyparser.json()); //for parsing POST data coming from Client
app.listen(2005, () => {
  console.log("server started at 2005");
});

const server = process.env.dburl;
mongoose
  .connect(server)
  .then(() => {
    console.log("Backend started");
  })
  .catch(function (err) {
    console.log(err);
  });

app.use(express.urlencoded(true));
// app.use("/product",routerProduct);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/addBook", booksRouter);
app.use("/cart", cartRouter);
