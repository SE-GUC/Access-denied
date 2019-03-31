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
  calendar: [Date]
})

MemberSchema.pre('save', function(next) {
  let user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 2, function(err, hash) {
    if (err) return next(err)
    user.password = hash
    console.log(user)
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
module.exports = mongoose.model('Members', MemberSchema)
