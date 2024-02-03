/* eslint-disable no-unused-vars */
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { FaGlobeAfrica } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      console.log(viewportHeight, scrollPosition, contentHeight);

      setIsFixed(
        contentHeight <= viewportHeight &&
          scrollPosition >= contentHeight - viewportHeight
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
      <section
        className={`bottom-[0%] ${
          isFixed ? "fixed" : ""
        } grid grid-cols-3  bg-slate-700 shadow-md p-2 lg:p-4 w-full`}
      >
        <div className="flex flex-col lg:flex-row justify-around max-w-xl items-center gap-" >
          <div className=" cursor-pointer mb-2 lg:m-0">
            <span className="text-white text-md lg:text-lg">
              ©2023 MERN Project
            </span>
          </div>
          <div className="text-md lg:text-4xl text-white flex flex-row items-center gap-2 cursor-pointer">
            <FaGlobeAfrica />
            <span className="text-md lg:text-lg">English</span>
          </div>
        </div>

        <div className=" max-w-md justify-center items-center flex">
          <span className="text-white text-md lg:text-lg cursor-pointer">Terms & Privacy</span>
        </div>

        <div className="text-md lg:text-4xl flex gap-4 items-center text-white cursor-pointer max-w-xl justify-center">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            {" "}
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            {" "}
            <RiTwitterXLine />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <CiLinkedin />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            {" "}
            <FiYoutube />
          </a>{" "}
        </div>
      </section>
  );
}
