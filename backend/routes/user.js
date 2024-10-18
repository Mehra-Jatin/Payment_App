const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const middleware = require('../middleware');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../config');

const {User,Account,History} = require('../db');

const router = express.Router();

const signupSchema = zod.object({
            username: zod.string(),
            FirstName: zod.string(),
            LastName: zod.string().optional(),
            password: zod.string(),
            email: zod.string().email(),
});


router.get('/', (req, res) => {
    res.send('Hello World');
    }
);




router.post('/signup',async (req, res) => {

    const {success} = signupSchema.safeParse(req.body);
    // safeParse returns an object with a success  key boolean in nature 
    if(!success){
        return res.status(400).json({error:"Invalid Data"});
    }

    const user = await User.findOne({
        username: req.body.username,
        email: req.body.email
    });

    if (user) {
        return res.status(400).json({ error: "User Already Exists" });
    }
    const { username, FirstName, LastName, email, password } = req.body;

    const newuser = await User.create({
        username:username,
        FirstName:FirstName,
        LastName:LastName,
        email:email,
        password:password
    });

    const userID = newuser._id;

    await Account.create({
        userID,
        balance: 1+Math.random()*1000   

    });

    var token = jwt.sign({ userID },JWT_SECRET);
    res.json({message: "User Signed Up Successfully", token:token });
    }
);




router.post('/signin' ,async (req, res) => {
    const { email, password } = req.body;   
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {

        return res.status(400).json({ error: "Invalid Credentials" });
    }
    const userID = user._id;
    var token = jwt.sign({ userID },JWT_SECRET);
    res.json({ message: "User Signed In Successfully", token:token });
});


const updateSchema = zod.object({
    username: zod.string().optional(),
    FirstName: zod.string().optional(),
    LastName: zod.string().optional(),
});


router.put('/update',middleware, async (req, res) => {
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({error:"error in updating"});
    }

    await User.updateOne({_id:req.userID},req.body);
    res.json({message:"User Updated Successfully"});
    }
    
);


router.get('/history',middleware, async (req, res) => {
    console.log(req.userID);
    const history = await History.find({userID:req.userID});
    if(history.length===0){
        return res.json({message:"No History Found start transferring"});
    }
    res.json({
        history:history.map(h=>({
            RecipentID:h.RecipentID,
            amount:h.amount,
            date:h.date
        }))
    });
    }
);

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    const users  =await User.find({
        $or:[{
            FirstName:{"$regex":filter,"$options": "i"} // i is for case insensitive
        },
        {
            LastName:{"$regex":filter,"$options": "i"}
        }]
    })
    
   res.json({
      USER:users.map(user=>({
            username:user.username,
            FirstName:user.FirstName,
            LastName:user.LastName,
            _id:user._id
        }))
   })

});


module.exports = router;