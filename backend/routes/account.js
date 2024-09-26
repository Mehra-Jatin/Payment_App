const express = require('express');
const mongoose = require('mongoose');
const middleware = require('../middleware');
const Account = require('../db');

const router = express.Router();

router.get('/balance',middleware,async (req, res) => {
    const account = await Account.findOne({userID:req.userID});

    res.json({balance:account.balance});
});

router.post('/transfer',middleware,async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const {to, amount} = req.body;

    const account = await Account.findOne({userID:req.userID}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({error:"Account not found or insufficient balance"});
    }

    const toAccount = await Account.findOne({userID:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({error:"Recipient Account not found"});
    }

    await Account.updateOne({userID:req.userID},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userID:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({message:"Transfer Successful"});

});

