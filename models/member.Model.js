const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthDate: Date,
  address: {
    city: String,
    area: String,
    street: String
  },
  payRate: Number,
  certification: [
    {
      name_of_certification: String,
      skills: [String],
      ref_of_certification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certification'
      }
    }
  ],
  calendar: [{ Date: Date, Event: String }],
  memberSince: { type: Date, default: Date.now },
  expiryDate: Date
})

MemberSchema.pre('save', function(next) {
  let user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, 2, function(err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

MemberSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt
    .compare(candidatePassword, this.password)
    .then(isMatch => {
      cb(null, isMatch)
    })
    .catch(err => cb(err))
}

MemberSchema.set('toObject', { virtuals: true })
MemberSchema.set('toJSON', { virtuals: true })
MemberSchema
.virtual('Tags')
.get(function get ()  {
    let Certification =this.certification
      let save = []
      Certification.forEach(function(element) {
        save.push(element.skills.toString())
      })

  return save;
});

module.exports = mongoose.model('Members', MemberSchema)
