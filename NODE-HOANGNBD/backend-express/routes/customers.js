var express = require('express');
var router = express.Router();

let data = [
    {id: 1, name: 'Peter', email: 'peter@gmail.com', address: 'USA'},
    {id: 2, name: 'John', email: 'john@gmail.com', address: 'ENGLAND'},
    {id: 3, name: 'Yamaha', email: "yamaha@gmail.com", address: 'JAPAN'},

]
// Methods: POST / PATCH / GET / DELETE / PUT
/* GET home page. */


// GET ALL DATA
router.get('/', function( req, res, next) {
  res.send( data)
})


// CREATE DATA
router.post('/', function( req, res, next) {

  //Get POST DATA
  let postItem = req.body;
  //Get MaxId
  let maxId = 0;
  data.forEach((item) => {
    if(maxId < item.id){
      maxId = item.id
    }
  });

  postItem.id = maxId +1;

  data.push(postItem)
  
  res.send({ oke: true, message: "Created"})
})

// DELETE DATA
router.delete( '/:id' , function ( req, res, next) {

  const itemId = req.params.id

  data = data.filter( item => item.id != itemId)

  res.send({oke: true, message: "Deleted"})
})

//PATCH DATA

router.patch('/:id', function( req, res, next){
  const patchId = req.params.id

  const patchItem = req.body

  const Found = data.find( item => item.id == patchId)

  if(Found){
    for( let propertyName in patchItem){
      Found[propertyName] = patchItem[propertyName]
    }
  };

  res.send({oke: true, message: "Patched"})
})
module.exports = router;
