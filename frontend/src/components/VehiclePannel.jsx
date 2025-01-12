import React from 'react'

const VehiclePannel = (props) => {
  return (
    <div>
        <h5 className='p-3 absolute text-center  width-full' onClick={()=>{
            props.setvehicalPannel(false)}}>
      <i className=" text-xl ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold text-center py-4">Choose a Ride</h3>

    <div onClick={()=>{
        props.setConfirmRidePannel(true)
        props.setvehicalPannel(false)
    }} className='flex items-center justify-between px-5 py-2 mb-2  w-full border-2 active:border-black rounded-xl'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt=""  />
        <div className=' w-1/2'>
        <h4 className='fontweight-medium text-base'><b>UberX </b> <span><i className="ri-user-3-fill"></i>4</span></h4>
        <h5 className='fontweight-medium text-sm'>2 mins away</h5>
        <p className='fontweight-normal text-xs text-gray-600'> affordable, fast, reliable</p>
      </div>
      <h2 className='text-xl font-semibold'>₹190.20</h2>
    </div>

    <div onClick={()=>{
        props.setConfirmRidePannel(true)
        props.setvehicalPannel(false)
    }} className='flex items-center justify-between px-5 py-2 mb-2  w-full border-2 active:border-black rounded-xl'>
        <img className='h-12' src="https://png.pngtree.com/png-vector/20240510/ourmid/pngtree-auto-rickshaw-png-image_12434615.png" alt=""  />
        <div className=' w-1/2'>
        <h4 className='fontweight-medium text-base'><b>Uber-Auto </b> <span><i className="ri-user-3-fill"></i>3</span></h4>
        <h5 className='fontweight-medium text-sm'>6 mins away</h5>
        <p className='fontweight-normal text-xs text-gray-600'>easiness, cost-effectiveness</p>
      </div>
      <h2 className='text-xl font-semibold'>₹90.00</h2>
    </div>

    <div onClick={()=>{
        props.setConfirmRidePannel(true)
        props.setvehicalPannel(false)
    }} className='flex items-center justify-between px-5 py-2 mb-2  w-full border-2 active:border-black rounded-xl'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt=""  />
        <div className=' w-1/2'>
        <h4 className='fontweight-medium text-base'><b>Uber-Bikes </b> <span><i className="ri-user-3-fill"></i>1</span></h4>
        <h5 className='fontweight-medium text-sm'>10 mins away</h5>
        <p className='fontweight-normal text-xs text-gray-600'> affordable, fast</p>
      </div>
      <h2 className='text-xl font-semibold'>₹50.36</h2>
    </div>
    </div>
  )
}

export default VehiclePannel