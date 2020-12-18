var express = require("express");
var router = express.Router();
const Bike = require("../models/bike");
const config = require("../config/database");

//read all bikes from the database
router.get("/bikes", (req, res, next) => {
  req.collection
    Bike.find({})
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get("/bikes/:id", (req, res, next) => {
  const id = req.params.id;
  req.collection
    Bike.findById({ _id: id })
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.post("/bikes", (req, res, next) => {
  const { serialNumber, model, type, imageUrl } = req.body;
  if (!serialNumber || !model || !type  || !imageUrl  ) {
    return res.status(400).json({
      message: 'Serial Number , model and type are required',
    });
  } 
  else{
    let newBike = new Bike({
      model: req.body.model,
      type: req.body.type,
      serialNumber: req.body.serialNumber,
      imageUrl: req.body.imageUrl,
    });
    
    Bike.addBike(newBike, (err, bike) => {
      if (err) {
        res.json({ success: false, msg: "Failed to create bike" });
      } else {
        res.json({ success: true, msg: "Bike Created" });
      }
    });
  };
});
  

// newBike.save();
//   if (!serialNumber || !model || !type  || !imageUrl  ) {
//     return res.status(400).json({
//       message: 'Serial Number , model and type are required',
//     });
//   }

//   const payload = { serialNumber, model, type, imageUrl };
//   req.collection.insertOne(payload)
//     .then(result => res.json(result.ops[0]))
//     .catch(error => res.send(error));

router.put("/bikes", (req, res, next) => {
  const { serialNumber, model, type, imageUrl } = req.body;
  if (!serialNumber || !model || !type || !imageUrl) {
    return res.status(400).json({
      message: "Serial Number , model and type are required",
    });
  }

  const payload = { serialNumber, model, type, imageUrl };
  req.collection
    .insertOne(payload)
    .then((result) => res.json(result.ops[0]))
    .catch((error) => res.send(error));
});

router.delete("/bikes/:id", (req, res, next) => {
  const _id = req.params.id;
  req.collection
    Bike.deleteOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

module.exports = router;
