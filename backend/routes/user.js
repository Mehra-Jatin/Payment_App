const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const middleware = require('../middleware');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../config');

const {User,Account,History} = require('../db');

const router = express.Router();

const signupSchema = zod.object({
    
            FirstName: zod.string(),
            LastName: zod.string().optional(),
            password: zod.string(),
            email: zod.string().email(),
});


router.get('/', (req, res) => {
    res.send('Hello World');
    }
);




router.post('/signup', async (req, res) => {
    try {
      
      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        console.log(result.error.errors);  
        return res.status(400).json({ error: "Invalid Data", details: result.error.errors });
      }
  
  
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "User Already Exists" });
      }
  
      const { FirstName, LastName, email, password } = req.body;
  
      
      const newUser = await User.create({ FirstName, LastName, email, password });
      const userID = newUser._id;
  
      
      await Account.create({
        userID,
        name: FirstName,
        balance: (1 + Math.random() * 1000).toFixed(3),  
      });
  
      
      const token = jwt.sign({ userID }, JWT_SECRET);
      return res.json({ message: "User Signed Up Successfully", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  

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
    try{
    const history = await History.find({ userID: req.userID });
    res.json({
      history: history.length > 0
        ? history.map(h => ({
            RecipentID: h.RecipentID,
            amount: h.amount,
            date: h.date,
          }))
        : []
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
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

router.get('/about',async (req, res) => {
      const id = req.query.id;
      const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.json({
            username:user.username,
            FirstName:user.FirstName,
            LastName:user.LastName,
            _id:user._id
    });
}
);

module.exports = router;