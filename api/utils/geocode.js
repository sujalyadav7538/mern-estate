export const geoCode=async(address)=>{
    try{
        const requestOptions = {
            method: "GET",
          };
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
              address
            )}&apiKey=72bee9f218654ad6a595ec9dc8bf3b7b`,
            requestOptions
          );
          const data = await response.json();
      
          const coordinates = data.features[0].geometry.coordinates;
          return coordinates;

    } catch(error){
        console.log(error.message,'heloo');
    }
}