const fs = require("fs");
const path = require("path");
const booksModal = require("../Modal/booksModal");
const cartModal = require('../Modal/cartModal');
const categoryModal = require('../Modal/categoryModal')


// function to save book details
function dosave(req, resp) {
  resp.set("json");
  console.log(req.body);
  let filename = "no-pic";
  // console.log(req.files)
  if (req.files != null) {
    console.log(req.files.bookPic.name);
    const fileExtension = path.extname(req.files.bookPic.name);

    filename = `${req.body.email + req.body.bookName}${fileExtension}`;
    console.log(filename);
    let filepath = path.join(__dirname, "..", "bookspics", filename);

    req.files.bookPic.mv(filepath);
  }
  req.body.bookPath = filename;
  const doc = new booksModal(req.body);
  doc
    .save()
    .then((retdoc) => {
      resp.json({ status: true, rec: retdoc });
    })
    .catch((err) => {
      resp.json({ status: false, err: err.message });
    });
}

// function to fetch types of category
function doFetchCategory(req,resp) {
 categoryModal.find({})
 .then((result)=>resp.json({status: true,result:result[0].category}))
 .catch((err)=> resp.json({status: false,err:err.message}))
}

//function to fetch the book detail
function doSearchBookDetail(req, resp) {
  console.log(req.query.uId);
  booksModal
    .findOne({ uId: req.query.uId })
    .then((result) => {
      resp.json({ status: true, result: result });
    })
    .catch((err) => {
      console.log("checked false ");
      resp.json({ status: false, err: err.message });
    });
}

// function to fetch all published books of user
function doShow(req, resp) {
  // console.log(req.body)
  booksModal
    .find({ email: req.query.email })
    .then((result) => {
      // console.log(result);
      resp.json({ status: true, result: result });
    })
    .catch(function (err) {
      resp.json({ status: false, err: err.message });
    });
}

// function to fetch books in home page
function doShowAll(req, resp) {
  // console.log(req.body)
  booksModal
    .find({}).limit(12)
    .then((result) => {
      // console.log(result);
      resp.json({ status: true, result: result });
    })
    .catch(function (err) {
      resp.json({ status: false, err: err.message });
    });
}

// function to update the book details
async function doUpdateBook(req, resp) {
  resp.set("json");
  // console.log(req.body)
  // console.log(req.files)
  if(req.files !== null){ // if book pic is updated
  let filename= "no-pic";
  const msg = await doDeleteOldBookPath(req, resp); // function to delete old pic
  console.log(msg);
  if (msg.status) { // store the new pic
    const fileExtension = path.extname(req.files.bookPic.name);

    filename = `${req.body.email + req.body.bookName}${fileExtension}`;
    console.log(filename);
    let filepath = path.join(__dirname, "..", "bookspics", filename);

    req.files.bookPic.mv(filepath);
  } else console.log("bookPath is not Updated");}
  else console.log('book pic is same')
  
  // update the book details
  booksModal
    .updateOne(
      { uId: req.body.uId },
      {
        $set: {
          bookName: req.body.bookName,
          standard: req.body.standard,
          edition: req.body.edition,
          authorName: req.body.authorName,
          price: req.body.price,
          bookPath: req.body.bookPath,
          status: req.body.status,
          email: req.body.email,
        },
      }
    )
    .then(async (result) => {
      // update the book details in the cart of users
     const cartResult = await cartModal.updateMany({uId: req.body.uId},
        {
          $set: {
            bookName: req.body.bookName,
          category: req.body.category,
          edition: req.body.edition,
          authorName: req.body.authorName,
          price: req.body.price,
          bookPath: req.body.bookPath,
          }
        }
      )
      console.log(cartResult);
      if (result.matchedCount == 1) resp.json({ status: true, msg: "updated" });
      else resp.json({status:true , msg: "item does not exist"})
    })
    .catch(function (err) {
      resp.json({ status: false, err: err.message });
    });
}

//function to delete the book pic from server
function doDeleteOldBookPath(req, resp) {
  return new Promise((resolve, reject) => {
    booksModal
      .find({ uId: req.body.uId })
      .then((results) => {
        if (results.length === 0) {
          resolve({
            status: false,
            message: "No books found with the provided uId",
          });
          return;
        }
        const oldFilepath = path.join(
          __dirname,
          "..",
          "bookspics",
          results[0].bookPath
        );
        fs.unlink(oldFilepath, (err) => {
          if (err) {
            console.log(err.message);
            resolve({ status: false, message: err.message });
          } else {
            console.log("book path deleted");
            resolve({
              status: true,
              message: "Book path deleted successfully",
            });
          }
        });
      })
      .catch((err) => {
        resolve({ status: false, message: err.message });
      });
  });
}

// function to delete book details
async function doRemove(req, resp) {
  booksModal
    .deleteOne({ uId: req.body.uId })
    .then( async function (result) {
      if (result.deletedCount == 1){ 
        // delete the books details in the cart of the users
        const changeStatusInCart = await cartModal.updateMany({uId: req.body.uId},{$set: {status:false}})
        console.log(changeStatusInCart.modifiedCount)
        resp.json({ status: true, msg: "Deleted" });}
      else resp.json({ status: true, msg: "Invalid Item" });
    })
    .catch(function (err) {
      resp.send({ status: false, err: err.message });
    });
}

module.exports = {
  dosave,
  doShow,
  doShowAll,
  doUpdateBook,
  doRemove,
  doSearchBookDetail,
  doFetchCategory
};
