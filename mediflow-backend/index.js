const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const {checkForToken} = require('./Middleware/authHelper');

const userRouter = require('./Routers/userRouter');
const appointmentRouter = require('./Routers/appointmentRouter');


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));


app.use(express.json());

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(checkForToken());
const db_link = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.v7rnuns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    })
app.use('/',userRouter);
app.use('/appointment',appointmentRouter);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})