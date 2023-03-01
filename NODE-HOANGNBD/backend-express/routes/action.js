var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const Category = require('../models/models')
// Connect server
// const uri = "mongodb://127.0.0.1:27017/test";
// mongoose.createConnection(uri);

// Get ALL DATA
router.get('/', async (req, res) => {

  try {
    const data = await Category.find({});
    res.status(200).send(data);
  
  } catch(err) {
    console.log(err);
    res.status(500).json({error: err});
  }

});
router.post('/', async (req, res) => {
  try{
    const newItem = new Category(req.body);
    const saveItem = await newItem.save();
    res.status(200).send(saveItem)
  }catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router;
