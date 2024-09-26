const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');

const { JWT_SECRET } = require('../config');

const User = require('../db');

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

    const user = User.findOne({
        username: req.body.username,
        email: req.body.email
    });
    if (user._id) {
        return res.status(400).json({ error: "User Already Exists" });
    }

    const newuser = await User.create({
        username:username,
        FirstName:FirstName,
        LastName:LastName,
        email:email,
        password:password
    });

    const userID = newuser._id;
    const token = jwt.sign({ userID }, JWT_SECRET);
    res.json({message: "User Signed Up Successfully",token: token});
    }
);




router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
     
    }   
);


router.put('/update', async (req, res) => {
     await User.updateOne({email:req.body.email},{$set:{username:req.body.username,FirstName:req.body.FirstName,LastName:req.body.LastName}});
    }
);


module.exports = router;