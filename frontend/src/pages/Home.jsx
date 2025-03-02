import React, { useRef, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationPannel from '../components/LocationPannel'
import VehiclePannel from '../components/VehiclePannel'
import ConfirmVehicle from '../components/ConfirmVehicle'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTrack from '../components/LiveTrack'

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
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id });
  }, [user]);



  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`http://localhost:3000/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setdestination(e.target.value)
    try {
      const response = await axios.get(`http://localhost:3000/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }


  useEffect(() => {
    socket.on('ride-confirmed', (data) => {
      console.log('Ride confirmed:', data);
      setRide(data)
      setvehicalFound(false)
      setwaitingForDriver(true)
      setRide(data)
    })
  }, [])

  socket.on('ride-started',ride=>{
    setwaitingForDriver(false)
    console.log("userside",ride)
    navigate(`/riding`, { state: { ride: ride } })
  }
  )

  const submitHandler = (e) => {

    e.preventDefault();
  }

  useGSAP(function () {
    if (pannelopen) {
      gsap.to(pannelRef.current, { height: '70%', padding: '22px' })
      gsap.to(pannelcloseRef.current, { opacity: 1 })
    }
    else {
      gsap.to(pannelRef.current, { height: '0%' })
      gsap.to(pannelcloseRef.current, { opacity: 0 })

    }
  }, [pannelopen])

  useGSAP(function () {
    if (vehicalPannel) {
      gsap.to(vehicalpannelRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(vehicalpannelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalPannel])

  useGSAP(function () {
    if (confirmRidePannel) {
      gsap.to(confirmRidePannelRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(confirmRidePannelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePannel])

  useGSAP(function () {
    if (vehicalFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])



  async function findRide() {
    setpannelopen(false)
    setvehicalPannel(true)

    try {

      const response = await axios.get(`http://localhost:3000/rides/get-fare`, {
        params: { pickup, destination }, // Pass parameters inside 'params', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFare(response.data);
    } catch (error) {
      // console.error('Error fetching fare:', error);

    }
  }


  async function createRide(vehicleType) {
    try {
      const response = await axios.post(`http://localhost:3000/rides/create-ride`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      // handle error
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
    {/* Map (Set as Background) */}
    <div className="absolute inset-0 z-0 pointer-events-auto">
        <LiveTrack />
    </div>

    {/* Content on Top */}
    <div className="relative z-10 pointer-events-none">
        {/* Logo */}
        <img
            className="w-14 mb-10 absolute left-5 top-5 pointer-events-none"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png"
            alt="Uber Logo"
        />

        {/* Main Content */}
        <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
            {/* Find a Trip Section */}
            <div className="h-[30%] bg-white py-5 px-5 rounded-t-3xl border-t-2 border-gray-200 relative z-20 shadow-lg pointer-events-auto">
                <h5 ref={pannelcloseRef} className='opacity-0 absolute right-2 top-3 text-xl' onClick={() => { setpannelopen(false) }}>
                    <i className="ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className='text-2xl font-semibold'>Find a Trip</h3>
          <form onSubmit={(e) => { submitHandler(e) }}>
            <div className="line absolute w-1 h-20 top-[40%] left-10 rounded-full bg-gray-600"></div>
            <input
              onClick={() => {
                setpannelopen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-gray-100 px-10 text-base py-2 rounded-lg mb-3 w-full mt-3'
              type="text"
              placeholder='enter pickup location' />
            <input
              onClick={() => {
                setpannelopen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-gray-100 px-10 text-base py-2 rounded-lg mb-3 w-full mt-3'
              type="text"
              placeholder='enter your destination' />
          </form>
          <button onClick={findRide} className='bg-black text-white py-2 rounded-lg w-full'>Find a ride</button>
        </div>

        {/* location pannel */}
        <div ref={pannelRef} className='h-0 bg-white'>
          <LocationPannel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setpannelopen}
            setVehiclePanel={setvehicalPannel}
            setPickup={setPickup}
            setDestination={setdestination}
            activeField={activeField}
          />
        </div>

        {/* ride options */}
        <div ref={vehicalpannelRef} className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
          <VehiclePannel createRide={createRide} setVehicleType={setVehicleType} selectVehicle={setVehicleType} fare={fare} setvehicalPannel={setvehicalPannel} setConfirmRidePannel={setConfirmRidePannel} />
        </div>

        {/* confirm vehicle */}
        <div ref={confirmRidePannelRef} className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
          <ConfirmVehicle
            createRide={createRide}
            vehicleType={vehicleType}
            fare={fare}
            setConfirmRidePannel={setConfirmRidePannel}
            setvehicalPannel={setvehicalPannel}
            setvehicalFound={setvehicalFound}
            pickup={pickup}
            destination={destination}
          />
        </div>

        {/*Looking for driver */}
        <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            fare={fare}
          />
        </div>

        {/* waiting for driver */}
        <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 p-2 bg-white w-full translate-y-full bor'>
          <WaitingForDriver ride={ride} setwaitingForDriver={setwaitingForDriver} />
        </div>




      </div>
      </div>



    </div>


  )
}

export default home