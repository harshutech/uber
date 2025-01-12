import React from "react";
import { Link } from "react-router-dom";

const FinishRide = () => {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center  ">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md text-center">
        {/* Thank You Message */}
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Ride Completed! 🎉
        </h1>
        {/* Ride Summary */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
          <h3 className="text-xl font-semibold mb-2">Ride Summary</h3>
          <div className="flex justify-between text-gray-600">
            <span>Pickup:</span>
            <span>Los Angeles, CA</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Drop-off:</span>
            <span>Ring Road, Indore</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total Distance:</span>
            <span>12.5 km</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Fare:</span>
            <span>₹ 190.20</span>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Rate Your Experience</h3>
          <div className="flex justify-center gap-2">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <button
                  key={index}
                  className="text-3xl text-gray-400 hover:text-yellow-400 transition focus:outline-none"
                >
                  ★
                </button>
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link to="/captain-home" className="w-full bg-green-600 text-white py-3 rounded-full text-lg font-medium hover:bg-green-700 transition">
            Look for More Rides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
