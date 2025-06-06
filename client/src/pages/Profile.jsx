/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";
import { Link, useNavigate } from "react-router-dom";
import ListingModal from "../components/ListingModal.jsx";

export default function Profile() {
  const { currentUser, loading, _ } = useSelector((state) => state.user);
  const [formdata, setformData] = useState({});
  const fileref = useRef(null);
  const [file, setFile] = useState(null);
  const [edit, setedit] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const navigate = useNavigate();
  const [showListing, setShowListing] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    // setUser(currentUser);
    setformData({});
    setError(null);
  }, [edit]);

  useEffect(() => {
    const handleListings = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        setUserListing(data);
      } catch (error) {
        setError(error.message);
        return;
      }
    };
    handleListings();
  }, []);

  const handleChange = (e) => {
    setformData((formdata) => ({
      ...formdata,
      [e.target.id]: e.target.value,
    }));

    //  console.log(formdata);
  };

  const handleEdit = (e) => {
    setedit((prev) => !prev);
  };

  const uploadAvatar = async (avatar) => {
    try {
      setError(null);
      const uplodedUrl = new FormData();
      uplodedUrl.append("avatar", avatar);
      const res = await fetch("/api/user/avatar/upload", {
        method: "POST",
        body: uplodedUrl,
      });
      const data = await res.json();
      console.log(data);
      return data[0];
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setError("Issue in Uploading Image , Plz try again !!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setedit(true);
    dispatch(updateUserStart());
    if (Object.keys(formdata).length == 0 && !file){
      setedit(false);
      return dispatch(updateUserSuccess(currentUser));}
    else {
      try {
        for (const key of Object.keys(formdata)){
          const val=formdata[key];
          if(val.length==0){
            setError('No entry can be empty!!')
            return dispatch(updateUserSuccess(currentUser))
          }
        }
        setError(null);
      

        if (file) {
          const filePath = await uploadAvatar(file);
          formdata.avatar = filePath;
        }

        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          setError(data.message);
          return;
        }
        dispatch(updateUserSuccess(data));

        navigate("/profile");
      } catch (error) {
        dispatch(updateUserFailure(error.message));
        setError(error.message);
      } finally {
        setedit(false);
      }
    }
  };

  const handleFile = (e) => {
    // console.log(e.target.files[0]);
    const selectedfile = e.target.files[0];
    setFile(selectedfile);
  };

  const handleDeleteUser = async () => {
    try {
      setError(null);
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        setError(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      setError("Cannot Delete User!!");
    }
  };

  const handleSignOut = async (e) => {
    try {
      dispatch(signOutUserStart());
      setError(null);
      const res = fetch("/api/auth/signout", {
        method: "GET",
      });

      const data = (await res).json();
      if (data.success == false) {
        dispatch(signOutUserFailure(data.message));
        setError(data.message);
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
      setError(err.message);
    }
  };


  const confirmSignOut=(e)=>{
   const response=confirm('Do you wanna SignOut?');
   if(response){
     handleSignOut();
   }
  
 }

 const confirmDeleteAccount=()=>{
  const response= confirm('Do you Really want to delete your account?') && confirm('you will loss all of your data and hosted listings?')
  if(response){
    handleDeleteUser();
  }
 }

  // console.log(error,formdata)
  return (
    <>
      <main className=" max-w-7xl flex flex-col lg:flex-row mx-auto mt-4 p-3 gap-2">
        {
          <div
            className={`p-3 max-w-md mx-auto flex flex-col border border-white border-e-gray-400 rounded-xl shadow-lg shadow-gray-400 flex-1 justify-center `}
          >
            <h1 className="text-3xl font-semibold text-center">Profile</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              encType="multipart/form-data"
            >
              <input
                disabled={!edit}
                type="file"
                onChange={handleFile}
                ref={fileref}
                hidden
                accept="images/*"
                name="avatar"
              />
              <img
                src={currentUser.avatar}
                onClick={() => fileref.current.click()}
                alt="PROFILE IMAGE"
                className="self-center h-24 w-24 rounded-full cursor-pointer mt-2 object-cover"
              />
              <input
                type="text"
                onChange={handleChange}
                value={edit ? formdata.username : currentUser.username}
                id="username"
                disabled={!edit}
                className="p-3 rounded-lg border"
              />
              <input
                type="email"
                onChange={handleChange}
                value={edit ? formdata.email : currentUser.email}
                id="email"
                disabled={!edit}
                className="p-3 rounded-lg border"
              />
              {edit ? (
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  disabled={!edit}
                  className="p-3 rounded-lg border"
                />
              ) : (
                <div></div>
              )}
              {edit ? (
                <>
                  <button
                    disabled={loading}
                    className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-90"
                  >
                    {loading ? "Loading.." : "Update"}
                  </button>
                  <button
                    className="bg-red-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-90"
                    onClick={handleEdit}
                    disabled={loading}
                  >
                    CANCEL
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-90"
                  onClick={handleEdit}
                >
                  EDIT
                </button>
              )}
              {!edit ? (
                <Link
                  className="p-3 bg-green-700 text-white rounded-lg text-center font-medium uppercase"
                  to={"/create-listing"}
                >
                  Create Listing
                </Link>
              ) : (
                ""
              )}
            </form>
            {!edit && (
              <>
                <div className="flex justify-between my-4  flex-wrap">
                  <span
                    onClick={confirmDeleteAccount}
                    className="m-2 p-2 text-slate-700 cursor-pointer  text-center shoadow shadow-md uppercase font-medium hover:scale-95 rounded-lg  hover:bg-white hover:text-red-9 00 hover:opacity-95 border hover:shadow-green-800"
                  >
                    Delete Account
                  </span>
                  <span
                    onClick={confirmSignOut}
                    className=" m-2 p-2 cursor-pointer text-slate-800 shoadow text-center shadow-md uppercase font-medium hover:scale-95 rounded-lg hover:bg-white  border hover:shadow-green-800 "
                  >
                    Sign Out
                  </span>
                </div>
                <div className="flex text-center justify-center">
                  <button
                    type="button"
                    className="font-semibold text-green-700 hover:underline uppercase"
                    onClick={() => setShowListing((prev) => !prev)}
                  >
                    {!showListing && "Show Listing"}
                  </button>
                </div>
              </>
            )}
          </div>
        }

        {
          <ListingModal
            listings={userListing}
            onClose={() => setShowListing(false)}
            show={showListing}
          />
        }
      </main>
      {error && alert(`Failed to Update due to: ${error}`)}
    </>
  );
}
