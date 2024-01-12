import Listing from '../models/listing.model.js';
import { uploadOnCloud } from '../utils/cloudinary.js';
import { errorHandler } from '../utils/error.js';

export const createListing= async(req,res,next)=>{
    try {
        // console.log(req.body.userRef,req.user.id)
        if(req.body.userRef!==req.user.id) return next(errorHandler(401,'Unauthorised Request To the server'));
        // console.log(req.body.userRef);
        let uploadedImages=[]
        const len=req.files.imageUrls.length;

        console.log("Before uploading");
        for(let i=0;i<len;i++){
             const imageUrl=await uploadOnCloud(req.files.imageUrls[i].path);
             uploadedImages.push(imageUrl.url);
             
            }
        console.log('After Uploading');
        if (uploadedImages.length>6) throw new errorHandler(401,'Images Should Not be more than 6');
        req.body.imageUrls=uploadedImages;
        const listing = await Listing.create(req.body);
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}