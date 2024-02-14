/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
// import { TransitionEvent } from "react";

export default function ListingModal({ listings, onClose,show }) {
  const modalRef = useRef(null);
  const [userlisting, setUserListing] = useState(listings||{});
  show
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
  // console.log(userlisting)

  return (
    <main className={`inset-0 fixed bg-black bg-opacity-25 lg:bg-opacity-0  flex justify-end z-10 transition-transform ease-in-out duration-1000 ${show?'-translate-x-0 ':'translate-x-full '}`} onClick={onClose}>
      <section ref={modalRef} className={`w-[77%] lg:max-w-lg lg:w-1/4 h-full  rounded-md transition-all ease-in-out duration-1000  ${show?'-translate-x-0 ':'translate-x-full '}`} onClick={handleModalClick} >
        <header className="font-semibold p-4 uppercase border border-b-gray-600 bg-gray-600 text-white rounded-md ">Listings:</header>
        <div className="overflow-hidden h-full bg-opacity-25">
          {userlisting&&userlisting.map((listing, index) => (
            <Link to={`/listing/${listing._id}`}>
            <div key={index} className="flex max-w-full h-16 p-2 shadow-md bg-gray-300 gap-4 items-center border cursor-pointer  m-2 rounded-md justify-between hover:scale-95 transition-scale duration-300">
              <img src={listing.imageUrls[0]} alt="" className="h-full w-1/6 rounded-lg" />
              <h5 className="truncate font-medium flex-1">{listing.name}</h5>
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
