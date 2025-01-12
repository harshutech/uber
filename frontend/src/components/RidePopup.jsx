import React from 'react';

const RidePopup = (props) => {
  return (
    <div className=" flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-lg">
        {/* Close Button */}
        <h5
          className="p-5 absolute top-2 right-5 text-gray-600 cursor-pointer"
          onClick={()=>{
            props.setRidePopupPannel(false)
        }}
        >
          <i className="text-xl ri-close-line"></i>
        </h5>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-center py-4">Ride Request</h3>

        {/* Ride Details */}
        <div className="flex flex-col gap-4 items-center">
          {/* Rider's Profile Image */}
          <img
            className="h-[150px] rounded-full object-cover"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="user profile"
          />

          {/* Distance Information */}
          <div className="bg-gray-100 p-3 rounded-md w-full text-center shadow-sm">
            <h4 className="text-lg font-medium">
              Passanger Distance: <span className="text-green-600">{props.distance || "Calculating..."} km</span>
            </h4>
          </div>

          {/* Location Details */}
          <div className="w-full">
            {/* Pickup Location */}
            <div className="flex items-center gap-5 border-b-2 p-2">
              <i className="text-2xl px-2 ri-map-pin-time-fill"></i>
              <div>
                <h3><b>Pickup Location</b></h3>
                <p className="text-sm text-gray-600">Los-angeles, California</p>
              </div>
            </div>

            {/* Drop-off Location */}
            <div className="flex items-center gap-5 border-b-2 p-2">
              <i className="text-2xl px-2 ri-map-pin-user-fill"></i>
              <div>
                <h3><b>Drop-off Location</b></h3>
                <p className="text-sm text-gray-600">Ring Road, Indore</p>
              </div>
            </div>

            {/* Fare Details */}
            <div className="flex items-center gap-5 p-2">
              <i className="text-2xl px-2 ri-currency-fill"></i>
              <div>
                <h3><b>₹ 190.20</b></h3>
                <p className="text-sm text-gray-600">Cash, Card</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full mt-4">
            <button
              onClick={() => {
                props.setconfirmPopupPannel(true);
                props.setRidePopupPannel(false);
              }}
              className="w-1/2 bg-green-600 text-white py-3 rounded-full text-lg font-medium hover:bg-green-700 transition"
            >
              Accept
            </button>
            <button
              onClick={() => {
                // props.setRideIgnored(true);
                props.setRidePopupPannel(false);
              }}
              className="w-1/2 bg-red-600 text-white py-3 rounded-full text-lg font-medium hover:bg-red-700 transition"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePopup;
