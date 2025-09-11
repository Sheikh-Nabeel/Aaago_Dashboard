import React from 'react'
import Map from './Map'
import Detail from './Detail'
import Sidebar from './Sidebar'

const Homepage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
<div className='flex-1'>
<Detail/>
<Map/>
</div>
    </div>
  )
}

export default Homepage