const mongoose = require("mongoose");
const { Schema } = mongoose;

const CrushSchema = new Schema({
  crushOf: {
    type: String,
    required: true,
  },
  crushName: {
    type: String,
    required: true,
  },
  compatibility: {
    type: Number,
    required: true,
  },
  referer: {
    type: String,
    required: true,
  },
});

const Crush = mongoose.model("Crush", CrushSchema);

module.exports = Crush;
