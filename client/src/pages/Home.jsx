/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ListingItem from "./../components/ListingItem";
import { Link } from "react-router-dom";
import { Swiper,SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore  from 'swiper';
import 'swiper/css/bundle'
import Footer from './../components/footer';


export default function Home() {
  const [sale, setsale] = useState([]);
  SwiperCore.use([Navigation]);
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
  return (
    <>
    <main className="">
      {/* TOp Section */}
      <section className=" flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        
          <h1 className="font-bold text-3xl lg:text-6xl text-slate-700">
            Find your next{" "}
            <span className="text-slate-500">
              perfect <br />{" "}
            </span>
            place with ease
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Sahand Estate will help you find your home fast, easy and
            comfortable. <br /> Our expert support are always available.
          </p>
          <Link to={`/search?`}>
             <span className="text-blue-800 font-bold hover:underline text-xs lg:text-sm"> Let's Start now...</span>
          </Link>
      </section>
      {/* Image corousel section */}
      <section>
        <Swiper navigation loop>
          {offer&&offer.length>0&&offer.map((listing)=>(
            <SwiperSlide key={listing._id}>
              <div
              className="h-[550px] p-2 m-2 rounded-md shadow-md shadow-blue-300"
              style={{
                background:`url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize:'cover',
              }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Listing offer section */}
      <section className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offer&&offer.length>0&&(
          <div className="">
            <div className="pb-2">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
              <Link className="text-sm text-blue-800 hover:underline " to={'/search/?offer=true'}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offer.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>            
         )}
      </section>
      {/* Rent Offer Section */}
      <section className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rent&&rent.length>0&&(
          <div className="">
            <div className="pb-2">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for Rent</h2>
              <Link className="text-sm text-blue-800 hover:underline " to={'/search/?type=rent'}>Show more place for rent</Link>
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
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
              <Link className="text-sm text-blue-800 hover:underline " to={'/search/?type=sale'}>Show more polaces for sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sale.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>            
         )}
      </section>


    </main>
      <Footer/>
      </>
  );
}
