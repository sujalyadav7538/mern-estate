import { errorHandler } from "./error.js";
import  jwt  from 'jsonwebtoken';

export const verifyToken=(req,_,next)=>{
   const token = req.cookies.access_token;
   if (!token) return next(errorHandler(401,"UnauthorisedAccess"));
   jwt.verify(token,'7538',(err,user)=>{
   //  console.log(err)  
    if (err) return next(errorHandler(403,'Forbidden'));
    req.user=user;
   //  console.log(req.user)
    next();
   })
};