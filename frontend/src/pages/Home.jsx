import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'



const Home = () => {

  return (
    <div>
      
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-16 ml-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />

            <div className="bg-white py-5 px-5 pb-7">
                <h2 className='text-2xl font-bold'>Get started with Uber</h2>
                <Link to='/user-login' className='flex items-center justify-center bg-black text-white  w-full py-4 mt-5 rounded-full mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home