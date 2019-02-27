
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const certificationSchema = new Schema({
  Name_of_Certification: {
    type: String,
    required: true,
    //Unique: true
    },
  id_of_certification: {
    type: String,
    required: true,
    Unique: true},
  Description_of_certification: {
    type: String,
    required: true},
  Evaluation_slots_available: Date,
  Fees: Number,
  Method_of_payment: {
    type: String,
    required: true},
    Evaluation_procedure: {
        type:String,
        required:true},
  Deadline_for_applying: Date,
});
module.exports = mongoose.model('certification', certificationSchema);
