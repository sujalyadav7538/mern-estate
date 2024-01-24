/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { BiArrowToLeft } from "react-icons/bi";

export default function CreateListing() {
  const {currentUser}=useSelector((state)=> state.user);
  const [loading,setLoading]=useState(false);
  const params=useParams();
  const [error,setError]=useState(null);
  const [uploadLoading,setuploadLoding]=useState(false);
  const navigate=useNavigate();
  const [currentFile,setcurrentFile]=useState([]);
  const [updated,setupdated]=useState(false);

  console.log(updated)

  const [formdata, setFormData] = useState({
    // imageUrls: [],
    // name: "",
    // description: "",
    // address: "",
    // type: "rent",
    // bedrooms: 1,
    // bathrooms: 1,
    // regularPrice: 50,
    // discountPrice: 0,
    // offer: false,
    // parking: false,
    // furnished: false,
    // userRef:''
  });
//   console.log(params.id);

  
  useEffect(()=>{
     const currentListing=async()=>{
      const res=await fetch(`/api/listing/getlisting/${params.id}`);
      const data= await res.json();
      // console.log(data);
      setFormData(data)
     }
     currentListing();
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [params.id])
 
  
  const handleChange = (e) => {
    setupdated(true);
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
    // console.log(e.target.files);
    setupdated(true);
    if (currentFile.length < 6) {
      setError(null);
      setcurrentFile((prev) => [
        ...prev,
        ...Array.from(e.target.files), // Convert FileList to array
      ]);
    } else {
      setError('Images must be less than 6!!');
    }
  };
  const uploadFile=async (e)=>{
    try{
    if (currentFile.length<=0) return setError("No Image Selected!!");
    setuploadLoding(true)
    const formData=new FormData();
    for(const key in currentFile){
      formData.append('imageUrls',currentFile[key])
    }
    const res = await fetch('/api/listing/imageurl/upload', {
      method: 'POST',
      body: formData,
    });
    const data= await res.json();
    // console.log("Response",data);
    setFormData((prev) => ({
      ...prev,
      imageUrls:[...prev.imageUrls,data]
    }));
    setupdated(true);
    
    // console.log(formdata.imageUrls)
  } catch(error){
    setError(error.message)
  } finally{
    setuploadLoding(false);
  }
    
  };

  // const deleteCurrentFile=(index)=>{
  //   setcurrentFile(
  //     currentFile.filter((_, i) => i !== index)
  //   )
  // }

  const  deleteSavedFile=(index)=>{
    setFormData({
      ...formdata,
      imageUrls: formdata.imageUrls.filter((_, i) => i !== index),
    });
    setupdated(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if(!updated) return navigate(`/listing/${params.id}`);
      if(formdata.discountPrice>formdata.regularPrice){
        setError('Discount must be less than RegularPrice!!');
        return
      }
      if(formdata.imageUrls<=0) return setError("No Image Uploaded, Upload atleast 1 image!!")
          setFormData((prev)=>({
        ...prev,
        userRef:currentUser._id
      }))
      console.log(formdata.userRef)
      setLoading(true);
      const res = await fetch(`/api/listing/update/${params.id}`,{
          method:'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify(formdata),
        })
      const data = await res.json();
      if(data.success==false){
        setLoading(false);
        setError(data.message);
        return
      }
      setLoading(false);
      setError(null);
      navigate(`/listing/${data._id}`)
    } catch (error) {
      console.log("ERROR", error.message);
      setLoading(false);
      setError(error.message);
    }
  };

  
  
  // console.log(formdata);

  return (
    <main className="p-4 pb-6 m-8 max-w-5xl mx-auto border-solid border-2 border-gray-700 rounded-lg shadow-2xl shadow-black-500">
      <logo>
        <BiArrowToLeft className="h-5 w-5 hover:scale-110" onClick={()=>{window.history.back()}}/>
      </logo>
      <h1 className="text-3xl font-semibold text-center my-7">
        
        UpdateListing{" "}
      </h1>
      <form
        className="flex flex-col sm:flex-row gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-5 flex-1">
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
        <div className="flex flex-col flex-1 gap-4">
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
              className="p-3 border-e-green-900 rounded w-full border"
              accept="images/*"
              onChange={handleFile}
              name="imageUrls"
            />
            <button
              type="button"
              className="p-3 text-green-700  border  border-s-green-400 rounded uppercase hover:shadow-lg disabled:opacity-80"
              onClick={uploadFile}
            >
              {uploadLoading?'UpLoading..':'Upload'}
            </button>
          </div>
          
            {/* {currentFile && currentFile.map((obj, index) => (
              <div key={index} className="flex justify-between p-3 border items-center">
                <img key={index} src={URL.createObjectURL(obj)} alt="" className="w-30 object-contain rounded-lg h-20"/>
                <button type='button' className="font-semibold text-blue-700 uppercase hover:font-bold hover:text-red-700 p-3 rounded-lg " onClick={()=> deleteCurrentFile(index)}>DELETE</button>
              </div>

            ))} */}
            
            {formdata.imageUrls&&formdata.imageUrls.map((imageUrl, index) => (
              <div key={index} className="flex justify-between p-3 border rounded-md items-center border-slate-300">
                <img key={index} src={imageUrl} alt="" className="w-30 object-contain rounded-lg h-20"/>
                <button type="button" className="font-semibold text-blue-700 uppercase hover:font-bold hover:text-red-700 p-3 rounded-lg hover:bg-black " onClick={()=> deleteSavedFile(index)} >DELETE</button>
              </div>

            ))}

          <button
             disabled={loading}
            className="p-3 bg-blue-700 shadow  shadow-blue-950 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:shadow-lg"
          >
             {loading?"Updating...":"Update Listing"}
          </button>
          {error && <p className="text-red-700 uppercase font-semibold">{error}</p>}
        </div>
      </form>
    </main>
  );
}
