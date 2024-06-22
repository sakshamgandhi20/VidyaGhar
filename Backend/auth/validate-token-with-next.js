const jwt = require("jsonwebtoken");

const jwtAuthWithNext = (req, res, next) => {
  const full_token = req.headers["authorization"]; //keyword
  console.log(full_token);

  var ary = full_token.split(" ");

  let actualToken = ary[1];
  let isTokenValid;
  try {
    isTokenValid = jwt.verify(actualToken, process.env.SEC_KEY);
    //  console.log(isTokenValid)
  } catch (err) {
    console.log("Token Expired");
    res.json({ status: false, message: "unauthorized" });
    return;
  }
  if (isTokenValid) {
    console.log("*********************************************");
    const obj = jwt.decode(ary[1]);
    req.query.email = obj.result.email;
    // console.log(obj);

    next();
  } else {
    res.json({ status: false, message: "unauthorized" });
    return;
  }
};

module.exports = jwtAuthWithNext;
