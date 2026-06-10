const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure you have bcrypt or bcryptjs installed

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // ... any other fields
});

// Add pre-save hook for hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Add the matchPassword instance method
userSchema.methods.matchPassword = async function (enteredPassword) {
  // 'this.password' refers to the hashed password of the user found in the DB
  return await bcrypt.compare(enteredPassword, this.password);
};

// Ensure you export the model AFTER attaching the method
const User = mongoose.model('User', userSchema);
module.exports = User;