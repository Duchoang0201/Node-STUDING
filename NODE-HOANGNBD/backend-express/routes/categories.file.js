var express = require("express");
var router = express.Router();

// let data = [
//   { id: 1, name: "Mobile Phone", description: "Điện thoại" },
//   { id: 2, name: "Fashion", description: "Thời trang" },
//   { id: 3, name: "Toys", description: "Đồ chơi cho trẻ em" },
// ];
// Methods: POST / PATCH / GET / DELETE / PUT

var { write } = require('../helpers/FileHelpers');

let data = require('../data/categories.json')
const fileName = './data/categories.json';



//Get ALL DATA
router.get("/", function (req, res, next) {
  res.send(data);
});

//CREATE DATA
router.post("/", function (req, res, next) {
  //Get post DATA
  const postItem = req.body;
  //Get MaxId
  let maxId = 0;
  data.forEach((item) => {
    if (maxId < item.id) {
      maxId = item.id;
    }
  });
  postItem.id = maxId + 1;

  data.push(postItem);


  //Save data into File
  write(fileName, data)



  res.send({ oke: true, messsage: "Created" });
});

//DELETE DATA

router.delete("/:id", function (req, res, next) {
  const itemId = req.params.id;

  data = data.filter((item) => item.id != itemId);

  // WRITE INTO JSON
  write(fileName, data)

  res.send({ oke: true, messsage: "Deleted" });
});

//PATCH DATA
router.patch("/:id", function (req, res, next) {
  const patchId = req.params.id;

  const patchItem = req.body;

  const Found = data.find((item) => item.id == patchId);

  if (Found) {
    for (let propertyName in patchItem) {
      Found[propertyName] = patchItem[propertyName];
    }
  }

    // WRITE INTO JSON
    write(fileName, data)
  
  res.send({ oke: true, messsage: "Patched" });
});

module.exports = router;
