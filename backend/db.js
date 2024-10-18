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

const historySchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    RecipentID:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount: Number,
    date: Date
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const History = mongoose.model("History", historySchema);

module.exports = { User, Account ,History};