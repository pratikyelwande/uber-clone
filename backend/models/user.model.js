const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String, // Fixed: Use 'String' instead of 'string'
      required: true,
      minLength: [3, "Firstname must be at least 3 characters"],
    },
    lastname: {
      type: String, // Fixed: Use 'String' instead of 'string'
      required: true,
      minLength: [3, "Lastname must be at least 3 characters"],
    },
  },
  email: {
    type: String, // Fixed: Use 'String' instead of 'string'
    required: true,
    unique: true,
    minLength: [5, 'Email must be at least 5 characters long'],
  },
  password: {
    type: String, // Fixed: Use 'String' instead of 'string'
    required: true,
    select: false,
  },
  socketId: {
    type: String, // Fixed: Use 'String' instead of 'string'
  },
});

// Add methods and statics
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Export the model
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
