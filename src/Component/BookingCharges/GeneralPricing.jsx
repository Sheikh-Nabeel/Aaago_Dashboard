import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import EditModal from './EditModal';
import PricingUpdateService from '../../services/pricingUpdateService';

const GeneralPricing = ({ data, onDataUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

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

  const handleEditClick = (cardType) => {
    setEditingCard(cardType);
    setIsEditModalOpen(true);
  };

  const handleSaveGeneralPricing = async (formData) => {
    try {
      // Validate the data
      const errors = PricingUpdateService.validatePricingData(formData);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      // Update the pricing
      await PricingUpdateService.updateGeneralPricing(formData);
      
      // Refresh the data
      if (onDataUpdate) {
        onDataUpdate();
      }
    } catch (error) {
      throw error;
    }
  };

  const PricingCard = ({ title, children, className = '', cardType }) => (
    <div className={`bg-[#013220] border border-[#DDC104] rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#DDC104]">{title}</h3>
        <EditButton onClick={() => handleEditClick(cardType)} />
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

  const SurgeLevelCard = ({ level, index }) => (
    <div className="bg-[#0f3025] border border-[#2b5a46] rounded p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#DDC104]">Level {index + 1}</span>
        <span className="text-xs text-gray-400">ID: {level._id}</span>
      </div>
      <InfoRow label="Demand Ratio" value={level.demandRatio} suffix="x" />
      <InfoRow label="Multiplier" value={level.multiplier} suffix="x" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Base Fare */}
        <PricingCard title="Base Fare" cardType="general">
          <InfoRow label="Amount" value={data.baseFare?.amount} suffix=" AED" />
          <InfoRow label="Coverage KM" value={data.baseFare?.coverageKm} suffix=" km" />
        </PricingCard>

        {/* Per KM Rate */}
        <PricingCard title="Per KM Rate" cardType="general">
          <InfoRow label="After Base Coverage" value={data.perKmRate?.afterBaseCoverage} suffix=" AED/km" />
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-300 mb-2">City Wise Adjustment</h4>
            <div className="bg-[#0f3025] rounded p-3">
              <InfoRow label="Enabled" value={data.perKmRate?.cityWiseAdjustment?.enabled ? 'Yes' : 'No'} />
              <InfoRow label="Above KM" value={data.perKmRate?.cityWiseAdjustment?.aboveKm} suffix=" km" />
              <InfoRow label="Adjusted Rate" value={data.perKmRate?.cityWiseAdjustment?.adjustedRate} suffix=" AED/km" />
            </div>
          </div>
        </PricingCard>

        {/* Platform Fee */}
        <PricingCard title="Platform Fee" cardType="general">
          <InfoRow label="Total Percentage" value={data.platformFee?.percentage} suffix="%" />
          <InfoRow label="Driver Share" value={data.platformFee?.driverShare} suffix="%" />
          <InfoRow label="Customer Share" value={data.platformFee?.customerShare} suffix="%" />
        </PricingCard>

        {/* Cancellation Charges */}
        <PricingCard title="Cancellation Charges" cardType="general">
          <InfoRow label="Before Arrival" value={data.cancellationCharges?.beforeArrival} suffix=" AED" />
          <InfoRow label="After 25% Distance" value={data.cancellationCharges?.after25PercentDistance} suffix=" AED" />
          <InfoRow label="After 50% Distance" value={data.cancellationCharges?.after50PercentDistance} suffix=" AED" />
          <InfoRow label="After Arrival" value={data.cancellationCharges?.afterArrival} suffix=" AED" />
        </PricingCard>

        {/* Waiting Charges */}
        <PricingCard title="Waiting Charges" cardType="general">
          <InfoRow label="Free Minutes" value={data.waitingCharges?.freeMinutes} suffix=" min" />
          <InfoRow label="Per Minute Rate" value={data.waitingCharges?.perMinuteRate} suffix=" AED/min" />
          <InfoRow label="Maximum Charge" value={data.waitingCharges?.maximumCharge} suffix=" AED" />
        </PricingCard>

        {/* Night Charges */}
        <PricingCard title="Night Charges" cardType="general">
          <InfoRow label="Enabled" value={data.nightCharges?.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Start Hour" value={data.nightCharges?.startHour} suffix=":00" />
          <InfoRow label="End Hour" value={data.nightCharges?.endHour} suffix=":00" />
          <InfoRow label="Fixed Amount" value={data.nightCharges?.fixedAmount} suffix=" AED" />
          <InfoRow label="Multiplier" value={data.nightCharges?.multiplier} suffix="x" />
        </PricingCard>
      </div>

      {/* Surge Pricing */}
      <PricingCard title="Surge Pricing" className="col-span-full" cardType="general">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InfoRow label="Enabled" value={data.surgePricing?.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Admin Controlled" value={data.surgePricing?.adminControlled ? 'Yes' : 'No'} />
          <InfoRow label="Levels Count" value={data.surgePricing?.levels?.length || 0} />
        </div>
        
        {data.surgePricing?.levels && data.surgePricing.levels.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Surge Levels</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.surgePricing.levels.map((level, index) => (
                <SurgeLevelCard key={level._id} level={level} index={index} />
              ))}
            </div>
          </div>
        )}
      </PricingCard>

      {/* VAT */}
      <PricingCard title="VAT Configuration" cardType="general">
        <InfoRow label="Enabled" value={data.vat?.enabled ? 'Yes' : 'No'} />
        <InfoRow label="Percentage" value={data.vat?.percentage} suffix="%" />
      </PricingCard>

      {/* Minimum Fare */}
      <PricingCard title="General Settings" cardType="general">
        <InfoRow label="Minimum Fare" value={data.minimumFare} suffix=" AED" />
        <InfoRow label="Currency" value={data.currency} />
        <InfoRow label="Status" value={data.isActive ? 'Active' : 'Inactive'} />
      </PricingCard>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit General Pricing Configuration"
        data={data}
        onSave={handleSaveGeneralPricing}
      />
    </div>
  );
};

export default GeneralPricing;
