import React from 'react'

const WaitingForDriver = ({ride}) => {
  return (
    <div>
    <div>

    <div className='flex items-center justify-between'>
        <img className='w-[130px]' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
    <div className='flex flex-col text-right'>
    <h2 className='font-xl capitalize'>{ride?.captain.fullname.firstname}</h2>
    <h4 className='font-semibold font-2xl'>{ride?.captain.vehicle.plate}</h4>
    <h3 className='text-sm text-gray-600'>OTP : {ride?.otp}</h3>

    <h3><i className="ri-star-line"></i> 4.5</h3>
    </div>
    </div>

  <div className='flex justify-between items-center flex-col gap-2'>
  <div className='w-full'>
        <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl px-2 ri-map-pin-time-fill"></i> 
            <div>
                
                <p className='text-sm text-gray-600'>{ride?.pickup}</p>
            </div>
        </div>

        <div className='flex items-center gap-5 border-b-2 p-2'>
        <i className="text-2xl px-2 ri-map-pin-user-fill"></i> 
            <div>
               
                <p className='text-sm text-gray-600'>{ride?.destination}</p>
            </div>
        </div>

        <div className='flex items-center gap-5  p-2'>
        <i className="text-2xl px-2 ri-currency-fill"></i> 
            <div>
                <h3><b>₹ {ride?.fare}</b></h3>
                <p className='text-sm text-gray-600'>Cash, Card</p>
            </div>
        </div>
  </div>
  {/* <button className='w-[80%] bg-green-600 text-lg text-white py-3 mt-4 mb-2 rounded-full'>Confirm</button> */}
  </div>
</div>
</div>
  )
}

export default WaitingForDriver