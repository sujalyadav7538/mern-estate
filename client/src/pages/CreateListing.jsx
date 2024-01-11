/* eslint-disable no-unused-vars */
import { set } from "mongoose";
import React from "react";
import { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularprice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleFile = (e) => {
    // console.log(e.target.files)

    for (let i = 0; i < e.target.files.length; i++) {
      setFormData((prev) => {
        const updatedImageurls = [...prev.imageUrls, e.target.files[i]];
        return {
          ...prev,
          imageUrls: updatedImageurls,
        };
      });
    }
    // setFormData({
    //     ...formData,
    //     {for key in e.target.files}
    //     imageUrls.append()
    // })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      const formdata=new FormData();
      for(const key in formData){
        formdata[key]=formData[key];
      }
      console.log(formData,formdata)
      const res= await fetch('/api/listing/create',{
        method:'POST',
        body:formdata,
      });
      console.log(res);
    } catch (error) {
      console.log("ERROR",error.message);
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
            defaultValue={formData.name}
            required
          />
          <textarea
            id="description"
            type="text"
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg"
            defaultValue={formData.description}
            required
          />
          <input
            type="text"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="address"
            defaultValue={formData.address}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                className="w-5"
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                className="w-5"
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                className="w-5"
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                className="w-5"
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                className="w-5"
                checked={formData.offer}
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
                defaultValue={formData.bedrooms}
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
                defaultValue={formData.bathrooms}
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
                id="regularprice"
                defaultValue={formData.regularprice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {formData.type === "rent" && <span>($/Month)</span>}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2 ">
                <input
                  type="number"
                  id="discountprice"
                  min="0"
                  onChange={handleChange}
                  max="1000000"
                  required
                  className="p-3 border rounded-lg border-gray-300"
                  defaultValue={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p> Offer</p>
                  {formData.type === "rent" && <span>($/Month)</span>}
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
              className="p-3 border-gray-300 rounded w-full"
              accept="images/*"
              onChange={handleFile}
            />
            <button
              type="button"
              className="p-3 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <button
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
