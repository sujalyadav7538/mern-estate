import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import listingRoute from './routes/listing.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config({path:'./.env'});
const app=express();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/listing',listingRoute);



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message = err.message || "Internal Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000!!!")
})