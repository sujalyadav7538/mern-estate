/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { GiCrossedBones } from "react-icons/gi";
import Contact from "../components/Contact.jsx";
import ImageModal from './../components/ImageModal.jsx';
import Map from "../components/map.jsx";

export default function Listing() {
  
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const[showImages,setShowImages]=useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [map,setMap]=useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getlisting/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error.message)
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);
  const currentPrice = listing.regularPrice - listing.discountPrice;
  


  return (
    <main className="max-w-full max-h-full m-6 p-3">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">{error}</p>
      )}

      {listing && !loading && !error && listing.imageUrls && (
        <div className=" flex flex-col lg:flex-row gap-2 flex-1">
          <div className=" h-2/4 w-3/4 lg:h-[500px] lg:max-w-3xl ">
          <img src={listing.imageUrls[0]} alt="" className="w-full h-full object-cover rounded-xl"  />
          {showImages&&(<ImageModal urls={listing.imageUrls}/>)}
          </div>
            {!showImages?(
              <div>

                <div className="fixed top-[23%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer" onClick={()=>setShowImages(true)}>
                  <IoIosImages 
                     className="text-slate-500"
                     onClick={()=>{setShowImages(true)}}
                     
                     />
                </div>
                <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                  <FaShare
                    className="text-slate-500"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    
                    }}
                  />
                </div>
                {copied && (
                  <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                    Link copied!
                  </p>
                )}
              </div>
            ):<div className="fixed top-[5%] right-[2%] z-30 cursor-pointer ">
              <GiCrossedBones onClick={()=>(setShowImages(false))}/>
              </div>
          }
          <div className="flex flex-col m-4  gap-4 max-w-2xl">
            <p className="text-2xl font-semibold">
              {listing.name} - $ {currentPrice}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm cursor-pointer" onClick={()=> setMap(prev=>!prev)}>
              <FaMapMarkerAlt className="text-green-700 cursor-pointer"  />
              {listing.address}
            </p>
            {!showImages&&map&&<Map lat={listing.latitude} lon={listing.longitude} className="z-0"/>}
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listings={listing} />}
          </div>
        </div>
      )}



      
    </main>
  );
}

