import  express from "express";
import { UpdateListing,getListings, createListing,deleteListing, getListing } from "../controller/listing.controller.js";
import { verifyToken } from './../utils/verifyuser.js';
const router = express.Router();


router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,UpdateListing);
router.get('/getlisting/:id',verifyToken,getListing);
router.get('/get',getListings);

export default router;
