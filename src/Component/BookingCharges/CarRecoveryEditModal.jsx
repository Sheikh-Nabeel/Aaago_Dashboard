import React, { useEffect, useState, useCallback } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import PricingUpdateService from '../../services/pricingUpdateService';

const CarRecoveryEditModal = ({ isOpen, onClose, data, onSaved }) => {
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
          onChange={(e) => {
            draftRef.current[path] = { v: e.target.value, t: type };
          }}
          step={step}
          min={min}
          max={max}
          className="w-full px-3 py-2 bg-[#0f3025] border border-[#2b5a46] rounded text-[#DDC104] focus:outline-none focus:ring-2 focus:ring-[#DDC104] focus:border-[#DDC104]"
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
          onChange={(e) => {
            draftRef.current[path] = { v: e.target.checked, t: 'boolean' };
          }}
          className="h-4 w-4 text-[#013220] bg-[#0f3025] border-[#2b5a46] rounded focus:ring-[#DDC104]"
        />
        {label}
      </label>
    );
  };

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
      await PricingUpdateService.updateCarRecoveryService(updated);
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
          <h2 className="text-lg font-semibold text-[#DDC104]">Edit Car Recovery</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#DDC104]"><MdClose size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Check label="Enabled" path="enabled" />
            <Input label="Minimum Fare" path="minimumFare" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Base Fare Amount" path="baseFare.amount" />
            <Input label="Base Coverage KM" path="baseFare.coverageKm" />
            <Input label="Per KM after Base" path="perKmRate.afterBaseCoverage" step="0.1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Check label="City Adj Enabled" path="perKmRate.cityWiseAdjustment.enabled" />
            <Input label="City Adj Above KM" path="perKmRate.cityWiseAdjustment.aboveKm" />
            <Input label="City Adj Rate" path="perKmRate.cityWiseAdjustment.adjustedRate" step="0.1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Platform %" path="platformFee.percentage" step="0.1" />
            <Input label="Driver Share %" path="platformFee.driverShare" step="0.1" />
            <Input label="Customer Share %" path="platformFee.customerShare" step="0.1" />
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Cancellation Charges</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Before Arrival" path="cancellationCharges.beforeArrival" />
              <Input label="After 50% Distance" path="cancellationCharges.after50PercentDistance" />
              <Input label="After Arrival" path="cancellationCharges.afterArrival" />
            </div>
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Waiting Charges</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input label="Free Minutes" path="waitingCharges.freeMinutes" />
              <Input label="Per Minute" path="waitingCharges.perMinuteRate" step="0.1" />
              <Input label="Max Charge" path="waitingCharges.maximumCharge" />
              <Check label="Popup Enabled" path="waitingCharges.driverControlPopup.enabled" />
            </div>
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Night Charges</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Check label="Enabled" path="nightCharges.enabled" />
              <Input label="Start Hour" path="nightCharges.startHour" />
              <Input label="End Hour" path="nightCharges.endHour" />
              <Input label="Fixed Amount" path="nightCharges.fixedAmount" />
              <Input label="Multiplier" path="nightCharges.multiplier" step="0.05" />
            </div>
          </div>

          <div>
            <h3 className="text-[#DDC104] font-semibold mb-2">Surge Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Check label="Enabled" path="surgePricing.enabled" />
              <Check label="Admin Controlled" path="surgePricing.adminControlled" />
              <Check label="1.5x" path="surgePricing.surge1_5x" />
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

export default CarRecoveryEditModal;


