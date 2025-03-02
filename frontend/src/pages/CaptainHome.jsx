import React, { useRef, useState,useEffect, useContext } from 'react'
import CaptainDetails from '../components/CaptainDetails'
import axios from 'axios'
import RidePopup from '../components/RidePopup'
import{useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { captainDataContext } from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext'

const CaptainHome = () => {
const ridePopupPannelRef = useRef(null)
const cofirmRidepopupRef = useRef(null)
const [ridePopupPannel, setRidePopupPannel] = useState(false)
const [confirmPopupPannel, setconfirmPopupPannel] = useState(false)
const [ride, setRide] = useState(null)

const {captain} = useContext(captainDataContext)
const {socket} = useContext(SocketContext)
// console.log(captain)
useEffect(() => {
  socket.emit('join', { userType: 'captain', userId: captain._id });

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          }, (response) => {
            // console.log('Server response:', response);
          });
        },
        error => {
          // console.error('Error getting location:', error);
        }
      )
    }
  }

  const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()

  return () => clearInterval(locationInterval)
}, [captain._id, socket]);

socket.on('new-ride', (data) => {
  console.log('New ride:', data);
setRide(data)
setRidePopupPannel(true)
})


async function confirmride() {
  const response = await axios.post('http://localhost:3000/rides/confirm-ride', {
    rideId: ride._id,
    // otp: ride.otp,
    captainId: captain._id
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}





useGSAP(function(){
  if(ridePopupPannel){
    gsap.to(ridePopupPannelRef.current,{
     transform:'translateY(0%)',
   })
  }
  else{
   gsap.to(ridePopupPannelRef.current,{
     transform:'translateY(100%)',
   })
  }
 },[ridePopupPannel])
 
 useGSAP(function(){
  if(confirmPopupPannel){
    gsap.to(cofirmRidepopupRef.current,{
     transform:'translateY(0%)',
   })
  }
  else{
   gsap.to(cofirmRidepopupRef.current,{
     transform:'translateY(100%)',
   })
  }
 },[confirmPopupPannel])


  return (
    <div className="h-screen flex flex-col justify-between">
      {/* Map Section */}
      <div className="h-3/5 w-full relative">
        <img
          className="w-full h-full object-cover"
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
          alt="Map"
        />

        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
          <h1 className="text-2xl font-semibold">Captain</h1>
          <p className="text-sm">Indore</p>
        </div>
      </div>

      {/* Rider Details Section */}
      <div className="h-2/5 bg-white shadow-md rounded-t-lg p-6 rounded-t-xl border-t-2 border-gray-200">
      <CaptainDetails/>
      </div>

      <div ref={ridePopupPannelRef}  className='fixed z-10 bottom-0 translate-y-full  p-2 w-full  bor'>
        <RidePopup ride={ride} confirmride={confirmride} setRidePopupPannel={setRidePopupPannel} setconfirmPopupPannel={setconfirmPopupPannel} />
      </div>


      <div ref={cofirmRidepopupRef}  className='fixed z-10 bottom-0 translate-y-full  p-2 w-full h-full'>
        <ConfirmRidePopup ride={ride} setconfirmPopupPannel={setconfirmPopupPannel} setRidePopupPannel={setRidePopupPannel}/>
      </div>


    </div>
  )
}

export default CaptainHome