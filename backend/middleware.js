const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const middleware = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.status(403).json({error:"You must be logged in"});
    }

    const token = authorization.replace("Bearer ", "").trim();

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded){
            return res.status(403).json({error:"You must be logged in"});
        }
        else{
            req.userID = decoded.userID;
            next();
        }
    }
    catch(err){
        return res.status(403).json({error:"You must be logged in"});
    }
};

module.exports = middleware;