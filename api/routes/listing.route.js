import  express from "express";
import { createListing } from "../controller/listing.controller.js";
import { upload } from './../middlewares/multer.middleware.js';
const router = express.Router();


router.post('/create',upload.fields([{
    name:'imageUrls',
    maxCount:6
}]),createListing);

export default router;
