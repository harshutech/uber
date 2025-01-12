import React from 'react';

const Riding = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      {/* Map Section */}
      <div className="h-1/2 w-full relative">
        <img
          className="w-full h-full object-cover"
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
          alt="Map"
        />
        {/* Ride Info Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
          <h1 className="text-2xl font-semibold">Your Ride</h1>
          <p className="text-sm">Tracking your trip...</p>
        </div>
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
            <h2 className="text-lg font-medium">John Doe</h2>
            <p className="text-sm text-gray-500">Toyota Prius • Black • ABC1234</p>
          </div>
        </div>

        {/* Destination Info */}
        <div className="border-b pb-2 mb-4">
          <h3 className="text-lg font-medium mb-2">Trip Details</h3>
          <div className="flex justify-between items-center text-gray-700">
            <div>
              <p className="text-sm">Pickup Location</p>
              <h4 className="text-md font-semibold">123 Main St, Springfield</h4>
            </div>
            <div>
              <p className="text-sm">Destination</p>
              <h4 className="text-md font-semibold">456 Elm St, Metropolis</h4>
            </div>
          </div>
        </div>

        {/* Ride Stats */}
        <div className="flex justify-between items-center text-gray-700 mb-4">
          <div>
            <p className="text-sm">Estimated Arrival</p>
            <h3 className="text-lg font-semibold">5 min</h3>
          </div>
          <div>
            <p className="text-sm">Fare</p>
            <h3 className="text-lg font-semibold">$12.50</h3>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition">
          Make a Payment
        </button>
      </div>
    </div> 
  );
};

export default Riding;
