import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ServiceEditModal from './ServiceEditModal';
import PricingUpdateService from '../../services/pricingUpdateService';

const BikePricing = ({ data, onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState('economy');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const EditButton = ({ disabled = false, onClick }) => (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
        disabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-[#DDC104] text-[#013220] hover:bg-yellow-300'
      }`}
      title={disabled ? 'Update functionality coming soon' : 'Edit configuration'}
    >
      <MdEdit size={16} className="inline mr-1" />
      Edit
    </button>
  );

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveBikePricing = async (formData) => {
    try {
      await PricingUpdateService.updateServiceTypePricing('bike', formData);
      if (onDataUpdate) {
        onDataUpdate();
      }
    } catch (error) {
      throw error;
    }
  };

  const PricingCard = ({ title, children, className = '' }) => (
    <div className={`bg-[#013220] border border-[#DDC104] rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#DDC104]">{title}</h3>
        <EditButton onClick={handleEditClick} />
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, suffix = '' }) => (
    <div className="flex justify-between py-2 border-b border-[#2b5a46] last:border-b-0">
      <span className="text-gray-300">{label}:</span>
      <span className="text-[#DDC104] font-medium">{value}{suffix}</span>
    </div>
  );

  const VehicleTypeCard = ({ vehicleType, vehicleData }) => (
    <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-[#DDC104] capitalize">{vehicleType}</h4>
        <EditButton />
      </div>
      
      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Basic Pricing</h5>
          <InfoRow label="Base Fare" value={vehicleData.baseFare} suffix=" AED" />
          <InfoRow label="Per KM Rate" value={vehicleData.perKmRate} suffix=" AED/km" />
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Night Charges</h5>
          <InfoRow label="Enabled" value={vehicleData.nightCharges?.enabled ? 'Yes' : 'No'} />
          {vehicleData.nightCharges?.enabled && (
            <>
              <InfoRow label="Start Hour" value={vehicleData.nightCharges.startHour} suffix=":00" />
              <InfoRow label="End Hour" value={vehicleData.nightCharges.endHour} suffix=":00" />
              <InfoRow label="Fixed Amount" value={vehicleData.nightCharges.fixedAmount} suffix=" AED" />
              <InfoRow label="Multiplier" value={vehicleData.nightCharges.multiplier} suffix="x" />
            </>
          )}
        </div>
      </div>
    </div>
  );

  const bikeData = data?.serviceTypes?.bike;
  const vehicleTypes = bikeData?.vehicleTypes || {};

  if (!bikeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#DDC104] text-lg">Bike pricing data not available</div>
      </div>
    );
  }

  const tabs = Object.keys(vehicleTypes);

  return (
    <div className="space-y-6">
      {/* Service Overview */}
      <PricingCard title="Bike Service Overview">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InfoRow label="Service Enabled" value={bikeData.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Minimum Fare" value={bikeData.minimumFare} suffix=" AED" />
          <InfoRow label="Base Fare" value={bikeData.baseFare} suffix=" AED" />
          <InfoRow label="Per KM Rate" value={bikeData.perKmRate} suffix=" AED/km" />
        </div>
      </PricingCard>

      {/* Vehicle Types Tabs */}
      <div className="bg-[#013220] border border-[#DDC104] rounded-lg">
        <div className="border-b border-[#DDC104]">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-[#DDC104] text-[#DDC104]'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab && vehicleTypes[activeTab] && (
            <VehicleTypeCard 
              vehicleType={activeTab} 
              vehicleData={vehicleTypes[activeTab]} 
            />
          )}
        </div>
      </div>

      {/* All Vehicle Types Grid View */}
      <div>
        <h3 className="text-xl font-semibold text-[#DDC104] mb-4">All Vehicle Types Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabs.map((vehicleType) => (
            <VehicleTypeCard 
              key={vehicleType}
              vehicleType={vehicleType} 
              vehicleData={vehicleTypes[vehicleType]} 
            />
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <ServiceEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Bike Pricing Configuration"
        data={bikeData}
        onSave={handleSaveBikePricing}
        serviceType="bike"
      />
    </div>
  );
};

export default BikePricing;
