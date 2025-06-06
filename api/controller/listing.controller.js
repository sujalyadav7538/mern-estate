import Listing from "../models/listing.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/error.js";
import { geoCode } from "../utils/geocode.js";

export const createListing = async (req, res, next) => {
  try {
    // console.log(req.body.userRef, req.user);
    if (req.body.userRef !== req.user.id)
      return next(errorHandler(402, "Unauthorised Request To the server"));
    if (req.body.imageUrls.length > 6)
      return next(errorHandler(401, "Images Should Not be more than 6"));
    const coordinates= await geoCode(req.body.address);
    console.log(coordinates)    
    req.body.latitude=coordinates[0];
    req.body.longitude=coordinates[1];
    const listing = await Listing.create(req.body);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing Not Found!!"));
  if (req.user.id !== listing.userRef)
    return next(401, "You can onlyy delete your");
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!!");
  } catch (error) {
    next(error);
  }
};

export const UpdateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing Not Found!!"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(404, "Unauthorised Access!!"));
  try {
    if(listing.address!==req.body.address){
      const changedGeocode=await geoCode(req.body.address);
      req.body.latitude=changedGeocode[0];
      req.body.longitude=changedGeocode[1];
    }
    
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(402, "Listing do not exist"));
    console.log(listing)
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};



export const getListings = async (req, res, next) => {
  try {
    console.log("here")
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
