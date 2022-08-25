const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordinputSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    audioURL: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RecordInput", recordinputSchema);
