var express = require('express');
var router = express.Router();

let data = [
    {id: 1, name: 'iphone 14 ProMax', price: 1500},
    {id: 2, name: 'iphone 13 ProMax', price: 1200},
    {id: 3, name: 'iphone 12 ProMax', price: 1000},
    {id: 4, name: 'iphone 11 ProMax', price: 800},
    {id: 5, name: 'iphone X', price: 500},
];

// Methods: POST / PATCH / GET / DELETE / PUT
/* GET home page. */


// Get all
router.get('/', function (req, res, next) {
  res.send(data);
});

// Create new data
router.post('/', function (req, res, next) {
  const newItem = req.body;

  // Get max id
  let max = 0;
  data.forEach((item) => {
    if (max < item.id) {
      max = item.id;
    }
  });

  newItem.id = max + 1;

  data.push(newItem);

  res.send({ ok: true, message: 'Created' });
});

// Delete data
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  data = data.filter((x) => x.id != id);

  res.send({ ok: true, message: 'Deleted' });
});

// Patch data
router.patch('/:id', function (req, res, next) {
  const id = req.params.id;
  const patchData = req.body;


  Found = data.find((x) => x.id = id);

  if(Found){
    for(let propertyName in patchData){
      Found[propertyName] = patchData[propertyName]
    }
  }

  res.send({ ok: true, message: 'Patch' });
});


module.exports = router;
