import React, { useState } from "react";
import {Link} from "react-router-dom";

const CaptainLogin = () => {

    // useState to hold the email and password of the user and update them 
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [CaptainData, setCaptainData] = useState({})
  
      // function to submit the form to the backend
      const submitHandler = async (e) => {
          e.preventDefault();
          setCaptainData({
              email: email,
              password: password
          });
          // console.log(userData);
          
          setEmail('');
          setPassword('');
          
      }

    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img className='w-14 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h2 className="flex justify-center font-bold text-lg mb-5">Captain login</h2>
        <h3 className="font-medium mb-3"><span className="text-[#d5622d]">Hey Captain</span> What's your email</h3>
        <input
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm placeholder:text-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email" 
        placeholder="Enter your email" />

        <h3 className="font-medium mb-3">Enter Password </h3>
        <input
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm placeholder:text-gray-400"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required 
        type="password" 
        placeholder="Enter your password" />

        <button className="bg-[#111] text-white font-semibold mb-7 rounded-full px-4 py-2  w-full text-sm placeholder:text-gray-400" >Login</button>
        
      </form>

      <p>Join now ? <Link to="/captain-signup" className="text-blue-600 font-semibold" >Register as a captain</Link></p>
        </div>

        <div>
            <Link to="/user-login" className="flex items-center justify-center bg-[#10bb58] text-white font-semibold mb-7 rounded-full px-4 py-2  w-full text-sm placeholder:text-gray-400">Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin