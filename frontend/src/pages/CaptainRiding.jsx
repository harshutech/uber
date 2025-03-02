import React from 'react'
import { useState,useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import FinishRide from '../components/FinishRide'
import {useLocation} from 'react-router-dom'

const CaptainRiding = () => {

  const finishRidePannelRef = useRef(null)
  const [finishRidePannel, setFinishRidePannel] = useState(false)

  const location = useLocation()
  const ride = location.state?.ride
  console.log(ride)


  useGSAP(function(){
    if(finishRidePannel){
      gsap.to(finishRidePannelRef.current,{
       transform:'translateY(0%)',
     })
    }
    else{
     gsap.to(finishRidePannelRef.current,{
       transform:'translateY(100%)',
     })
    }
   },[finishRidePannel])

   

  return (
    <div className="h-screen flex flex-col justify-between">
      {/* Map Section */}
      <div className="h-4/5 w-full relative">
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

      <div className='h-1/5 p-6 bg-yellow-200'>
      <h4 className='font-semibold text-lg flex justify-center pb-2 '>4 km away</h4>
      <button onClick={()=>{setFinishRidePannel(true)}} className="w-full bg-green-600 text-white py-3 rounded-full text-lg font-medium hover:bg-green-700 transition">
              Complete Ride
            </button>
      </div>



      <div ref={finishRidePannelRef} className='fixed z-10 bottom-0 translate-y-full p-2 w-full h-full bg-white'>
       <FinishRide  ride={ride} setFinishRidePannel={setFinishRidePannel} />
      </div>

    </div>
  )
}

export default CaptainRiding