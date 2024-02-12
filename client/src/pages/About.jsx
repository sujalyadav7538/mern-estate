/* eslint-disable no-unused-vars */
// import React from 'react'
import Cookies from 'universal-cookie';
export default function About() {
  const cookie= new Cookies(null,{path:'/'});
   console.log(cookie.get('access_token'))
  return (
    <div>About</div>
  )
}
