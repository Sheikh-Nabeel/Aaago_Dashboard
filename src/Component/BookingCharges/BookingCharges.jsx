import React, { useState, useEffect } from 'react';
import Sidebar from '../Home/Sidebar';
import BookingChargesNav from './BookingChargesNav';
import GeneralPricing from './GeneralPricing';
import CarCabPricing from './CarCabPricing';
import BikePricing from './BikePricing';
import CarRecoveryPricing from './CarRecoveryPricing';
import ShiftingMoversPricing from './ShiftingMoversPricing';
import AppointmentServicesPricing from './AppointmentServicesPricing';
import axiosInstance from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const BookingCharges = () => {
  const location = useLocation();
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/admin/comprehensive-pricing/');
      
      if (response.data.success) {
        setPricingData(response.data.data);
      } else {
        setError('Failed to fetch pricing data');
      }
    } catch (err) {
      console.error('Error fetching pricing data:', err);
      setError(err.response?.data?.message || 'Failed to fetch pricing data');
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#DDC104] text-lg">Loading pricing configuration...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400 text-lg">Error: {error}</div>
        </div>
      );
    }

    if (!pricingData) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#DDC104] text-lg">No pricing data available</div>
        </div>
      );
    }

    const path = location.pathname;
    
    switch (path) {
      case '/bookingcharges':
        return <GeneralPricing data={pricingData} onDataUpdate={fetchPricingData} />;
      case '/bookingcharges/carcab':
        return <CarCabPricing data={pricingData} onDataUpdate={fetchPricingData} />;
      case '/bookingcharges/bike':
        return <BikePricing data={pricingData} onDataUpdate={fetchPricingData} />;
      case '/bookingcharges/carrecovery':
        return <CarRecoveryPricing data={pricingData} onDataUpdate={fetchPricingData} />;
      case '/bookingcharges/shiftingmovers':
        return <ShiftingMoversPricing data={pricingData} onDataUpdate={fetchPricingData} />;
      case '/bookingcharges/appointmentservices':
        return <AppointmentServicesPricing data={pricingData} onDataUpdate={fetchPricingData} />;
      default:
        return <GeneralPricing data={pricingData} onDataUpdate={fetchPricingData} />;
    }
  };

  return (
    <div className="flex bg-[#013220] text-[#DDC104] min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-[#013220] border-b border-[#DDC104]">
          <BookingChargesNav />
        </div>
        
        <div className="flex-1 p-6">
          {/* Header with last updated info */}
          {pricingData && (
            <div className="mb-6 p-4 bg-[#013220] border border-[#DDC104] rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#DDC104]">Booking Charges Configuration</h1>
                <div className="text-sm text-gray-400">
                  Last updated: {new Date(pricingData.updatedAt).toLocaleString()}
                  {pricingData.lastUpdatedBy && (
                    <span className="ml-2">by {pricingData.lastUpdatedBy.email}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Currency: {pricingData.currency} | Status: {pricingData.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
          )}
          
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

export default BookingCharges;
