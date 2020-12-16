var express = require('express');
var router = express.Router();
const BikeSchema = require('../models/bike')
const config = require('../config/database');

router.get('/bikes', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.get('/bikes/:id', (req, res, next) => {
  const id = req.params.id;
  req.collection.findById({_id: id})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/bikes', (req, res, next) => {
  let newBike = new Bike({
    serialNumber: req.body.serialNumber,
    model: req.body.model,
    type: req.body.type,
    imageUrl: req.body.imageUrl
  });
  newBike.save();
//   if (!serialNumber || !model || !type  || !imageUrl  ) {
//     return res.status(400).json({
//       message: 'Serial Number , model and type are required',
//     });
//   }

//   const payload = { serialNumber, model, type, imageUrl };
//   req.collection.insertOne(payload)
//     .then(result => res.json(result.ops[0]))
//     .catch(error => res.send(error));
});

router.put('/bikes', (req, res, next) => {
  const { serialNumber, model, type, imageUrl } = req.body;
  if (!serialNumber || !model || !type  || !imageUrl  ) {
    return res.status(400).json({
      message: 'Serial Number , model and type are required',
    });
  }

  const payload = {  serialNumber, model, type, imageUrl };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});



router.delete('/bikes/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
