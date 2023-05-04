// Destructing the schema and model
const { Schema, model } = require("mongoose");

//creating a new Schema, same thing as mongoose.Schema
const veggieSchema = new Schema({
  name: { type: String, required: true }, // String is a class, it's capitalized
  color: { type: String, required: true },
  readyToEat: Boolean,
});

// creating a new model, same thing as monoose.model
const Veggie = model("Veggie", veggieSchema);

module.exports = Veggie;
