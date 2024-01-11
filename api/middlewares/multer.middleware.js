import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        // console.log(req.body,file);
        cb(null,'./public')
    },
    filename: function (_,file,cb){
        cb(null,file.originalname)
    }
})

export const upload = multer({storage,})