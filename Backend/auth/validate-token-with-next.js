const jwt = require("jsonwebtoken");

const jwtAuthWithNext = (req, res, next) => {
  const full_token = req.headers["authorization"]; //keyword
  // console.log(full_token);

  if (!full_token) {
    // Check if the token is present
    res.json({ status: false, err: "login required" });
    return;
  }

  var ary = full_token.split(" ");

  let actualToken = ary[1];
  let isTokenValid;
  try {
    isTokenValid = jwt.verify(actualToken, process.env.SEC_KEY);
    //  console.log(isTokenValid)
  } catch (err) {
    console.log("Token Expired");
    res.json({ status: false, err: "relogin required" });
    return;
  }
  if (isTokenValid) {
    console.log("*********************************************");
    const obj = jwt.decode(ary[1]);
    // console.log(obj);
    if (req.method === "GET") req.query.email = obj.result.email;
    else if (req.method === "POST") {
      // console.log(req.body)
      if (req.body.email) {
        req.body.sellerEmail = req.body.email;
      }
      req.body.email = obj.result.email;
      // res.json({data:req.body})
    }
    // console.log(obj);
    // console.log(req.body)

    next();
  } else {
    res.json({ status: false, err: "unauthorized" });
    return;
  }
};

module.exports = jwtAuthWithNext;
