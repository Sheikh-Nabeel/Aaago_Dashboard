import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ShiftingMoversEditModal from './ShiftingMoversEditModal';

const ShiftingMoversPricing = ({ data, onDataUpdate }) => {
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
        <EditButton onClick={() => setIsFormOpen(true)} />
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

  const PricingTable = ({ title, data, columns }) => (
    <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-[#DDC104]">{title}</h4>
        <EditButton />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2b5a46]">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-2 px-3 text-gray-300 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([item, price]) => (
              <tr key={item} className="border-b border-gray-700">
                <td className="py-2 px-3 text-gray-300 capitalize">{item}</td>
                <td className="py-2 px-3 text-[#DDC104] font-medium">{price} AED</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const shiftingData = data?.serviceTypes?.shiftingMovers;

  if (!shiftingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#DDC104] text-lg">Shifting & Movers pricing data not available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Service Overview */}
      <PricingCard title="Shifting & Movers Service Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow label="Service Enabled" value={shiftingData.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Start Fare" value={shiftingData.vehicleCost?.startFare} suffix=" AED" />
          <InfoRow label="Coverage KM" value={shiftingData.vehicleCost?.coverageKm} suffix=" km" />
          <InfoRow label="Per KM Rate" value={shiftingData.vehicleCost?.perKmRate} suffix=" AED/km" />
        </div>
      </PricingCard>

      {/* Vehicle Cost */}
      <PricingCard title="Vehicle Cost Configuration">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoRow label="Start Fare" value={shiftingData.vehicleCost?.startFare} suffix=" AED" />
          <InfoRow label="Coverage KM" value={shiftingData.vehicleCost?.coverageKm} suffix=" km" />
          <InfoRow label="Per KM Rate" value={shiftingData.vehicleCost?.perKmRate} suffix=" AED/km" />
        </div>
      </PricingCard>

      {/* Basic Services */}
      <PricingCard title="Basic Services">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Loading/Unloading Helper</h4>
            <InfoRow label="Flat Fee" value={shiftingData.basicServices?.loadingUnloadingHelper?.flatFee} suffix=" AED" />
            <InfoRow label="Include in Basic Fare" value={shiftingData.basicServices?.loadingUnloadingHelper?.includeInBasicFare ? 'Yes' : 'No'} />
            <InfoRow label="Base Limit" value={shiftingData.basicServices?.loadingUnloadingHelper?.baseLimit} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Packers</h4>
            <InfoRow label="Flat Fee" value={shiftingData.basicServices?.packers?.flatFee} suffix=" AED" />
            <InfoRow label="Include in Basic Fare" value={shiftingData.basicServices?.packers?.includeInBasicFare ? 'Yes' : 'No'} />
            <InfoRow label="Base Limit" value={shiftingData.basicServices?.packers?.baseLimit} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Fixers</h4>
            <InfoRow label="Flat Fee" value={shiftingData.basicServices?.fixers?.flatFee} suffix=" AED" />
            <InfoRow label="Include in Basic Fare" value={shiftingData.basicServices?.fixers?.includeInBasicFare ? 'Yes' : 'No'} />
            <InfoRow label="Base Limit" value={shiftingData.basicServices?.fixers?.baseLimit} />
          </div>
        </div>
      </PricingCard>

      {/* Pickup Location Policy */}
      <PricingCard title="Pickup Location Policy">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Ground Floor</h4>
            <InfoRow label="Extra Charge" value={shiftingData.pickupLocationPolicy?.groundFloor?.extraCharge} suffix=" AED" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Stairs</h4>
            <div className="text-xs text-gray-400 mb-2">Per Floor Fare</div>
            <div className="space-y-1">
              {Object.entries(shiftingData.pickupLocationPolicy?.stairs?.perFloorFare || {}).slice(0, 3).map(([item, price]) => (
                <div key={item} className="flex justify-between text-xs">
                  <span className="text-gray-400 capitalize">{item}:</span>
                  <span className="text-[#DDC104]">{price} AED</span>
                </div>
              ))}
              <div className="text-xs text-gray-500">... and more</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Lift</h4>
            <InfoRow label="Base Limit" value={shiftingData.pickupLocationPolicy?.lift?.baseLimit} />
            <InfoRow label="Base Coverage" value={shiftingData.pickupLocationPolicy?.lift?.baseCoverage} />
            <div className="text-xs text-gray-400 mt-2">Minor charges apply</div>
          </div>
        </div>
      </PricingCard>

      {/* Dropoff Location Policy */}
      <PricingCard title="Dropoff Location Policy">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Ground Floor</h4>
            <InfoRow label="Extra Charge" value={shiftingData.dropoffLocationPolicy?.groundFloor?.extraCharge} suffix=" AED" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Stairs</h4>
            <div className="text-xs text-gray-400 mb-2">Per Floor Fare</div>
            <div className="space-y-1">
              {Object.entries(shiftingData.dropoffLocationPolicy?.stairs?.perFloorFare || {}).slice(0, 3).map(([item, price]) => (
                <div key={item} className="flex justify-between text-xs">
                  <span className="text-gray-400 capitalize">{item}:</span>
                  <span className="text-[#DDC104]">{price} AED</span>
                </div>
              ))}
              <div className="text-xs text-gray-500">... and more</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Lift</h4>
            <InfoRow label="Base Limit" value={shiftingData.dropoffLocationPolicy?.lift?.baseLimit} />
            <InfoRow label="Base Coverage" value={shiftingData.dropoffLocationPolicy?.lift?.baseCoverage} />
            <div className="text-xs text-gray-400 mt-2">Minor charges apply</div>
          </div>
        </div>
      </PricingCard>

      {/* Pricing Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PricingTable 
          title="Packing Fares" 
          data={shiftingData.packingFares} 
          columns={['Item', 'Price']} 
        />
        <PricingTable 
          title="Fixing Fares" 
          data={shiftingData.fixingFares} 
          columns={['Item', 'Price']} 
        />
        <PricingTable 
          title="Loading/Unloading Fares" 
          data={shiftingData.loadingUnloadingFares} 
          columns={['Item', 'Price']} 
        />
      </div>

      <ShiftingMoversEditModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        data={shiftingData}
        onSaved={onDataUpdate}
      />
    </div>
  );
};

export default ShiftingMoversPricing;
