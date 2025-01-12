import React from 'react'

export const LocationPannel = (props) => {
    

    // sample array of location
    const locations = [
        "Rajwada Palace",
        "Sarafa Bazaar",
        "Patalpani Waterfall",
        "Khajrana Ganesh Temple",
        "Indore Zoo (Kamla Nehru Prani Sangrahalaya)",
        "Chhappan Dukan",
        "Annapurna Temple",
      ];
      

  return (
    <div>
        {
            locations.map(function(elem,idx){

                return <div key={idx} onClick={()=>{
                    props.setvehicalPannel(true)
                    props.setpannelopen(false)
                }} className='flex items-center justify-start my-3 border-white active:border-black border-2 rounded-xl m-2'>
                <h2 className='bg-[#eee] h-9 flex items-center justify-center w-10 rounded-full'><i className="ri-map-pin-range-fill"></i></h2>
                <h4 className='text-[16px] ml-3'>{elem}</h4>
            </div>
            })
        }

    </div>
  )
}
