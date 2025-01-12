import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        const otp = Array.from(e.target.elements)
            .filter((el) => el.name === "otp-digit")
            .map((el) => el.value)
            .join("");
        console.log("Entered OTP:", otp); // Replace with actual OTP handling logic
        props.setconfirmPopupPannel(false);
    }
    return (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
            {/* Popup Container */}
            <div className="relative bg-white rounded-lg shadow-lg p-4 w-full h-full md:w-[90%] md:h-[90%] max-w-4xl overflow-y-auto">
                {/* Close Button */}
                <h5
                    className="absolute top-4 right-5 text-gray-600 cursor-pointer"
                    onClick={() => {
                        props.setconfirmPopupPannel(false);
                    }}
                >
                    <i className="text-2xl ri-close-line"></i>
                </h5>

                {/* Title */}
                <h3 className="text-xl font-semibold text-center py-4">Confirm this Ride to Start</h3>

                {/* Ride Details */}
                <div className="flex flex-col gap-4 items-center">
                    {/* Rider's Profile Image */}
                    <img
                        className="h-30 w-30 rounded-full object-cover"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="user profile"
                    />

                    {/* Distance Information */}
                    <div className="bg-gray-100 p-3 rounded-md w-full text-center shadow-sm">
                        <h4 className="text-lg font-medium">
                            Passenger Distance: <span className="text-green-600">{props.distance || "Calculating..."} km</span>
                        </h4>
                    </div>

                    {/* Location Details */}
                    <div className="w-full px-4">
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
                    <div className="flex gap-4 w-full mt-4 px-4">
                        {/* OTP Form and Action Buttons */}
                        <form
                            onSubmit={(e) => {
                                submitHandler(e);
                            }}
                            className="w-full mt-4 px-4 flex flex-col items-center gap-4"
                        >
                            {/* OTP Input */}
                            {/* OTP Input */}
                            <div className="w-full flex justify-center gap-2">
                                <input
                                    type="text"
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-60 h-12 text-center border-2 border-black rounded-lg focus:outline-none focus:ring focus:ring-green-600 text-lg font-medium"
                                    placeholder="Enter OTP"
                                />
                            </div>


                            {/* Action Buttons */}
                            <div className="flex gap-4 w-full justify-between mt-4">
                                <Link to="/captain-riding"
                                    type="submit"
                                    className="w-1/2 bg-green-600 text-white flex justify-center py-3 rounded-full text-lg font-medium hover:bg-green-700 transition"
                                >
                                    Confirm Ride
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        props.setconfirmPopupPannel(false);
                                    }}
                                    className="w-1/2 bg-red-600 text-white py-3 rounded-full text-lg font-medium hover:bg-red-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRidePopup;
