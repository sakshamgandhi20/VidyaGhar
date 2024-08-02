const { getUserModal } = require("../Modal/userModal");
const userModal = getUserModal();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// api to save new user
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

// api to login existing user
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
// function to send mail to user
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  });
};

// api to send reset password tuser when they forgot password
async function forgotPassword(req, resp) {
  try {
    console.log(req.query.email);
    // find the email in database
    const result = await userModal.findOne({ email: req.query.email });
    // if email does not found
    if (!result)
      return resp.json({ status: true, msg: "email does not found" });
    // generate the jwt token from the user email and old password
    let sKey = process.env.SEC_KEY;
    let token = jwt.sign({ result }, sKey, { expiresIn: "15m" });
    // create the url of reset password with jwt token as query
    const resetUrl = `http://localhost:3000/resetPassword/${token}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password it will valid for 15 minutes. Please make a PUT request to: \n\n ${resetUrl}`;
    // send the mail to user
    await sendEmail(result.email, "Password Reset Request", message);
    resp.json({
      status: true,
      msg: "Reset password mail has been sent to your email",
    });
  } catch (err) {
    resp.json({ status: false, err: err.message });
  }
}

// api to change the password
function resetPassword(req, resp) {
  console.log(req.body);
  userModal
    .updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } }
    )
    .then((result) => {
      resp.json({ status: true, msg: "password Updated" });
    })
    .catch((err) => resp.json({ status: false, err: err.message }));
}
module.exports = { doSave, doLogin, forgotPassword, resetPassword };
