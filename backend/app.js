const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');


dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/users', userRouter);
app.use('/captains', captainRoutes);

module.exports = app;



