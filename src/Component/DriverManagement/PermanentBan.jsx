import React from 'react'

const PermanentBan = () => {
  return (
    <div className='py-6 flex flex-col items-center '>
       <form action="" className="max-w-6xl w-full mx-auto space-y-4">
        <div className='flex justify-between'>
          <div>

        <label htmlFor="">Are you Sure you want to Ban this Driver</label>
          </div>
        <div className='flex gap-2'>
 <input type="checkbox" className='bg-[#01432B] accent-[#01432B] ' name="" id="" />
        <label htmlFor="">Yes</label>
        <input type="checkbox" className='bg-[#01432B] accent-[#01432B] ' name="" id="" />
        <label htmlFor="">No</label>
        </div>
        </div>
       
          <textarea name="" className='bg-[#01432B] shadow-lg border-y border-black w-full px-4 placeholder-yellow-400  focus:outline-none py-4 rounded-xl ' placeholder='Describe Reason Here....' rows={8} cols={100} id=""></textarea>
          <button type='submit' className='bg-yellow-400 outline outline-yellow-500 block mx-auto px-8 text-sm font-semibold py-3 mt-4 rounded-full text-black'>Enforce Ban</button>
        </form>
      </div>
  )
}

export default PermanentBan