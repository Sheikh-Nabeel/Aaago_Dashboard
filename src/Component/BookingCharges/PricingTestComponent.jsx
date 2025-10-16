import React, { useState } from 'react';
import PricingUpdateService from '../services/pricingUpdateService';

const PricingTestComponent = () => {
  const [testData, setTestData] = useState({
    currency: "AED",
    baseFare: { amount: 50, coverageKm: 6 },
    perKmRate: {
      afterBaseCoverage: 7.5,
      cityWiseAdjustment: { enabled: true, aboveKm: 12, adjustedRate: 9 }
    },
    minimumFare: 50,
    platformFee: { percentage: 15, driverShare: 7.5, customerShare: 7.5 },
    cancellationCharges: {
      beforeArrival: 2,
      after25PercentDistance: 5,
      after50PercentDistance: 5,
      afterArrival: 10
    },
    waitingCharges: { freeMinutes: 5, perMinuteRate: 2, maximumCharge: 20 },
    nightCharges: {
      enabled: true,
      startHour: 22,
      endHour: 6,
      fixedAmount: 10,
      multiplier: 1.25
    },
    surgePricing: {
      enabled: true,
      adminControlled: true,
      levels: [
        { demandRatio: 2, multiplier: 1.2 },
        { demandRatio: 3, multiplier: 1.5 },
        { demandRatio: 4, multiplier: 2.0 }
      ]
    },
    vat: { enabled: true, percentage: 5 }
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestUpdate = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await PricingUpdateService.updateGeneralPricing(testData);
      setResult({ success: true, data: response });
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#013220] text-[#DDC104]">
      <h2 className="text-2xl font-bold mb-4">Pricing Update API Test</h2>
      
      <div className="mb-4">
        <button
          onClick={handleTestUpdate}
          disabled={loading}
          className="px-4 py-2 bg-[#DDC104] text-[#013220] rounded hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Update API'}
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded ${result.success ? 'bg-green-900' : 'bg-red-900'}`}>
          <h3 className="font-bold mb-2">
            {result.success ? 'Success!' : 'Error'}
          </h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result.success ? result.data : result.error, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Test Data:</h3>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(testData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default PricingTestComponent;
