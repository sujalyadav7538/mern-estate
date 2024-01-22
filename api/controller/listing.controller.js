import Listing from '../models/listing.model.js';
import { uploadOnCloud } from '../utils/cloudinary.js';
import { errorHandler } from '../utils/error.js';

export const createListing= async(req,res,next)=>{
    try {
        console.log(req.body.userRef,req.user)
        if(req.body.userRef!==req.user.id) return next(errorHandler(402,'Unauthorised Request To the server'));
        if (req.body.imageUrls.length>6) throw next(errorHandler(401,'Images Should Not be more than 6'));
        
        const listing = await Listing.create(req.body);
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404,'Listing Not Found!!'))
    if(req.user.id!==listing.userRef) return next(401,'You can onlyy delete your');
    try {
       await Listing.findByIdAndDelete(req.params.id);
       res.status(200).json("Listing has been deleted!!")
    } catch (error) {
        next(error)
    }
}


export const UpdateListing=async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404,"Listing Not Found!!"))
    if(req.user.id!==listing.userRef) return next(errorHandler(404,'Unauthorised Access!!'))
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}

export const getListing=async(req,res,next)=>{
    try {
        const listing=await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(402,'Listing do not exist'))
        // console.log(listing)
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}