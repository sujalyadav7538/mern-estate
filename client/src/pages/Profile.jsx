/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFailure ,updateUserSuccess,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice.js';
import {  Link, useNavigate } from 'react-router-dom';


export default function Profile() {
  const {currentUser,loading,error}=useSelector((state)=> state.user);
  const [formdata,setformData]=useState({});
  const fileref=useRef(null);
  const [file,setFile]=useState(undefined);
  const [edit,setedit]=useState(false);
  const navigate=useNavigate();

  const dispatch = useDispatch();

  const handleChange=(e)=>{
     setformData({
      ...formdata,
      [e.target.id]:e.target.value,
     });

    //  console.log(formdata);
  };

  const handleEdit=(e)=>{
    setedit((prev)=> !prev)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(updateUserStart());
        setedit(true);
        const formData = new FormData();
        for (const key in formdata) {
          console.log(key)
          formData.append(key, formdata[key]);
        }

        console.log(formData);
       

        const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        console.log(res,data);

        if (data.success === false) {
            dispatch(updateUserFailure(data.message));
            return;
        }

        dispatch(updateUserSuccess(data));
        setedit(false);
        navigate('/profile');
    } catch (error) {
        dispatch(updateUserFailure(error.message));
    }
};


  const handleFile=(e)=>{
    console.log(e.target.files[0])
    const selectedfile=e.target.files[0];
    setFile(selectedfile);
    setformData({
      ...formdata,
      avatar:selectedfile,

    });
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async (e)=>{
    try{
       dispatch(signOutUserStart());
       const res = fetch('/api/auth/signout',{
        method:'GET',
       });

       const data = (await res).json();
       if (data.success==false){
        dispatch(signOutUserFailure(data.message));
        return;
       }

       dispatch(signOutUserSuccess(data));


    } catch(err){
      dispatch(signOutUserFailure(err.message));
    }
  }
  // console.log(formdata);

  
  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
        <input disabled={!edit} type="file" onChange={handleFile} ref={fileref} hidden accept='images/*' name='avatar' />
        <img src={currentUser.avatar} onClick={()=> fileref.current.click()} alt="PROFILE IMAGE" className='self-center h-24 w-24 rounded-full cursor-pointer mt-2 object-cover'/>
        <input type="text"  onChange={handleChange} defaultValue={currentUser.username} id='username' disabled={!edit} className='p-3 rounded-lg border'   />
        <input type="email" onChange={handleChange} defaultValue={currentUser.email} id='email' disabled={!edit} className='p-3 rounded-lg border' />
        {edit?<input type="password" placeholder='password' id='password' disabled={!edit} className='p-3 rounded-lg border' />:<div></div>}
        {edit?
            <><button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-90'>{loading ? 'Loading..' : 'Update'}
            </button><button className='bg-red-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-90' onClick={handleEdit}>CANCEL</button></>
            :
            <button type='button'  className='bg-red-500 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-90' onClick={handleEdit} >EDIT</button>
          
        }
        {!edit?
        <Link className='p-3 bg-green-700 text-white rounded-lg text-center font-medium uppercase' to={'/create-listing'}>Create Listing</Link>:""
        }
      </form>
      <div className="flex justify-between my-4">
        <span onClick={handleDeleteUser} className='text-red-700 font-semibold cursor-pointer'>Delete Account</span>
        <span  onClick={handleSignOut} className='text-red-700 font-semibold cursor-pointer '>Sign Out</span>
      </div>
      <div>
        
      </div>
    </div>
  )
}
