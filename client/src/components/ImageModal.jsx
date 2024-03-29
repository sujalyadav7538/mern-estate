/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

export default function ImageModal({ urls }) {
  return (
    <div className="fixed inset-0 flex z-20 justify-center bg-black bg-opacity-0 backdrop-blur-lg rounded-lg h-full overflow-hidden">
      <div className="m-6 p-5  grid grid-cols-1 lg:grid-cols-3 overflow-auto lg:overflow-hidden">
        {urls.map((url, index) => (
          <div key={index} className="max-h-max max-w-sm lg:h-[300px] lg:w-[440px] m-2">
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-2xl shadow-white hover:scale-95 transition-scale duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
