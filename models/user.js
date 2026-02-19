const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email:String,
  username: String,
  password: String
});


UserSchema.plugin(passportLocalMongoose.default);

module.exports = mongoose.model("User", UserSchema);
