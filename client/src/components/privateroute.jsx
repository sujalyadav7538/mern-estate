/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
export const Privateroute = () => {
  const {currentUser}=useSelector((state)=> state.user);  
  return currentUser? <Outlet /> : <Navigate to='/sign-in'/>
}

