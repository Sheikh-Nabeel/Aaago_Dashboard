import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import JsonEditModal from './JsonEditModal';
import CarRecoveryEditModal from './CarRecoveryEditModal';
import PricingUpdateService from '../../services/pricingUpdateService';

const CarRecoveryPricing = ({ data, onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState('winching');

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

  const [isFormOpen, setIsFormOpen] = useState(false);

  const PricingCard = ({ title, children, className = '' }) => (
    <div className={`bg-[#013220] border border-[#DDC104] rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#DDC104]">{title}</h3>
        <div className="flex gap-2">
          <EditButton onClick={() => setIsFormOpen(true)} />
          <button
            className="px-3 py-1 rounded text-sm font-medium bg-[#0f3025] text-gray-200 hover:bg-[#2b5a46] border border-[#2b5a46]"
            title="Edit as JSON"
            onClick={() => setIsEditOpen(true)}
          >JSON</button>
        </div>
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

  const ServiceCard = ({ serviceName, serviceData }) => (
    <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-[#DDC104] capitalize">{serviceName}</h4>
        <EditButton />
      </div>
      
      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Basic Pricing</h5>
          <InfoRow label="Base Fare" value={serviceData.baseFare?.amount} suffix=" AED" />
          <InfoRow label="Coverage KM" value={serviceData.baseFare?.coverageKm} suffix=" km" />
          <InfoRow label="Per KM Rate" value={serviceData.perKmRate?.afterBaseCoverage} suffix=" AED/km" />
          <InfoRow label="Convenience Fee" value={serviceData.convenienceFee} suffix=" AED" />
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Waiting Charges</h5>
          <InfoRow label="Free Minutes" value={serviceData.waitingCharges?.freeMinutes} suffix=" min" />
          <InfoRow label="Per Minute Rate" value={serviceData.waitingCharges?.perMinuteRate} suffix=" AED/min" />
          <InfoRow label="Maximum Charge" value={serviceData.waitingCharges?.maximumCharge} suffix=" AED" />
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Night Charges</h5>
          <InfoRow label="Enabled" value={serviceData.nightCharges?.enabled ? 'Yes' : 'No'} />
          {serviceData.nightCharges?.enabled && (
            <>
              <InfoRow label="Start Hour" value={serviceData.nightCharges.startHour} suffix=":00" />
              <InfoRow label="End Hour" value={serviceData.nightCharges.endHour} suffix=":00" />
              <InfoRow label="Fixed Amount" value={serviceData.nightCharges.fixedAmount} suffix=" AED" />
              <InfoRow label="Multiplier" value={serviceData.nightCharges.multiplier} suffix="x" />
            </>
          )}
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Surge Pricing</h5>
          <InfoRow label="Enabled" value={serviceData.surgePricing?.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Admin Controlled" value={serviceData.surgePricing?.adminControlled ? 'Yes' : 'No'} />
          {serviceData.surgePricing?.levels && serviceData.surgePricing.levels.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-400">Levels: {serviceData.surgePricing.levels.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const carRecoveryData = data?.serviceTypes?.carRecovery;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const serviceTypes = carRecoveryData?.serviceTypes || {};

  if (!carRecoveryData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#DDC104] text-lg">Car Recovery pricing data not available</div>
      </div>
    );
  }

  const tabs = Object.keys(serviceTypes);

  return (
    <div className="space-y-6">
      {/* Service Overview */}
      <PricingCard title="Car Recovery Service Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoRow label="Service Enabled" value={carRecoveryData.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Minimum Fare" value={carRecoveryData.minimumFare} suffix=" AED" />
          <InfoRow label="Service Types" value={tabs.length} />
        </div>
      </PricingCard>

      {/* General Car Recovery Settings */}
      <PricingCard title="General Car Recovery Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Base Configuration</h4>
            <InfoRow label="Base Fare" value={carRecoveryData.baseFare?.amount} suffix=" AED" />
            <InfoRow label="Coverage KM" value={carRecoveryData.baseFare?.coverageKm} suffix=" km" />
            <InfoRow label="Per KM Rate" value={carRecoveryData.perKmRate?.afterBaseCoverage} suffix=" AED/km" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Platform Fee</h4>
            <InfoRow label="Percentage" value={carRecoveryData.platformFee?.percentage} suffix="%" />
            <InfoRow label="Driver Share" value={carRecoveryData.platformFee?.driverShare} suffix="%" />
            <InfoRow label="Customer Share" value={carRecoveryData.platformFee?.customerShare} suffix="%" />
          </div>
        </div>
      </PricingCard>

      {/* Service Types Tabs */}
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
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'winching' && serviceTypes.winching && (
            <div className="space-y-6">
              <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#DDC104] mb-4">Winching Service Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <InfoRow label="Service Enabled" value={serviceTypes.winching.enabled ? 'Yes' : 'No'} />
                  <InfoRow label="Min Charges Driver Arriving" value={serviceTypes.winching.minimumChargesForDriverArriving} suffix=" AED" />
                  <InfoRow label="Default Convenience Fee" value={serviceTypes.winching.convenienceFee?.default} suffix=" AED" />
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-3">Convenience Fee Options</h5>
                  <div className="flex gap-2">
                    {serviceTypes.winching.convenienceFee?.options?.map((fee, index) => (
                      <span key={index} className="px-3 py-1 bg-[#2b5a46] rounded text-sm text-[#DDC104]">
                        {fee} AED
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#DDC104] mb-4">Winching Subcategories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(serviceTypes.winching.subCategories || {}).map(([subCategory, subData]) => (
                    <ServiceCard key={subCategory} serviceName={subCategory} serviceData={subData} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'roadsideAssistance' && serviceTypes.roadsideAssistance && (
            <div className="space-y-6">
              <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-[#DDC104] mb-4">Roadside Assistance Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <InfoRow label="Service Enabled" value={serviceTypes.roadsideAssistance.enabled ? 'Yes' : 'No'} />
                  <InfoRow label="Min Charges Driver Arriving" value={serviceTypes.roadsideAssistance.minimumChargesForDriverArriving} suffix=" AED" />
                  <InfoRow label="Default Convenience Fee" value={serviceTypes.roadsideAssistance.convenienceFee?.default} suffix=" AED" />
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-3">Convenience Fee Options</h5>
                  <div className="flex gap-2">
                    {serviceTypes.roadsideAssistance.convenienceFee?.options?.map((fee, index) => (
                      <span key={index} className="px-3 py-1 bg-[#2b5a46] rounded text-sm text-[#DDC104]">
                        {fee} AED
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#DDC104] mb-4">Roadside Assistance Subcategories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(serviceTypes.roadsideAssistance.subCategories || {}).map(([subCategory, subData]) => (
                    <ServiceCard key={subCategory} serviceName={subCategory} serviceData={subData} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'keyUnlockerServices' && serviceTypes.keyUnlockerServices && (
            <ServiceCard serviceName="Key Unlocker Services" serviceData={serviceTypes.keyUnlockerServices} />
          )}
        </div>
      </div>

      {/* JSON Edit Modal for full CarRecovery payload */}
      <JsonEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Car Recovery Configuration (JSON)"
        data={carRecoveryData}
        onSave={async (payload) => {
          await PricingUpdateService.updateCarRecoveryService(payload);
          if (onDataUpdate) {
            onDataUpdate();
          }
        }}
      />
      <CarRecoveryEditModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        data={carRecoveryData}
        onSaved={onDataUpdate}
      />
    </div>
  );
};

export default CarRecoveryPricing;
