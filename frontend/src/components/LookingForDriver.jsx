import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
        <div>
      <h3 className="text-2xl font-semibold text-center py-4"><i className="ri-search-eye-line"></i> Searching for a Driver</h3>

      <div className='flex justify-between items-center flex-col gap-2'>
      <img className='h-[150px]' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt=""  />
      <div className='w-full'>
            <div className='flex items-center gap-5 border-b-2 p-2'>
                <i className="text-2xl px-2 ri-map-pin-time-fill"></i> 
                <div>
                    {/* <h3><b>Los-angeles, california</b></h3> */}
                    <p className='text-sm text-gray-600'>{props.pickup}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl px-2 ri-map-pin-user-fill"></i> 
                <div>
                    {/* <h3><b>Ring road</b></h3> */}
                    <p className='text-sm text-gray-600'>{props.destination}</p>
                </div>
            </div>

            <div className='flex items-center gap-5  p-2'>
            <i className="text-2xl px-2 ri-currency-fill"></i> 
                <div>
                    <h3><b>₹ {props.fare[props.vehicleType]}</b></h3>
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

export default LookingForDriver