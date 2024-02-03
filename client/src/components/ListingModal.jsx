/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ListingModal({ listings, onClose }) {
  const modalRef = useRef(null);
  const [userlisting, setUserListing] = useState(listings);

  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setUserListing((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    setUserListing(listings);
  }, [listings]);

  const handleModalClick = (event) => {
    // Prevent closing when clicking inside the modal content
    event.stopPropagation();
  };


  return (
    <main className="fixed inset-0 bg-black bg-opacity-5 flex justify-end z-10" onClick={onClose}>
      <section ref={modalRef} className="max-w-xl lg:w-2/6 h-full border rounded-md" onClick={handleModalClick}>
        <header className="font-semibold p-4 uppercase border border-b-gray-600 bg-slate-800 text-white rounded-md ">Listings:</header>
        <div className="overflow-hidden h-full bg-gray-400 bg-opacity-25">
          {userlisting.map((listing, index) => (
            <Link to={`/listing/${listing._id}`}>
            <div key={index} className="flex max-w-full h-16 p-2 shadow-md bg-white gap-4 items-center border cursor-pointer border-slate-600 m-2 rounded-md justify-between hover:scale-95 transition-scale duration-300">
              <img src={listing.imageUrls[0]} alt="" className="h-full w-1/6 rounded-lg" />
              <h5 className="truncate font-medium">{listing.name}</h5>
              <AiFillDelete className="hover:scale-125" onClick={() => handleDeleteListing(listing._id)} />
              <Link to={`/update-listing/${listing._id}`}>
                <MdModeEdit className="hover:scale-125" />
              </Link>
            </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
