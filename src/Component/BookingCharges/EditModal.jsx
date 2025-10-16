import React, { useState, useCallback } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import axiosInstance from '../../services/axiosConfig';
import toast from 'react-hot-toast';

const EditModal = ({ isOpen, onClose, title, data, onSave, loading = false }) => {
  const [formData, setFormData] = useState(data || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const draftRef = React.useRef({}); // collects edits without causing re-renders

  React.useEffect(() => {
    if (isOpen && data) {
      setFormData(data);
    }
  }, [isOpen, data]);

  const handleInputChange = useCallback((path, value) => {
    setFormData(prevData => {
      const keys = path.split('.');
      const newData = { ...prevData };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];
        const nextIsIndex = Number.isInteger(Number(nextKey));
        
        if (nextIsIndex) {
          if (!Array.isArray(current[key])) current[key] = [];
        } else if (typeof current[key] !== 'object' || current[key] === null || Array.isArray(current[key])) {
          current[key] = {};
        }
        current = current[key];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);

  const applyPath = (target, path, rawValue, typeHint) => {
    const keys = path.split('.');
    let current = target;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (typeof current[key] !== 'object' || current[key] === null || Array.isArray(current[key])) {
        current[key] = {};
      }
      current = current[key];
    }

    let valueToSet = rawValue;
    if (typeHint === 'number') {
      valueToSet = rawValue === '' ? null : Number(rawValue);
    } else if (typeHint === 'boolean') {
      valueToSet = Boolean(rawValue);
    }
    current[keys[keys.length - 1]] = valueToSet;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const updated = JSON.parse(JSON.stringify(formData));
      const entries = Object.entries(draftRef.current || {});
      for (const [path, meta] of entries) {
        applyPath(updated, path, meta.v, meta.t);
      }
      await onSave(updated);
      toast.success('Configuration updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update configuration');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ label, path, type = 'text', suffix = '', min, max, step }) => {
    const inputRef = React.useRef(null);
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          defaultValue={getNestedValue(formData, path) ?? ''}
          onChange={(e) => {
            draftRef.current[path] = { v: e.target.value, t: type };
          }}
          className="w-full px-3 py-2 bg-[#0f3025] border border-[#2b5a46] rounded-md text-[#DDC104] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DDC104] focus:border-[#DDC104]"
          min={min}
          max={max}
          step={step}
        />
        {suffix && <span className="ml-2 text-gray-400">{suffix}</span>}
      </div>
    );
  };

  const CheckboxField = ({ label, path }) => {
    const checkboxRef = React.useRef(null);
    
    return (
      <div className="mb-4 flex items-center">
        <input
          ref={checkboxRef}
          type="checkbox"
          defaultChecked={Boolean(getNestedValue(formData, path))}
          onChange={(e) => {
            draftRef.current[path] = { v: e.target.checked, t: 'boolean' };
          }}
          className="mr-3 h-4 w-4 text-[#013220] focus:ring-[#DDC104] border-[#2b5a46] rounded bg-[#0f3025]"
        />
        <label className="text-sm font-medium text-gray-300">{label}</label>
      </div>
    );
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#013220] border border-[#DDC104] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-[#DDC104]">
          <h2 className="text-xl font-semibold text-[#DDC104]">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#DDC104] transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#DDC104] mb-4">General Settings</h3>
              
              <InputField label="Currency" path="currency" />
              <InputField label="Minimum Fare" path="minimumFare" type="number" suffix="AED" min="0" />
              
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-300">Base Fare</h4>
                <InputField label="Amount" path="baseFare.amount" type="number" suffix="AED" min="0" />
                <InputField label="Coverage KM" path="baseFare.coverageKm" type="number" suffix="km" min="0" />
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-300">Per KM Rate</h4>
                <InputField label="After Base Coverage" path="perKmRate.afterBaseCoverage" type="number" suffix="AED/km" min="0" step="0.1" />
                <CheckboxField label="City Wise Adjustment Enabled" path="perKmRate.cityWiseAdjustment.enabled" />
                <InputField label="Above KM" path="perKmRate.cityWiseAdjustment.aboveKm" type="number" suffix="km" min="0" />
                <InputField label="Adjusted Rate" path="perKmRate.cityWiseAdjustment.adjustedRate" type="number" suffix="AED/km" min="0" step="0.1" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#DDC104] mb-4">Platform & Charges</h3>
              
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-300">Platform Fee</h4>
                <InputField label="Total Percentage" path="platformFee.percentage" type="number" suffix="%" min="0" max="100" step="0.1" />
                <InputField label="Driver Share" path="platformFee.driverShare" type="number" suffix="%" min="0" max="100" step="0.1" />
                <InputField label="Customer Share" path="platformFee.customerShare" type="number" suffix="%" min="0" max="100" step="0.1" />
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-300">Cancellation Charges</h4>
                <InputField label="Before Arrival" path="cancellationCharges.beforeArrival" type="number" suffix="AED" min="0" />
                <InputField label="After 25% Distance" path="cancellationCharges.after25PercentDistance" type="number" suffix="AED" min="0" />
                <InputField label="After 50% Distance" path="cancellationCharges.after50PercentDistance" type="number" suffix="AED" min="0" />
                <InputField label="After Arrival" path="cancellationCharges.afterArrival" type="number" suffix="AED" min="0" />
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-300">Waiting Charges</h4>
                <InputField label="Free Minutes" path="waitingCharges.freeMinutes" type="number" suffix="min" min="0" />
                <InputField label="Per Minute Rate" path="waitingCharges.perMinuteRate" type="number" suffix="AED/min" min="0" step="0.1" />
                <InputField label="Maximum Charge" path="waitingCharges.maximumCharge" type="number" suffix="AED" min="0" />
              </div>
            </div>
          </div>

          {/* Night Charges */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#DDC104] mb-4">Night Charges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxField label="Enabled" path="nightCharges.enabled" />
              <InputField label="Start Hour" path="nightCharges.startHour" type="number" suffix=":00" min="0" max="23" />
              <InputField label="End Hour" path="nightCharges.endHour" type="number" suffix=":00" min="0" max="23" />
              <InputField label="Fixed Amount" path="nightCharges.fixedAmount" type="number" suffix="AED" min="0" />
              <InputField label="Multiplier" path="nightCharges.multiplier" type="number" suffix="x" min="1" step="0.1" />
            </div>
          </div>

          {/* Surge Pricing */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#DDC104] mb-4">Surge Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxField label="Enabled" path="surgePricing.enabled" />
              <CheckboxField label="Admin Controlled" path="surgePricing.adminControlled" />
            </div>
          </div>

          {/* VAT */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#DDC104] mb-4">VAT Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxField label="Enabled" path="vat.enabled" />
              <InputField label="Percentage" path="vat.percentage" type="number" suffix="%" min="0" max="100" step="0.1" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-[#0f3025] border border-[#2b5a46] text-[#DDC104] rounded-md hover:bg-[#2b5a46] transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#DDC104] text-[#013220] rounded-md hover:bg-yellow-300 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#013220]"></div>
                  Saving...
                </>
              ) : (
                <>
                  <MdSave size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
