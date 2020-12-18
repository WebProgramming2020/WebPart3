const mongoose = require("mongoose");
const config = require("../config/database");

// User Schema
const BikeSchema = mongoose.Schema({
  model: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

//Bike variable that we can use outside this file, that uses the UserSchema model
const Bike = (module.exports = mongoose.model("Bike", BikeSchema));

module.exports.addBike = function (newBike, callback) {
  newBike.save(callback);
};
module.exports.readBikes = function (callback) {
  Bike.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.status(500).json({ error: "An error" + error }));
};
