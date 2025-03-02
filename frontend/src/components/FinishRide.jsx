import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endride() {
    try {
      const response = await axios.get(
        `http://localhost:3000/rides/end-ride?rideId=${props.ride._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        navigate(`/captain-home`);
      }
    } catch (error) {
      console.error("Error ending ride:", error.response?.data || error.message);
    }
  }
  
  

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
          <h3 className="text-xl font-semibold mb-2">{props.ride?.user.fullname.firstname || "user Name"}</h3>
          <div className="flex justify-between text-gray-600">
            <span>Pickup:</span>
            <span>{props.ride?.pickup || "Pickup Location"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Drop-off:</span>
            <span>{props.ride?.destination || "Drop-off Location"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total Distance:</span>
            <span>12.5 km</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Fare:</span>
            <span>₹ {props.ride?.fare || "Fare"}</span>
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
          <button onClick={endride} className="w-full bg-green-600 text-white py-3 rounded-full text-lg font-medium hover:bg-green-700 transition">
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
