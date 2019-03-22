const mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;
const certificationSchema = new mongoose.Schema({
  name_of_certification: {
    type: String,
    required: true,
    unique: true
  },
  id_of_certification: {
    type: String,
    required: true,
    unique: true
  },
  Evaluation_of_available: Date,
  Fees: Number,
  Method_of_payment: String,
  Evaluation_procedure: {
    type: String,
    required: true
  },
  schedule: ObjectId
});

module.exports = mongoose.model("Certification", certificationSchema);
