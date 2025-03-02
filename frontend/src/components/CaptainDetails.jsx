import React,{useContext} from 'react'
import {captainDataContext} from '../context/CaptainContext'

const CaptainDetails = (props) => {

  const {captain} = useContext(captainDataContext)

  return (
    <div>
        
        <div className='h-1/2 p-4'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-between items-center gap-5'>
            <img
            className="w-14 h-14 rounded-full object-cover"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Driver"
            />
              <h4 className='font-semibold'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
            </div>

            <div>
              <h4 className='font-semibold text-xl'>₹ 156.50</h4>
              <p className='text-gray-600 text-sm'>Earned</p>
            </div>
          </div>

          <div className='flex justify-center items-start mt-5  py-2 gap-5 bg-gray-200 rounded-xl p-2 '>
            <div className='text-center'>
            <i className="text-2xl font-thin ri-time-line"></i>
            <h5 className='font-semibold'>120 min</h5>
            <p className='text-gray-600 text-sm'>Hours Online</p>
            </div>

            <div className='text-center'>
            <i className=" text-2xl font-thin ri-speed-up-line"></i>
            <h5 className='font-semibold'>120 min</h5>
            <p  className='text-gray-600 text-sm'>Hours Online</p>
            </div>

            <div className='text-center'>
            <i className=" text-2xl font-thin ri-booklet-line"></i>
            <h5 className='font-semibold'>120 min</h5>
            <p  className='text-gray-600 text-sm'>Hours Online</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails