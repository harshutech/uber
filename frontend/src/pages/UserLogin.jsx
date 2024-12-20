import React, { useState } from "react";
import {Link} from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    // useState to hold the email and password of the user and update them 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userData, setUserData] = useState({})

    const navigate = useNavigate();

    const { user, setUser } = React.useContext(UserDataContext);

    // function to submit the form to the backend
    const submitHandler = async (e) => {
        e.preventDefault();

        const userData ={
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        if(response.status === 200 ){
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token',data.token);
            navigate('/home');
        }
        
        setEmail('');
        setPassword('');
        
    }


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img className='w-14 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        
        <h3 className="font-medium mb-3">What's your email</h3>
        <input
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm placeholder:text-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email" 
        placeholder="Enter your email" />

        <h3 className="font-medium mb-3">Enter Password</h3>
        <input
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm placeholder:text-gray-400"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required 
        type="password" 
        placeholder="Enter your password" />

        <button className="bg-[#111] text-white font-semibold mb-7 rounded-full px-4 py-2  w-full text-sm placeholder:text-gray-400" >Login</button>
        
      </form>

      <p>Don't have an account? <Link to="/user-signup" className="text-blue-600 font-semibold" >Create an account</Link></p>
        </div>

        <div>
            <Link to="/captain-login" className="flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-7 rounded-full px-4 py-2  w-full text-sm placeholder:text-gray-400">Sign in as Captain</Link>
        </div>
    </div>
  );
};

export default UserLogin;
