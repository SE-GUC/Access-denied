const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  skills: [String],
  Fees: Number,
  Method_of_payment: String,
  Evaluation_procedure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'evaluationModel'
  },
  membersapplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Members'
    }
  ],
  membersaccepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Members'
    }
  ],
  keywords:[String],

  eduorganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationalOrganisation'
  }
})
certificationSchema.set('toObject', { virtuals: true })
certificationSchema.set('toJSON', { virtuals: true })
certificationSchema
.virtual('Tags')
.get(function get ()  {
    let s=[]
    if (this.name) s.push('Certification Name:' + this.name)
    if (this.eduorganization) s.push('Educational Organization:' + this.eduorganization.name)
    if (this.Method_of_payment) s.push('Method_of_payment:' + this.Method_of_payment)
    if (this.Fees) s.push('Fees:' + this.Fees)
    if (this.skills.length > 0) s.push('skills:' + this.skills)
    if (this.keywords.length > 0) s.push('others:' + this.keywords)

  return  s;
});
// delete mongoose.connection.models['Certification']
// delete mongoose.connection.collections['Certification']

const myModel = mongoose.model('Certification', certificationSchema)
// myModel.collection.drop()

module.exports = myModel
