const { getProfileModal } = require("../Modal/profileModal");
const profileModal = getProfileModal();


// function to save user profile
function dosave(req, resp) {
  resp.set("json");
  console.log(req.body);

  const doc = new profileModal(req.body);
  doc
    .save()
    .then((retdoc) => {
      resp.json({ status: true, rec: retdoc });
    })
    .catch((err) => {
      resp.json({ status: false, err: err.message });
    });
}

// function to serach user profile
function doSearchUserProfile(req, resp) {
  profileModal
    .findOne({ email: req.query.email })
    .then((result) => {
      resp.json({ status: true, result: result });
    })
    .catch((err) => {
      resp.json({ status: false, err: err.message });
    });
}

// function to update user profile
function doUpdateProfile(req, resp) {
  resp.set("json");

  profileModal
    .updateOne(
      { email: req.body.email },
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          mobile: req.body.mobile,
          village: req.body.village,
        },
      }
    )
    .then((result) => {
      resp.json({ status: true, msg: "Updated" });
    })
    .catch(function () {
      resp.json({ status: false, err: err.message });
    });
}

module.exports = { dosave, doSearchUserProfile, doUpdateProfile };
