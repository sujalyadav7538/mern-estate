import express  from "express";
import {test, updateUser,deleteUser,userListing} from '../controller/user.controller.js';
import { verifyToken } from './../utils/verifyuser.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.get('/test',test);

router.post('/update/:id',upload.fields([{
    name:'avatar',
    maxCount:1
}]),verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);

router.get('/listings/:id',verifyToken,userListing);

export default router;
