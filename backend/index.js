const express = require('express');
const cors = require('cors');
const  mainRouter = require('./routes/index');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', mainRouter);
// /api/v1 is the base url for all the routes
// so all the routes will be like /api/v1/... and in future if we want to change the base url we can do it here only
app.listen(5000, () => {
    console.log('Server is running on port 5000');
    }  
);
