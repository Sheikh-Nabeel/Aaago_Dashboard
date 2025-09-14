import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, showInput = false, inputPlaceholder = '' }) => {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    if (showInput) {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
    setInputValue('');
    onClose();
  };

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#013220] border border-[#374151] rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <p className="text-white mb-6">{message}</p>
        
        {showInput && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full px-3 py-2 bg-[#1f2937] border border-[#374151] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#DDC104] focus:border-[#DDC104] mb-6 placeholder-gray-400"
            autoFocus
          />
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-white bg-[#1f2937] border border-white rounded-md hover:bg-[#374151] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={showInput && !inputValue.trim()}
            className="px-4 py-2 bg-[#DDC104] text-white font-semibold rounded-md hover:bg-[#f59e0b] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;