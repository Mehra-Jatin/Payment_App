const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jatin:1234@cluster0.xox4g.mongodb.net/payment_app");

const userSchema = new mongoose.Schema({
    username: String,
    FirstName: String,
    LastName: String,
    email: String,
    password: String
});

const accountSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    balance: Number
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };