const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const truckSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
      min: 1900
    },
    userId: {
      type: ObjectId,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Truck = mongoose.model("Truck", truckSchema);
module.exports = Truck
