/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable react/prop-types */

export default function Contact({listings}) {
  // console.log(listings.userRef);
  const [owner,setOwner]=useState({});
  const[message,setMessage]=useState("");
  useEffect(()=>{
    const user=async ()=>{
      const res=await fetch(`/api/user/get/${listings.userRef}`);
      const data=await res.json();
      setOwner(data);

    }
    user();
  },[]);

  const handleChange=(e)=>{
    setMessage(e.target.value)
  }

  // console.log(ref.current.value);
  return (
    <div>
        <textarea type="text" placeholder="Write Your Mesage...." className="w-full  p-4   border rounded-lg  hover:shadow-md " onChange={handleChange} />
        <Link  to={`mailto:${owner.email}`
}
>
        
        <button className="bg-cyan-950 rounded-lg text-white w-full text-center p-3 mt-2 hover:opacity-95">Send Message</button>
        </Link>
    </div>
  )
}
