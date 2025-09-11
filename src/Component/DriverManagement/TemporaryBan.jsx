import React from 'react'

const TemporaryBan = () => {
  return (
    <div className='py-6 flex flex-col items-center'>
      <form action="" className="max-w-6xl w-full mx-auto space-y-2">

        {/* Duration Select */}
        <select
          className='bg-[#01432B] shadow-lg border-y border-black w-full px-4 py-4 rounded-xl text-yellow-400 focus:outline-none'
          defaultValue=""
        >
          <option value="" disabled> Duration</option>
          <option value="1day">1 Day</option>
          <option value="3days">3 Days</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
          <option value="custom">Custom</option>
        </select>

        {/* Reason Textarea */}
        <textarea
          name=""
          id=""
          className='bg-[#01432B] shadow-lg border-y border-black w-full px-4 placeholder-yellow-400 focus:outline-none py-4 rounded-xl'
          placeholder='Describe Reason Here....'
          rows={8}
          cols={100}
        ></textarea>

        {/* Upload Block */}
        <div className='flex relative mb-4'>
          <label htmlFor="upload" className="block border-y shadow-lg border-black w-full bg-[#01432B] text-yellow-400 px-4 text-sm py-4 rounded cursor-pointer">
            Upload File or Photo
            <input type="file" id="upload" className="hidden" />
          </label>
          <button type='submit' className='bg-yellow-400 px-10 py-3.5 absolute rounded-tr-md rounded-br-md top-0 text-black right-0 font-semibold'>
            Upload
          </button>
        </div>

        {/* Submit Button */}
        <button type='submit' className='bg-yellow-400 outline outline-yellow-500 block mx-auto px-8 text-sm font-semibold py-3 mt-4 rounded-full text-black'>
          Sending Warning
        </button>

      </form>
    </div>
  )
}

export default TemporaryBan;
