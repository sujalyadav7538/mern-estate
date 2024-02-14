/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';

export default function OAuth() {
  const {loading}=useSelector((state)=>state.user)
  return (
    <button className='bg-red-700 text-white p-3 uppercase hover:opacity-95 rounded-lg disabled:opacity-90' disabled={loading}>continue with google</button>
  )
}
