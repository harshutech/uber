import React, { useState } from "react";
import { Link } from "react-router-dom";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  // useState to hold the email and password of the user and update them
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { captainData, setCaptain } = React.useContext(captainDataContext);

  const navigate = useNavigate();

  // function to submit the form to the backend
  const submitHandler = async (e) => {
    e.preventDefault();

    const captainUserData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainUserData
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword(""); 
    setFirstname("");
    setLastname("");
    setVehicleColor("");
    setVehicleType("");
    setVehiclePlate("");
    setVehicleCapacity("");
  };


  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-[14px] w-full  font-medium mb-1'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-3'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-[14px] placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border   text-[14px] placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value)
              }}
            />
          </div>

          <h3 className='text-[14px] font-medium mb-1'>What's our Captain's email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-[14px] placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-[14px] font-medium mb-1'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-[14px] placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <h3 className='text-[14px] font-medium mb-1'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-[14px] placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-[14px] placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-[14px] placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-[10px] placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Bike</option>
              <option value="auto">Auto</option>
              <option value="moto">Car</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-[15px] placeholder:text-base'
          >Create Captain Account</button>
        </form>


        <p>
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[8px]">
          By proceeding, you consent to get calls, Whatsapp or SMS messege,
          including by an automated mean, from uber and its affliats to number
          provider{" "}
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
