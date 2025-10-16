import React, { useState, useCallback } from 'react';
import { MdClose, MdSave, MdAdd, MdDelete } from 'react-icons/md';
import axiosInstance from '../../services/axiosConfig';
import toast from 'react-hot-toast';

const ServiceEditModal = ({ isOpen, onClose, title, data, onSave, serviceType, loading = false }) => {
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
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);

  const handleVehicleTypeChange = useCallback((vehicleType, field, value) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      if (!newData.vehicleTypes) {
        newData.vehicleTypes = {};
      }
      if (!newData.vehicleTypes[vehicleType]) {
        newData.vehicleTypes[vehicleType] = {};
      }
      
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (!newData.vehicleTypes[vehicleType][parent]) {
          newData.vehicleTypes[vehicleType][parent] = {};
        }
        newData.vehicleTypes[vehicleType][parent][child] = value;
      } else {
        newData.vehicleTypes[vehicleType][field] = value;
      }
      
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
      toast.success('Service configuration updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update service configuration');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVehicleNestedValue = (obj, vehicleType, path) => {
    const base = obj?.vehicleTypes?.[vehicleType];
    if (!base) return undefined;
    return path.split('.').reduce((current, key) => current?.[key], base);
  };

  const InputField = ({ label, path, type = 'text', suffix = '', min, max, step, vehicleType = null }) => {
    const inputRef = React.useRef(null);
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          defaultValue={vehicleType ? 
            (getVehicleNestedValue(formData, vehicleType, path) ?? '') : 
            (getNestedValue(formData, path) ?? '')
          }
          onChange={(e) => {
            const fullPath = vehicleType ? `vehicleTypes.${vehicleType}.${path}` : path;
            draftRef.current[fullPath] = { v: e.target.value, t: type };
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

  const CheckboxField = ({ label, path, vehicleType = null }) => {
    const checkboxRef = React.useRef(null);
    
    return (
      <div className="mb-4 flex items-center">
        <input
          ref={checkboxRef}
          type="checkbox"
          defaultChecked={vehicleType ? 
            (Boolean(getVehicleNestedValue(formData, vehicleType, path)) ) : 
            (Boolean(getNestedValue(formData, path)) )
          }
          onChange={(e) => {
            const fullPath = vehicleType ? `vehicleTypes.${vehicleType}.${path}` : path;
            draftRef.current[fullPath] = { v: e.target.checked, t: 'boolean' };
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

  const VehicleTypeCard = ({ vehicleType, vehicleData }) => (
    <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
      <h4 className="text-lg font-semibold text-[#DDC104] mb-4 capitalize">{vehicleType}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField 
          label="Base Fare" 
          path="baseFare" 
          type="number" 
          suffix="AED" 
          min="0" 
          vehicleType={vehicleType}
        />
        <InputField 
          label="Per KM Rate" 
          path="perKmRate" 
          type="number" 
          suffix="AED/km" 
          min="0" 
          step="0.1"
          vehicleType={vehicleType}
        />
      </div>

      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-300 mb-3">Night Charges</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxField 
            label="Enabled" 
            path="nightCharges.enabled" 
            vehicleType={vehicleType}
          />
          <InputField 
            label="Start Hour" 
            path="nightCharges.startHour" 
            type="number" 
            suffix=":00" 
            min="0" 
            max="23"
            vehicleType={vehicleType}
          />
          <InputField 
            label="End Hour" 
            path="nightCharges.endHour" 
            type="number" 
            suffix=":00" 
            min="0" 
            max="23"
            vehicleType={vehicleType}
          />
          <InputField 
            label="Fixed Amount" 
            path="nightCharges.fixedAmount" 
            type="number" 
            suffix="AED" 
            min="0"
            vehicleType={vehicleType}
          />
          <InputField 
            label="Multiplier" 
            path="nightCharges.multiplier" 
            type="number" 
            suffix="x" 
            min="1" 
            step="0.1"
            vehicleType={vehicleType}
          />
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  const vehicleTypes = formData.vehicleTypes || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#013220] border border-[#DDC104] rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* Service Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#DDC104] mb-4">Service Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CheckboxField label="Service Enabled" path="enabled" />
              <InputField label="Minimum Fare" path="minimumFare" type="number" suffix="AED" min="0" />
              {serviceType === 'bike' && (
                <>
                  <InputField label="Base Fare" path="baseFare" type="number" suffix="AED" min="0" />
                  <InputField label="Per KM Rate" path="perKmRate" type="number" suffix="AED/km" min="0" step="0.1" />
                </>
              )}
            </div>
          </div>

          {/* Vehicle Types */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#DDC104] mb-4">Vehicle Types</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(vehicleTypes).map(([vehicleType, vehicleData]) => (
                <VehicleTypeCard 
                  key={vehicleType} 
                  vehicleType={vehicleType} 
                  vehicleData={vehicleData} 
                />
              ))}
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

export default ServiceEditModal;
