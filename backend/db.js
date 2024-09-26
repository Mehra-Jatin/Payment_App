const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jatin:1234@cluster0.xox4g.mongodb.net/payment_app");

const userSchema = new mongoose.Schema({
    username: String,
    FirstName: String,
    LastName: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;