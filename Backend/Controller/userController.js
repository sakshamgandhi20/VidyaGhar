const { getUserModal } = require("../Modal/userModal");
const userModal = getUserModal();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

function doSave(req, resp) {
  resp.set("json");
  const doc = new userModal(req.body);

  doc
    .save()
    .then((result) => {
      // creation of web token
      let sKey = process.env.SEC_KEY;
      let token = jwt.sign({ result }, sKey);

      resp.json({ status: true, rec: result, jtoken: token });
    })
    .catch((err) => {
      resp.json({ status: false, err: err.message });
    });
}

function doLogin(req, resp) {
  userModal
    .findOne({ email: req.body.email })
    .then((result) => {
      if (result.password === req.body.password) {
        // creation of web token
        let sKey = process.env.SEC_KEY;
        let token = jwt.sign({ result }, sKey, { expiresIn: "2d" });
        resp.json({
          status: true,
          res: result,
          msg: "login successfully....",
          jtoken: token,
        });
      } else resp.json({ status: false, msg: "wrong password" });
    })
    .catch((err) => {
      resp.json({ status: false, msg: err.message });
    });
}
module.exports = { doSave, doLogin };
