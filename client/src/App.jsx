/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header";
import { Privateroute } from "./components/privateroute";
import { Publicroute } from "./components/publicroute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Listing from "./pages/Listing.jsx";
import Search from './pages/Search';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutUserSuccess } from "./redux/user/userSlice.js";


export default function App() {
  const {currentuser}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  setInterval(async() => {
    const res=await fetch('/api/user/test');
    const data=await res.json();
    if(data=="" || data.success==false){
      return dispatch(signOutUserSuccess());
    }

  },60*30*1000);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route element={<Publicroute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<Privateroute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing/>}></Route>
          <Route path="update-listing/:id" element={<UpdateListing/>}/>
        </Route>
        <Route  path="/*"/>
      </Routes>
    </BrowserRouter>
  );
}
