import React, { useEffect, useState, useCallback } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import PricingUpdateService from '../../services/pricingUpdateService';

const AppointmentServicesEditModal = ({ isOpen, onClose, data, onSaved }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const draftRef = React.useRef({}); // collects edits without causing re-renders

  useEffect(() => {
    if (isOpen && data) setFormData(data);
  }, [isOpen, data]);

  const setVal = useCallback((path, value) => {
    setFormData(prevData => {
      const keys = path.split('.');
      const copy = { ...prevData };
      let cur = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (typeof cur[k] !== 'object' || cur[k] == null || Array.isArray(cur[k])) cur[k] = {};
        cur = cur[k];
      }
      cur[keys[keys.length - 1]] = value;
      return copy;
    });
  }, []);

  const getVal = (path) => path.split('.').reduce((c, k) => c?.[k], formData);

  const Input = ({ label, path, type = 'number', step, min, max, suffix }) => {
    const inputRef = React.useRef(null);
    
    return (
      <div>
        <label className="block text-sm text-gray-300 mb-1">{label}</label>
        <input
          ref={inputRef}
          type={type}
          defaultValue={getVal(path) ?? ''}
          onChange={(e) => setVal(path, e.target.value)}
          step={step}
          min={min}
          max={max}
          className="w-full px-3 py-2 bg-[#0f3025] border border-[#2b5a46] rounded text-[#DDC104] focus:outline-none focus:ring-2 focus:ring-[#DDC104]"
        />
        {suffix && <span className="text-xs text-gray-400 ml-1">{suffix}</span>}
      </div>
    );
  };

  const Check = ({ label, path }) => {
    const checkboxRef = React.useRef(null);
    
    return (
      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input
          ref={checkboxRef}
          type="checkbox"
          defaultChecked={Boolean(getVal(path))}
          onChange={(e) => setVal(path, e.target.checked)}
          className="h-4 w-4 text-[#013220] bg-[#0f3025] border-[#2b5a46] rounded focus:ring-[#DDC104]"
        />
        {label}
      </label>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await PricingUpdateService.updateAppointmentServices(formData);
      onSaved && onSaved();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#013220] border border-[#DDC104] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-[#DDC104]">
          <h2 className="text-lg font-semibold text-[#DDC104]">Edit Appointment Services</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#DDC104]"><MdClose size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Check label="Enabled" path="enabled" />
            <Input label="Fixed Appointment Fee" path="fixedAppointmentFee" />
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Confirmation System</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Check label="Enabled" path="confirmationSystem.enabled" />
              <Input label="Survey Timeout Hours" path="confirmationSystem.surveyTimeoutHours" />
              <Check label="Auto GPS Check-In" path="confirmationSystem.autoGpsCheckIn" />
              <Input label="Rating Threshold" path="confirmationSystem.ratingThreshold" />
              <Check label="Dispute Enabled" path="confirmationSystem.disputeHandling.enabled" />
              <Check label="Admin Review Required" path="confirmationSystem.disputeHandling.adminReviewRequired" />
            </div>
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Success Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Check label="Both Confirm Good" path="successCriteria.bothConfirmGood" />
              <Check label="One Confirms Service" path="successCriteria.oneConfirmsService" />
              <Check label="No Show Both" path="successCriteria.noShowBoth" />
            </div>
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Penalty System</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Check label="Penalty Enabled" path="penaltySystem.enabled" />
              <Input label="Too Many No Shows Threshold" path="penaltySystem.tooManyNoShows.threshold" />
              <Input label="Too Many No Shows Penalty" path="penaltySystem.tooManyNoShows.penalty" type="text" />
              <Input label="Bad Ratings Threshold" path="penaltySystem.badRatings.threshold" />
              <Input label="Bad Ratings Consecutive Limit" path="penaltySystem.badRatings.consecutiveLimit" />
              <Input label="Bad Ratings Penalty" path="penaltySystem.badRatings.penalty" type="text" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2 bg-[#0f3025] border border-[#2b5a46] text-[#DDC104] rounded hover:bg-[#2b5a46]">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-[#DDC104] text-[#013220] rounded flex items-center gap-2">
              <MdSave size={16} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentServicesEditModal;


