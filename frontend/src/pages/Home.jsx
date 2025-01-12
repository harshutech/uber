import React, { useRef, useState } from 'react'
import{useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { LocationPannel } from '../components/LocationPannel'
import VehiclePannel from '../components/VehiclePannel'
import ConfirmVehicle from '../components/ConfirmVehicle'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setdestination] = useState('');
  const [pannelopen, setpannelopen] = useState(false);
  const pannelRef = useRef(null)
  const vehicalpannelRef = useRef(null)
  const confirmRidePannelRef = useRef(null)
  const pannelcloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehicalPannel, setvehicalPannel] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false)
  const [vehicalFound, setvehicalFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)


  const submitHandler = (e)=>{

    e.preventDefault();
  }

  useGSAP(function(){
    if(pannelopen){
    gsap.to(pannelRef.current, {height:'70%',padding:'22px'})
    gsap.to(pannelcloseRef.current, {opacity:1})
    }
    else{
      gsap.to(pannelRef.current, {height:'0%'})
      gsap.to(pannelcloseRef.current, {opacity:0})

    }
  },[pannelopen])

  useGSAP(function(){
   if(vehicalPannel){
     gsap.to(vehicalpannelRef.current,{
      transform:'translateY(0%)'
    })
   }
   else{
    gsap.to(vehicalpannelRef.current,{
      transform:'translateY(100%)'
    })
   }
  },[vehicalPannel])

  useGSAP(function(){
    if(confirmRidePannel){
      gsap.to(confirmRidePannelRef.current,{
       transform:'translateY(0%)'
     })
    }
    else{
     gsap.to(confirmRidePannelRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[confirmRidePannel])
   
   useGSAP(function(){
    if(vehicalFound){
      gsap.to(vehicleFoundRef.current,{
       transform:'translateY(0%)'
     })
    }
    else{
     gsap.to(vehicleFoundRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[vehicalFound])

   useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
       transform:'translateY(0%)'
     })
    }
    else{
     gsap.to(waitingForDriverRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[waitingForDriver])
   

  return (
  
  <div className='h-screen relative overflow-hidden'>
    {/* logo */}
    <img className='w-14 mb-10 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />

    {/* map */}
    <div className='h-screen w-screen'>
           <img className='h-full w-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
    </div>
    <div className=' flex flex-col justify-end absolute h-screen top-0  w-full '>

    {/* find a trip */}
    <div className='h-[30%] bg-white py-5 px-5 rounded-t-3xl border-t-2 border-gray-200 relative'>

      <h5 
        ref={pannelcloseRef}
        className='opacity-0 absolute right-2 top-3 text-xl'
        onClick={()=>{setpannelopen(false)}}><i className="ri-arrow-down-wide-line"></i>
      </h5>

    <h3 className='text-2xl font-semibold'>Find a Trip</h3>
    <form onSubmit={(e)=>{submitHandler(e)}}>
      <div className="line absolute w-1 h-20 top-[40%] left-10 rounded-full bg-gray-600"></div>

      <input 
        onClick={()=>{setpannelopen(true)}}
        value={pickup} 
        onChange={(e)=>{setPickup(e.target.value)}} 
        className='bg-gray-100 px-10 text-base py-2 rounded-lg mb-3 w-full mt-3' 
        type="text" 
        placeholder='enter pickup location' />

      <input 
        onClick={()=>{setpannelopen(true)}}
        value={destination} 
        onChange={(e)=>{setdestination(e.target.value)}} 
        className='bg-gray-100 px-10 text-base py-2 rounded-lg mb-3 w-full mt-3' 
        type="text" 
        placeholder='enter your destination' />

    </form>
    </div>

    {/* location pannel */}
    <div ref={pannelRef} className='h-0 bg-white'>
      <LocationPannel setvehicalPannel={setvehicalPannel}  setpannelopen={setpannelopen}/>
    </div>

    {/* ride options */}
    <div ref={vehicalpannelRef}  className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
    <VehiclePannel setvehicalPannel={setvehicalPannel} setConfirmRidePannel={setConfirmRidePannel} />
    </div>

    {/* confirm vehicle */}
    <div ref={confirmRidePannelRef} className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
    <ConfirmVehicle 
      setConfirmRidePannel={setConfirmRidePannel} 
      setvehicalPannel={setvehicalPannel} 
      setvehicalFound={setvehicalFound}
      />
    </div>

     {/*Looking for driver */}
    <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
      <LookingForDriver />
    </div>

    {/* waiting for driver */}
    <div ref={waitingForDriverRef}  className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
      <WaitingForDriver setwaitingForDriver={setwaitingForDriver} />
    </div>
    


   
    </div>




  </div>


  )
}

export default home