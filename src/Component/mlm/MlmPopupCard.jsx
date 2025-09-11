import React from 'react';

const MlmPopupCard = ({ onClose, user }) => {
  if (!user) return null; // safety check

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center p-6 bg-[#002D20] rounded-xl border border-yellow-400 w-[344px] h-[400px]">
        
        {/* Circular user image overlapping top */}
        <div className="absolute -top-14">
          <img
            src={`https://randomuser.me/api/portraits/men/${user.id + 10}.jpg`} 
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover"
          />
        </div>

        <div className="mt-16 text-yellow-400 text-sm w-full space-y-4">
          <p className='flex justify-between items-center font-bold'>
            <span className="font-semibold text-sm">User name:</span> {user.name}
          </p>
          <p className='flex justify-between items-center font-bold'>
            <span className="font-semibold">Full Name:</span> {user.name}
          </p>
          <p className='flex justify-between items-center font-bold'>
            <span className="font-semibold">Amount:</span> ${user.amount}
          </p>
          <p className='flex justify-between items-center font-bold'>
            <span className="font-semibold">Date:</span> {user.date}
          </p>
          <p className='flex justify-between items-center font-bold'>
            <span className="font-semibold">Role:</span> {user.source}
          </p>
        </div>

        {/* Done button */}
        <button
          onClick={onClose}
          className="mt-6 bg-yellow-400 text-black px-8 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          DONE
        </button>
      </div>
    </div>
  );
};

export default MlmPopupCard;
