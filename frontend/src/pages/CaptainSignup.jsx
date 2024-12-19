import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  // useState to hold the email and password of the user and update them
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [captainData, setCaptainData] = useState({});

  // function to submit the form to the backend
  const submitHandler = async (e) => {
    e.preventDefault();
    setCaptainData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });
    console.log(captainData);

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-14 mb-10"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h2 className="flex justify-center font-bold text-lg mb-5">
            <span className="text-[#d5622d]">Captain Register</span>
          </h2>
          <h3 className="font-medium mb-1">Enter your Name</h3>
          <div className="flex gap-2.5 mb-4">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-sm placeholder:text-gray-400"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              type="text"
              placeholder="First name"
            />

            <input
              className="bg-[#eeeeee] w-1/1 rounded px-4 py-2 border text-sm placeholder:text-gray-400"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              type="text"
              placeholder="Last name"
            />
          </div>

          <h3 className="font-medium mb-1">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
          />

          <h3 className="font-medium mb-1">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
          />

          <button className="bg-[#111] text-white font-semibold mb-7 rounded-full px-4 py-2  w-full text-sm placeholder:text-gray-400">
            Register as captain
          </button>
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
