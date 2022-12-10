const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please, provide you username"],
  },
  email: {
    type: String,
    required: [true, "Please, provide you email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please, provide you password"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
