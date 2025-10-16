import React, { useEffect, useState } from 'react';
import { MdClose, MdSave } from 'react-icons/md';

const JsonEditModal = ({ isOpen, onClose, title, data, onSave }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        setText(JSON.stringify(data, null, 2));
        setError('');
      } catch (_e) {
        setText('');
      }
    }
  }, [isOpen, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const parsed = JSON.parse(text);
      await onSave(parsed);
      onClose();
    } catch (e) {
      setError(e.message || 'Invalid JSON');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#013220] border border-[#DDC104] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-[#DDC104]">
          <h2 className="text-xl font-semibold text-[#DDC104]">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#DDC104]">
            <MdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col h-[70vh]">
          <textarea
            className="flex-1 font-mono text-sm p-4 bg-gray-800 text-[#DDC104] outline-none border-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
          {error && (
            <div className="px-4 py-2 text-red-400 text-sm border-t border-[#7f1d1d] bg-[#1f2937]">{error}</div>
          )}
          <div className="flex justify-end gap-3 p-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-700"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#DDC104] text-[#013220] rounded-md hover:bg-yellow-300 flex items-center gap-2"
            >
              <MdSave size={16} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JsonEditModal;


