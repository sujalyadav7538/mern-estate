import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { uploadOnCloud } from "../utils/cloudinary.js";
import Listing from './../models/listing.model.js';


export const test =(req,res)=>{
    res.send("HELLOO WORKING ON IT")
};

export const updateUser= async (req,res,next)=>{
    if (req.user.id!==req.params.id) return next(errorHandler(401,'Not Allowed'));

    try {
        console.log(req.body,req.files)
        if(req.body.password){
            req.body.password= bcryptjs.hashSync(req.body.password,10);
        }
        let avatarLocalPath = null;
        let avatar=null;

        if (req.files && req.files.avatar && req.files.avatar[0]) {
            avatarLocalPath = req.files.avatar[0].path;
            avatar = await uploadOnCloud(avatarLocalPath);
        }
        const user = await User.findById(req.params.id);
        const updateuser=await User.findByIdAndUpdate(req.params.id,{
            $set:{

                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar: avatar ? avatar.url : user.avatar,

            },
    },{new:true});

    const {password, ...rest}= updateuser._doc;
    res.status(200).json(rest);

    } catch (error) { 
        console.log(error);
        next(error);
    }
};

export const deleteUser = async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401,'unauthorised Access!!'));
    try {
       await User.findByIdAndDelete(req.params.id);
       res.clearCookie('access_token');
       res.status(200).json('User Deleted Successfully!!');

    } catch (error) {
        next(error);
    }
};


export const userListing = async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            const listings = await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);
            
        } catch (error) {
            next(error);
        }
    }else{
        next(errorHandler(402,"Can't Show!!!"))
    }
}



export const getUser= async(req,res,next)=>{
    try{
        
        const data=await  User.findById(req.params.id);
        if(!data) return next(errorHandler(404,'No Owner is Found'));
        res.status(200).json(data);
    } catch(error){
        next(error);
    }
   
}