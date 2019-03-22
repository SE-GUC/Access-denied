const mongoose = require("mongoose");
const uri =
  "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true });

const ReviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "reviewerModel",
    required: true
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "revieweeModel",
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },
  reviewerModel: {
    type: String,
    required: true,
    enum: ["Members", "Partners"]
  },
  revieweeModel: {
    type: String,
    required: true,
    enum: ["Members", "Partners"]
  }
});

ReviewSchema.index({ reviewer: 1, reviewee: 1, task: 1 }, { unique: true });
module.exports = mongoose.model("Reviews", ReviewSchema);
