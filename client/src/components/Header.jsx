/* eslint-disable react-hooks/exhaustive-deps */
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(window.location.search,urlParams)
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);
  return (
    <header className="bg-slate-400 shadow-inner  shadow-gray-950">
      <div className="flex justify-around items-center max-w-7xlxxl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-200">MERN </span>
            <span className="text-sky-950">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center hover:scale-105 transition-scale duration-300"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="hidden sm:inline font-medium text-cyan-950 text-base hover:underline ">
              Home
            </li>
          </Link>
          <Link to="/about">
          <li className="hidden sm:inline font-medium text-cyan-950 text-base hover:underline ">
              About
            </li>
          </Link>
          
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover "
                src={currentUser.avatar}
                alt="profile"
              />
            ):(<div>
              <Link to={"/sign-in"}>
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  Login
                </li>
              </Link>
              <span> / </span>
              <Link to={"/sign-up"}>
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  SignUp
                </li>
              </Link>
            </div>)}
          </Link>
        </ul>
      </div>
    </header>
  );
}
