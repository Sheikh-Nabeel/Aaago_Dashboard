import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import AppointmentServicesEditModal from './AppointmentServicesEditModal';

const AppointmentServicesPricing = ({ data, onDataUpdate }) => {
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

  const QuestionCard = ({ questions, title }) => (
    <div className="bg-[#0f3025] border border-[#2b5a46] rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-[#DDC104]">{title}</h4>
        <EditButton />
      </div>
      {questions.map((question, index) => (
        <div key={question._id || index} className="mb-4 last:mb-0">
          <div className="text-sm font-medium text-gray-300 mb-2">{question.question}</div>
          <div className="flex flex-wrap gap-2">
            {question.options.map((option, optIndex) => (
              <span key={optIndex} className="px-2 py-1 bg-[#2b5a46] rounded text-xs text-[#DDC104]">
                {option}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const appointmentData = data?.appointmentServices;

  if (!appointmentData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#DDC104] text-lg">Appointment Services pricing data not available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Service Overview */}
      <PricingCard title="Appointment Services Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoRow label="Service Enabled" value={appointmentData.enabled ? 'Yes' : 'No'} />
          <InfoRow label="Fixed Appointment Fee" value={appointmentData.fixedAppointmentFee} suffix=" AED" />
          <InfoRow label="Penalty System Enabled" value={appointmentData.penaltySystem?.enabled ? 'Yes' : 'No'} />
        </div>
      </PricingCard>

      {/* Confirmation System */}
      <PricingCard title="Confirmation System">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">General Settings</h4>
            <InfoRow label="System Enabled" value={appointmentData.confirmationSystem?.enabled ? 'Yes' : 'No'} />
            <InfoRow label="Survey Timeout Hours" value={appointmentData.confirmationSystem?.surveyTimeoutHours} suffix=" hrs" />
            <InfoRow label="Auto GPS Check-in" value={appointmentData.confirmationSystem?.autoGpsCheckIn ? 'Yes' : 'No'} />
            <InfoRow label="Rating Threshold" value={appointmentData.confirmationSystem?.ratingThreshold} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Dispute Handling</h4>
            <InfoRow label="Enabled" value={appointmentData.confirmationSystem?.disputeHandling?.enabled ? 'Yes' : 'No'} />
            <InfoRow label="Admin Review Required" value={appointmentData.confirmationSystem?.disputeHandling?.adminReviewRequired ? 'Yes' : 'No'} />
          </div>
        </div>
      </PricingCard>

      {/* Customer Survey */}
      <QuestionCard 
        title="Customer Survey Questions" 
        questions={appointmentData.customerSurvey?.questions || []} 
      />

      {/* Provider Survey */}
      <QuestionCard 
        title="Provider Survey Questions" 
        questions={appointmentData.providerSurvey?.questions || []} 
      />

      {/* Success Criteria */}
      <PricingCard title="Success Criteria">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Confirmation Rules</h4>
            <InfoRow label="Both Confirm Good" value={appointmentData.successCriteria?.bothConfirmGood ? 'Yes' : 'No'} />
            <InfoRow label="One Confirms Service" value={appointmentData.successCriteria?.oneConfirmsService ? 'Yes' : 'No'} />
            <InfoRow label="No Show Both" value={appointmentData.successCriteria?.noShowBoth ? 'Yes' : 'No'} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Conflict Resolution</h4>
            <InfoRow label="Method" value={appointmentData.successCriteria?.conflictResolution || 'N/A'} />
          </div>
        </div>
      </PricingCard>

      {/* Penalty System */}
      <PricingCard title="Penalty System">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Too Many No Shows</h4>
            <InfoRow label="Threshold" value={appointmentData.penaltySystem?.tooManyNoShows?.threshold} />
            <InfoRow label="Penalty" value={appointmentData.penaltySystem?.tooManyNoShows?.penalty || 'N/A'} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Bad Ratings</h4>
            <InfoRow label="Threshold" value={appointmentData.penaltySystem?.badRatings?.threshold} />
            <InfoRow label="Consecutive Limit" value={appointmentData.penaltySystem?.badRatings?.consecutiveLimit} />
            <InfoRow label="Penalty" value={appointmentData.penaltySystem?.badRatings?.penalty || 'N/A'} />
          </div>
        </div>
      </PricingCard>

      {/* Survey Settings */}
      <PricingCard title="Survey Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Customer Survey</h4>
            <InfoRow label="Rating Required" value={appointmentData.customerSurvey?.ratingRequired ? 'Yes' : 'No'} />
            <InfoRow label="Feedback Optional" value={appointmentData.customerSurvey?.feedbackOptional ? 'Yes' : 'No'} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Provider Survey</h4>
            <InfoRow label="Rating Required" value={appointmentData.providerSurvey?.ratingRequired ? 'Yes' : 'No'} />
            <InfoRow label="Feedback Optional" value={appointmentData.providerSurvey?.feedbackOptional ? 'Yes' : 'No'} />
          </div>
        </div>
      </PricingCard>

      <AppointmentServicesEditModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        data={appointmentData}
        onSaved={onDataUpdate}
      />
    </div>
  );
};

export default AppointmentServicesPricing;
