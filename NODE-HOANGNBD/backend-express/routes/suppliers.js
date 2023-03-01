var express = require('express');
var router = express.Router();

let data = [
  { id: 1, name: 'Apple', email: 'apple@apple.com', country: 'USA' },
  { id: 2, name: 'Sony', email: 'sony@sony.com', country: 'JAPAN' },
  { id: 3, name: 'Xiaomi', email: 'xiaomi@xiaomi.com', country: 'CHINA' },
];
// Methods: POST / PATCH / GET / DELETE / PUT

//Get ALL DATE
router.get('/', function (req, res, next) {
  res.send(data);
});


//CREATE NEW DATA
router.post('/', function (req, res, next) {
    const newItem = req.body;
    //GET MAX ID
    let maxId = 0;
    data.map( item =>
       { if(maxId < item.id){
        maxId = item.id
       }
    })

    newItem.id = maxId +1
    data.push(newItem)
    res.send({ ok: true, message: 'Created'});
  });

//DELETE DATA
router.delete('/:id', function (req, res, next) {
    const itemId = req.params.id
    data = data.filter( item => item.id != itemId)
    res.send( { oke: true, message: 'Delete'})
})


//PATCH DATA
router.patch('/:id', function ( req, res, next) {

    const patchId = req.params.id
    const patchItem = req.body
    const Found = data.find( item => item.id == patchId)

    if(Found){
        for(let properties in patchItem)
        {
            Found[properties] = patchItem[properties]
        }
    }
 
    res.send( { oke: true, messsage: 'Patch'})
})
module.exports = router;