import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import listingRoute from "./routes/listing.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { upload } from "./middlewares/multer.middleware.js";
import { verifyToken } from "./utils/verifyuser.js";
import { uploadOnCloud } from "./utils/cloudinary.js";

dotenv.config({ path: "./.env" });
const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  "*/upload",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "imageUrls",
      maxCount: 6,
    },
  ]),
  verifyToken,
  async (req, res, next) => {
    try {
      const { avatar, imageUrls } = req.files;
      const localfilepaths = [];
      // console.log(req.files)
      if (avatar) {
        for (let i = 0; i < avatar.length; i++) {
          // localfilepaths.push(avatar[i].path)
          localfilepaths.push((await uploadOnCloud(avatar[i].path)).url);
        }
      }
      if (imageUrls) {
        for (let i = 0; i < imageUrls.length; i++) {
          localfilepaths.push((await uploadOnCloud(imageUrls[i].path)).url);
        }
      }
      res.status(200).json(localfilepaths);
    } catch (error) {
      next(error);
    }
  }
);

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listing", listingRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Listening on Port 3000!!!");
});
