import  express from "express";
import { createListing } from "../controller/listing.controller.js";
import { upload } from './../middlewares/multer.middleware.js';
import { verifyToken } from './../utils/verifyuser.js';
const router = express.Router();


router.post('/create', upload.fields([{
    name:'imageUrls',
    maxCount:6
}]),verifyToken,createListing);

export default router;
