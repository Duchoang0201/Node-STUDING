var express = require('express');
var router = express.Router();

let data = [
  { id: 1, name: 'Mary', email: 'mary@gmail.com', gender: 'female' },
  { id: 2, name: 'Honda', email: 'honda@gmail.com', gender: 'male' },
  { id: 3, name: 'Suzuki', email: 'suzuki@gmail.com', gender: 'male' },
];
// Methods: POST / PATCH / GET / DELETE / PUT

// GET ALL DATA
router.get('/', function (req, res, next) {
  res.send(data);
});


// POST DATA
router.post('/', function (req, res, next) {

  //GET POST DATA
  const newItem = req.body;
  //GET MAX ID
  let maxId = 0;
  data.forEach( (item) => {
    if(maxId < item.id) {
      maxId = item.id;
    }
  });
  newItem.id = maxId + 1;

  data.push(newItem);

  res.send( {oke: true, message: 'POST'})
})



// POST DATA
router.post('/', function (req, res, next) {

  //GET POST DATA
  const newItem = req.body;
  //GET MAX ID
  let maxId = 0;
  data.forEach( (item) => {
    if(maxId < item.id) {
      maxId = item.id;
    }
  });
  newItem.id = maxId + 1;

  data.push(newItem);

  res.send( {oke: true, message: 'POST'})
})


// DELETE DATA
router.delete('/:id', function (req, res, next) {
  const itemId = req.params.id
  res.send({ ok: true, message: "Delete"})
});


// PATCH DATA

router.patch( '/:id', function( req, res, next) {
  
  const patchId = req.params.id

  const patchItem = req.body

  const Found = data.find( item => item.id == patchId)

  if(Found){
    for( let propertiesName in patchItem){
      Found[propertiesName] = patchItem[propertiesName]
    }
  }
  res.send({ oke : true, message: "Patch"})
})

module.exports = router;
