const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const objectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: objectId,
    refPath: 'type',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Members',
      'ConsultancyAgencies',
      'Partners',
      'CoworkingSpaces',
      'EducationalOrganisation'
    ]
  }
})
userSchema.pre('save', function(next) {
  let user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, 2, function(err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt
    .compare(candidatePassword, this.password)
    .then(isMatch => {
      cb(null, isMatch)
    })
    .catch(err => cb(err))
}

module.exports = new mongoose.model('User', userSchema)
