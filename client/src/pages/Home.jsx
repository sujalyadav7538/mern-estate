/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Footer from "./../components/footer";
import { useState, useEffect } from "react";
import ListingItem from "../components/ListingItem";
import image6 from '/image.jpg'


export default function About() {
  const [load, setLoad] = useState(false);
  const [sale, setsale] = useState([]);
  const [offer, setoffer] = useState([]);
  const [rent, setrent] = useState([]);

    useEffect(()=>{
      const offerListings=async()=>{
          try {
            const res = await fetch(`/api/listing/get?offer=true&limit=3`);
            const data = await res.json();
            setoffer(data);
            saleListings()
  ;        } catch (error) {
            console.log(error.message)
          }
    }
    const saleListings=async()=>{
      try{
        const res=await fetch('/api/listing/get?type=sale&limit=3');
        const data = await res.json();
        setsale(data);
        rentListings();
      } catch(error){
        console.log(error.message);
      }
    };
    const rentListings=async()=>{
      try {
        const res=await fetch('/api/listing/get/?type-rent&limit=3');
        const data =await res.json();
        setrent(data);
      } catch (error) {
        console.log(error.message)
      }
    }
  offerListings();
  },[])

  useEffect(() => {
    setLoad(true);
  }, []);
  console.log(load)

  return (
    <main className="min-w-full min-h-full  bg-indigo-200 ">
      <section className="h-[550px] md:h-[70vh] lg:h-[80vh]relative  p-2  ">
        <div
          className="w-full h-full object-cover relative rounded-full shadow-2xl shadow-purple-950/80 transition-transform "
          style={{
            backgroundImage:
            `url(${image6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          
          <div
            className={`${
              load ? "translate-x-0" : "-translate-x-full"
            } ease-in-out delay-500 duration-1000 absolute p-28 max-w-6xl mx-auto flex  transition-transform flex-col gap-4 cursor-pointer`}
          >
            <h1 className="font-bold text-3xl lg:text-6xl text-sky-200">
              Find your next{" "}
              <span className="text-gray-500">
                perfect <br />{" "}
              </span>
              place with ease
            </h1>
            <p className="text-sky-200 text-xs sm:text-2xl font-semibold">
              Rent / Sale & Buy
            </p>
            <span className="text-teal-500 font-bold  text-xs lg:text-lg">              
            <Link to={`/search?`} className="max-w-xs">
                Explore More...
            </Link>
              </span>
          </div>
        </div>
      </section>

      {/* Next Section */}
      <section className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {offer&&offer.length>0&&(
          <div className="">
            <div className="pb-2">
              <h2 className="text-3xl font-semibold text-violet-950">Recent offer on Properties</h2>
              <Link className="text-sm text-teal-950 font-medium hover:underline " to={'/search/?type=rent'}>Show more offer</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offer.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>            
         )}
      </section>
      <section className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rent&&rent.length>0&&(
          <div className="">
            <div className="pb-2">
              <h2 className="text-3xl font-semibold text-violet-950 drop-shadow-2xl">Recent places for Rent</h2>
              <Link className="text-sm text-teal-950 font-medium hover:underline" to={'/search/?type=rent'}>Show more place for rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rent.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>            
         )}
      </section>
      <section className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {sale&&sale.length>0&&(
          <div className="">
            <div className="pb-2">
              <h2 className="text-3xl font-semibold text-violet-950">Recent places for sale</h2>
              <Link className="text-sm text-teal-950 font-medium hover:underline " to={'/search/?type=sale'}>Show more places for sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sale.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>            
         )}
      </section>
      <Footer/>
    </main>
  );
}
