import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTrack from '../components/LiveTrack';

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('ride-ended', () => {
      navigate('/home');
    });
    return () => socket.off('ride-ended');
  }, [socket, navigate]);

  return (
    <div className="h-screen relative">
      {/* Interactive Map as Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LiveTrack />
      </div>

      {/* Ride Info Overlay (Above the Map) */}
      <div className="relative z-10 h-screen flex flex-col justify-end">
        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/70 to-transparent text-white pointer-events-none">
          <h1 className="text-2xl font-semibold">Your Ride</h1>
          <p className="text-sm">Tracking your trip...</p>
        </div>

        {/* Ride Details Section */}
        <div className="h-1/2 bg-white shadow-md rounded-t-lg p-6">
          {/* Driver and Car Info */}
          <div className="flex items-center gap-4 border-b pb-1 mb-4">
            <img
              className="w-16 h-16 rounded-full object-cover"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Driver"
            />
            <div>
              <h2 className="text-lg font-medium">{ride?.captain.fullname.firstname}</h2>
              <p className="text-sm text-gray-500">{ride?.captain.vehicle.plate}</p>
            </div>
          </div>

          {/* Destination Info */}
          <div className="border-b pb-2 mb-4">
            <h3 className="text-lg font-medium mb-2">Trip Details</h3>
            <div className="flex justify-between items-center text-gray-700">
              <div>
                <p className="text-sm">Pickup Location</p>
                <h4 className="text-md font-semibold">{ride?.pickup}</h4>
              </div>
              <div>
                <p className="text-sm">Destination</p>
                <h4 className="text-md font-semibold">{ride?.destination}</h4>
              </div>
            </div>
          </div>

          {/* Ride Stats */}
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <div>
              <p className="text-sm">Estimated Arrival</p>
              <h3 className="text-lg font-semibold">15 min</h3>
            </div>
            <div>
              <p className="text-sm">Fare</p>
              <h3 className="text-lg font-semibold">₹ {ride?.fare}</h3>
            </div>
          </div>

          {/* Payment Button */}
          <button className="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
