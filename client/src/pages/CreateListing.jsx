/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

export default function CreateListing() {
  const {currentUser}=useSelector((state)=> state.user);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [formdata, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef:''
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formdata,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      if(formdata.offer){
        setFormData({
          ...formdata,
          'discountPrice':0,
          [e.target.id]:e.target.checked
        })
        return
      }
      setFormData({
        ...formdata,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formdata,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleFile = (e) => {
    if (formdata.imageUrls.length < 6) {
      setError(null);
      setFormData((prev) => {
        const updatedImageUrls = [...prev.imageUrls, ...e.target.files];
        return {
          ...prev,
          imageUrls: updatedImageUrls.slice(0, 6), // Limit to 6 files
        };
      });
    }else{
      setError('Images must be less than 6!!');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {

      if(formdata.discountPrice>formdata.regularPrice){
        setLoading(false);
        setError('Discount must be less than RegularPrice!!');
        return
      }

      const formData = new FormData();
      formdata.userRef=currentUser._id;
      for (const key in formdata) {
        if (key!=='imageUrls'){
          formData.append(key,formdata[key])
        }
        else{
          for (const _ in formdata[key]){
            formData.append(key,formdata[key][_])
          }
        }
      }  
      
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if(data.success==false){
        setLoading(false);
        setError(data.message);
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log("ERROR", error.message);
      setLoading(false);
      setError(error.message);
    }
  };
  
  // console.log(formData);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {" "}
        CreateListing{" "}
      </h1>
      <form
        className="flex flex-col sm:flex-row gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            defaultValue={formdata.name}
            required
          />
          <textarea
            id="description"
            type="text"
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg"
            defaultValue={formdata.description}
            required
          />
          <input
            type="text"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="address"
            defaultValue={formdata.address}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                className="w-5"
                checked={formdata.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                className="w-5"
                checked={formdata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                className="w-5"
                checked={formdata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                className="w-5"
                checked={formdata.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                className="w-5"
                checked={formdata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg"
                id="bedrooms"
                defaultValue={formdata.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg"
                id="bathrooms"
                defaultValue={formdata.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="50"
                max="10000000"
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg"
                id="regularPrice"
                defaultValue={formdata.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {formdata.type === "rent" && <span>($/Month)</span>}
              </div>
            </div>
            {formdata.offer && (
              <div className="flex items-center gap-2 ">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  onChange={handleChange}
                  max="1000000"
                  required
                  className="p-3 border rounded-lg border-gray-300"
                  defaultValue={formdata.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p> Offer</p>
                  {formdata.type === "rent" && <span>($/Month)</span>}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 ga[-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The First Image will be the Cover max(6){" "}
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              multiple
              required
              className="p-3 border-gray-300 rounded w-full"
              accept="images/*"
              onChange={handleFile}
              name="imageUrls"
            />
            <button
              type="button"
              className="p-3 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <button
             disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
             {loading?"Creating...":"Create Listing"}
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </main>
  );
}
