import React, { useState } from 'react'

import { SiRedux } from 'react-icons/si';
const Navbar = () => {

  return (
<div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center drop-shadow-2xl">
      <div className="mx-auto md:mx-0">
        
      </div>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl font-sans">
            
              BETA
          </h2>
          <SiRedux />
        </div>
      </div>

      <div className="px-0 md:px-6 mx-auto">
  
      </div>
    </div>
  )
}

export default Navbar