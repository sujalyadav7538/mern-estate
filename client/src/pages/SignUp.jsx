/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import {signInStart,signInSuccess,signInFailure,signInLoad} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';



export default function Signout() {

  const [formData,setFormData] = useState({});
  const {error,loading} = useSelector((state)=> state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handlechange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    });
  };
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success==false){
        dispatch(signInFailure(data.message));
        return;
      }
      console.log(data)
      dispatch(signInSuccess(data));
      navigate('/');
    } catch(error){
      dispatch(signInFailure(error));
    }
  }

  useEffect(() => {
   dispatch(signInLoad());
  }, [])
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold 
      my-7">SIGN UP</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
         <input type="text" placeholder='Username'  className='border p-3 rounded-lg'
         id='username' onChange={handlechange} required/>
         <input type="email" placeholder='Email'  className='border p-3 rounded-lg'
         id='email' onChange={handlechange} required/>
         <input type="password" placeholder='password'  className='border p-3 rounded-lg'
         id='password' onChange={handlechange} required/>
         <button disabled={loading} className='bg-slate-700 text-white p-3 
         rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
         <OAuth/>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account?</p>
          <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign In</span>
          </Link>
      </div>
        {error && <p className='text-red-700'>{error}</p>}
    </div>
  )
}
