import React, { useState, useEffect } from 'react';
import Sidebar from '../Home/Sidebar';
import { useGetVehicleSelectFlowQuery, useLazyGetComprehensivePricingQuery, useUpdateComprehensivePricingMutation } from '../../features/service/apiSlice';
import toast from 'react-hot-toast';

const BookingCharges = () => {
  const { data: flowData, isLoading, isError, error } = useGetVehicleSelectFlowQuery();
  const flow = Array.isArray(flowData) ? flowData : null;
  const [serviceKey, setServiceKey] = useState('');
  const [categoryKey, setCategoryKey] = useState('');
  const [subKey, setSubKey] = useState('');
  const [configData, setConfigData] = useState(null);
  const [form, setForm] = useState(null);
  const [fetchConfig] = useLazyGetComprehensivePricingQuery();
  const [updateConfig] = useUpdateComprehensivePricingMutation();

  

  const serviceOptions = Array.isArray(flow) ? flow.map(f => ({ key: f.key, label: f.label })) : [];
  const currentService = Array.isArray(flow) ? flow.find(f => f.key === serviceKey) : null;
  const categoryOptions = currentService
    ? (currentService.categories
        ? currentService.categories.map(c => ({ key: c.key, label: c.label }))
        : (currentService.subServices || []).map(s => ({ key: s.key, label: s.label }))
      )
    : [];
  const currentCategory = currentService && currentService.categories
    ? currentService.categories.find(c => c.key === categoryKey)
    : null;
  const subOptions = currentCategory
    ? (currentCategory.subServices || currentCategory.vehicles || []).map(x => (
        typeof x === 'string' ? { key: x, label: x } : { key: x.key, label: x.label }
      ))
    : [];

  useEffect(() => {
    setCategoryKey('');
    setSubKey('');
    }, [serviceKey]);

  useEffect(() => {
    setSubKey('');
    }, [categoryKey]);

  useEffect(() => {
    const category = serviceKey || '';
    const hasCategories = Boolean(Array.isArray(flow) && flow.find(f => f.key === serviceKey)?.categories);
    const service = hasCategories ? (categoryKey || '') : (categoryKey || '');
    const subService = hasCategories ? (subKey || '') : '';
    const params = {
      category: normalizeKey(category),
      service: normalizeKey(service),
      subService: normalizeKey(subService),
    };
    if (params.category && (params.service || !hasCategories)) {
      fetchConfig(params).unwrap()
        .then((data) => { setConfigData(data); setForm(data); })
        .catch(() => { setConfigData(null); toast.error('Failed to load configuration'); });
    } else {
      setConfigData(null);
      setForm(null);
    }
  }, [serviceKey, categoryKey, subKey, flow]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Failed to load vehicle select flow');
    }
  }, [isError, error]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#DDC104] text-lg">Loading vehicle select flow...</div>
        </div>
      );
    }
    if (isError) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400 text-lg">Error: {error?.message || 'Failed to load flow'}</div>
        </div>
      );
    }
    if (!serviceOptions.length) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#DDC104] text-lg">No flow data available</div>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm mb-1">Service</label>
          <select
            value={serviceKey}
            onChange={(e) => setServiceKey(e.target.value)}
            className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]"
          >
            <option value="" className="bg-[#013220] text-[#DDC104]">Select service</option>
            {serviceOptions.map(opt => (
              <option key={opt.key} value={opt.key} className="bg-[#013220] text-[#DDC104]">{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={categoryKey}
            onChange={(e) => setCategoryKey(e.target.value)}
            disabled={!serviceKey || !categoryOptions.length}
            className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104] disabled:opacity-50"
          >
            <option value="" className="bg-[#013220] text-[#DDC104]">{categoryOptions.length ? 'Select category' : 'N/A'}</option>
            {categoryOptions.map(opt => (
              <option key={opt.key} value={opt.key} className="bg-[#013220] text-[#DDC104]">{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Sub-Service</label>
          <select
            value={subKey}
            onChange={(e) => setSubKey(e.target.value)}
            disabled={!currentCategory || !subOptions.length}
            className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104] disabled:opacity-50"
          >
            <option value="" className="bg-[#013220] text-[#DDC104]">{subOptions.length ? 'Select sub-service' : 'N/A'}</option>
            {subOptions.map(opt => (
              <option key={opt.key} value={opt.key} className="bg-[#013220] text-[#DDC104]">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  const setPath = (path, value) => {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
        cur = cur[k];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };
  const onSave = async () => {
    try {
      const category = serviceKey || '';
      const hasCategories = Boolean(Array.isArray(flow) && flow.find(f => f.key === serviceKey)?.categories);
      const service = hasCategories ? (categoryKey || '') : (categoryKey || '');
      const subService = hasCategories ? (subKey || '') : '';
      const params = {
        category: normalizeKey(category),
        service: normalizeKey(service),
        subService: normalizeKey(subService),
      };
      let body = form || {};
      if (normalizeKey(category) === 'bike') {
        const svc = normalizeKey(service);
        const vt = {
          baseFare: body.baseFare ?? 0,
          perKmRate: body.perKmRate ?? 0,
          nightCharges: body.nightCharges || { enabled: false, startHour: 0, endHour: 0, fixedAmount: 0, multiplier: 1 },
          label: body.label || '',
          info: body.info || ''
        };
        body = {
          vehicleTypes: { [svc]: vt },
          minimumFare: body.minimumFare ?? 0
        };
      }
      await updateConfig({ ...params, body }).unwrap();
      const refreshed = await fetchConfig(params).unwrap();
      setConfigData(refreshed);
      setForm(refreshed);
      toast.success('Configuration updated');
    } catch (e) {
      toast.error(e?.data?.message || e?.message || 'Failed to update configuration');
    }
  };

  return (
    <div className="flex bg-[#013220] text-[#DDC104] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6 p-4 bg-[#013220] border border-[#DDC104] rounded-lg">
          <h1 className="text-2xl font-bold text-[#DDC104]">Vehicle Select Flow</h1>
          <p className="text-sm text-gray-400">Choose Service → Category → Sub-Service</p>
        </div>
        {renderContent()}
        {form && (
          <div className="mt-6 p-4 border border-[#DDC104] rounded-lg space-y-4">
            {normalizeKey(serviceKey) === 'carCab' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.isActive ?? form.enabled)} onChange={(e) => setPath('enabled', e.target.checked)} /> Enabled</label>
                  <div>
                    <label className="block text-sm mb-1">Base Fare</label>
                    <input type="number" value={form.baseFare ?? ''} onChange={(e) => setPath('baseFare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Per KM Rate</label>
                    <input type="number" value={form.perKmRate ?? ''} onChange={(e) => setPath('perKmRate', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Per Minute Rate</label>
                    <input type="number" step="0.01" value={form.perMinuteRate ?? ''} onChange={(e) => setPath('perMinuteRate', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Minimum Fare</label>
                    <input type="number" value={form.minimumFare ?? ''} onChange={(e) => setPath('minimumFare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">ETA Buffer (min)</label>
                    <input type="number" value={form.etaBuffer ?? ''} onChange={(e) => setPath('etaBuffer', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Label</label>
                    <input type="text" value={form.label ?? ''} onChange={(e) => setPath('label', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Info</label>
                    <input type="text" value={form.info ?? ''} onChange={(e) => setPath('info', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Seats</label>
                    <input type="number" value={form.capacity?.seats ?? ''} onChange={(e) => setPath('capacity.seats', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Bags</label>
                    <input type="number" value={form.capacity?.bags ?? ''} onChange={(e) => setPath('capacity.bags', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Features (comma-separated)</label>
                  <input type="text" value={(Array.isArray(form.features) ? form.features.join(', ') : '')} onChange={(e) => setPath('features', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.nightCharges?.enabled)} onChange={(e) => setPath('nightCharges.enabled', e.target.checked)} /> Night Charges</label>
                  <div>
                    <label className="block text-sm mb-1">Night Start Hour</label>
                    <input type="number" value={form.nightCharges?.startHour ?? ''} onChange={(e) => setPath('nightCharges.startHour', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Night End Hour</label>
                    <input type="number" value={form.nightCharges?.endHour ?? ''} onChange={(e) => setPath('nightCharges.endHour', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Night Surcharge</label>
                    <input type="number" step="0.01" value={form.nightCharges?.surcharge ?? ''} onChange={(e) => setPath('nightCharges.surcharge', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Night Fixed Amount</label>
                    <input type="number" step="0.01" value={form.nightCharges?.fixedAmount ?? ''} onChange={(e) => setPath('nightCharges.fixedAmount', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Night Multiplier</label>
                    <input type="number" step="0.01" value={form.nightCharges?.multiplier ?? ''} onChange={(e) => setPath('nightCharges.multiplier', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Waiting Free Minutes</label>
                    <input type="number" value={form.waitingCharges?.freeMinutes ?? ''} onChange={(e) => setPath('waitingCharges.freeMinutes', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Waiting Per Minute</label>
                    <input type="number" step="0.01" value={form.waitingCharges?.perMinuteCharge ?? ''} onChange={(e) => setPath('waitingCharges.perMinuteCharge', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Max Waiting Charge</label>
                    <input type="number" value={form.waitingCharges?.maxWaitingCharge ?? ''} onChange={(e) => setPath('waitingCharges.maxWaitingCharge', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Airport Pickup Fee</label>
                    <input type="number" value={form.airportServices?.pickupFee ?? ''} onChange={(e) => setPath('airportServices.pickupFee', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Airport Dropoff Fee</label>
                    <input type="number" value={form.airportServices?.dropoffFee ?? ''} onChange={(e) => setPath('airportServices.dropoffFee', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Airport Free Minutes</label>
                    <input type="number" value={form.airportServices?.waitingTime?.freeMinutes ?? ''} onChange={(e) => setPath('airportServices.waitingTime.freeMinutes', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Airport Per Minute</label>
                    <input type="number" step="0.01" value={form.airportServices?.waitingTime?.perMinuteCharge ?? ''} onChange={(e) => setPath('airportServices.waitingTime.perMinuteCharge', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Free Cancellation</label>
                    <input type="text" value={form.cancellationPolicy?.freeCancellation ?? ''} onChange={(e) => setPath('cancellationPolicy.freeCancellation', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Late Cancellation Fee</label>
                    <input type="number" value={form.cancellationPolicy?.lateCancellationFee ?? ''} onChange={(e) => setPath('cancellationPolicy.lateCancellationFee', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">No Show Fee</label>
                    <input type="number" value={form.cancellationPolicy?.noShowFee ?? ''} onChange={(e) => setPath('cancellationPolicy.noShowFee', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Toll Fees</label>
                    <input type="text" value={form.additionalCharges?.tollFees ?? ''} onChange={(e) => setPath('additionalCharges.tollFees', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Parking Fees</label>
                    <input type="text" value={form.additionalCharges?.parkingFees ?? ''} onChange={(e) => setPath('additionalCharges.parkingFees', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">State Tax</label>
                    <input type="number" value={form.additionalCharges?.stateTax ?? ''} onChange={(e) => setPath('additionalCharges.stateTax', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Service Fee</label>
                    <input type="number" value={form.additionalCharges?.serviceFee ?? ''} onChange={(e) => setPath('additionalCharges.serviceFee', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Max Distance</label>
                    <input type="number" value={form.maxDistance ?? ''} onChange={(e) => setPath('maxDistance', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Image URL</label>
                    <input type="text" value={form.imageUrl ?? ''} onChange={(e) => setPath('imageUrl', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Available Payment Methods (comma-separated)</label>
                  <input type="text" value={(Array.isArray(form.availablePaymentMethods) ? form.availablePaymentMethods.join(', ') : '')} onChange={(e) => setPath('availablePaymentMethods', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.safetyFeatures?.cctv)} onChange={(e) => setPath('safetyFeatures.cctv', e.target.checked)} /> CCTV</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.safetyFeatures?.sosButton)} onChange={(e) => setPath('safetyFeatures.sosButton', e.target.checked)} /> SOS Button</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.safetyFeatures?.shareRide)} onChange={(e) => setPath('safetyFeatures.shareRide', e.target.checked)} /> Share Ride</label>
                </div>
                <div className="flex justify-end">
                  <button onClick={onSave} className="px-4 py-2 rounded bg-[#DDC104] text-[#013220]">Save</button>
                </div>
              </>
            ) : normalizeKey(serviceKey) === 'bike' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.enabled ?? form.isActive)} onChange={(e) => setPath('enabled', e.target.checked)} /> Enabled</label>
                  <div>
                    <label className="block text-sm mb-1">Base Fare</label>
                    <input type="number" step="0.01" value={form.baseFare ?? ''} onChange={(e) => setPath('baseFare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Per KM Rate</label>
                    <input type="number" step="0.01" value={form.perKmRate ?? ''} onChange={(e) => setPath('perKmRate', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Minimum Fare</label>
                    <input type="number" step="0.01" value={form.minimumFare ?? ''} onChange={(e) => setPath('minimumFare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Label</label>
                    <input type="text" value={form.label ?? ''} onChange={(e) => setPath('label', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Info</label>
                    <input type="text" value={form.info ?? ''} onChange={(e) => setPath('info', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.nightCharges?.enabled)} onChange={(e) => setPath('nightCharges.enabled', e.target.checked)} /> Night Enabled</label>
                  <div>
                    <label className="block text-sm mb-1">Start Hour</label>
                    <input type="number" value={form.nightCharges?.startHour ?? ''} onChange={(e) => setPath('nightCharges.startHour', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">End Hour</label>
                    <input type="number" value={form.nightCharges?.endHour ?? ''} onChange={(e) => setPath('nightCharges.endHour', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Fixed Amount</label>
                    <input type="number" step="0.01" value={form.nightCharges?.fixedAmount ?? ''} onChange={(e) => setPath('nightCharges.fixedAmount', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Night Multiplier</label>
                    <input type="number" step="0.01" value={form.nightCharges?.multiplier ?? ''} onChange={(e) => setPath('nightCharges.multiplier', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={onSave} className="px-4 py-2 rounded bg-[#DDC104] text-[#013220]">Save</button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.enabled)} onChange={(e) => setPath('enabled', e.target.checked)} /> Enabled</label>
                  <div>
                    <label className="block text-sm mb-1">Convenience Fee</label>
                    <input type="number" value={form.convenienceFee ?? ''} onChange={(e) => setPath('convenienceFee', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Minimum Fare</label>
                    <input type="number" value={form.minimumFare ?? ''} onChange={(e) => setPath('minimumFare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Base Fare Amount</label>
                    <input type="number" value={form.baseFare?.amount ?? ''} onChange={(e) => setPath('baseFare.amount', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Base Coverage KM</label>
                    <input type="number" value={form.baseFare?.coverageKm ?? ''} onChange={(e) => setPath('baseFare.coverageKm', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Per KM After Base</label>
                    <input type="number" value={form.perKmRate?.afterBaseCoverage ?? ''} onChange={(e) => setPath('perKmRate.afterBaseCoverage', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.perKmRate?.cityWiseAdjustment?.enabled)} onChange={(e) => setPath('perKmRate.cityWiseAdjustment.enabled', e.target.checked)} /> City Wise Adjustment</label>
                  <div>
                    <label className="block text-sm mb-1">City Adj Above KM</label>
                    <input type="number" value={form.perKmRate?.cityWiseAdjustment?.aboveKm ?? ''} onChange={(e) => setPath('perKmRate.cityWiseAdjustment.aboveKm', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">City Adj Rate</label>
                    <input type="number" value={form.perKmRate?.cityWiseAdjustment?.adjustedRate ?? ''} onChange={(e) => setPath('perKmRate.cityWiseAdjustment.adjustedRate', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Waiting Free Minutes</label>
                    <input type="number" value={form.waitingCharges?.freeMinutes ?? ''} onChange={(e) => setPath('waitingCharges.freeMinutes', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Waiting Per Minute</label>
                    <input type="number" value={form.waitingCharges?.perMinuteRate ?? ''} onChange={(e) => setPath('waitingCharges.perMinuteRate', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Waiting Maximum</label>
                    <input type="number" value={form.waitingCharges?.maximumCharge ?? ''} onChange={(e) => setPath('waitingCharges.maximumCharge', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.waitingCharges?.driverControlPopup?.enabled)} onChange={(e) => setPath('waitingCharges.driverControlPopup.enabled', e.target.checked)} /> Driver Popup</label>
                </div>
                <div>
                  <label className="block text-sm mb-1">Driver Popup Title</label>
                  <input type="text" value={form.waitingCharges?.driverControlPopup?.popupTitle ?? ''} onChange={(e) => setPath('waitingCharges.driverControlPopup.popupTitle', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.nightCharges?.enabled)} onChange={(e) => setPath('nightCharges.enabled', e.target.checked)} /> Night Charges</label>
                  <div>
                    <label className="block text-sm mb-1">Start Hour</label>
                    <input type="number" value={form.nightCharges?.startHour ?? ''} onChange={(e) => setPath('nightCharges.startHour', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">End Hour</label>
                    <input type="number" value={form.nightCharges?.endHour ?? ''} onChange={(e) => setPath('nightCharges.endHour', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Fixed Amount</label>
                    <input type="number" value={form.nightCharges?.fixedAmount ?? ''} onChange={(e) => setPath('nightCharges.fixedAmount', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Multiplier</label>
                    <input type="number" step="0.01" value={form.nightCharges?.multiplier ?? ''} onChange={(e) => setPath('nightCharges.multiplier', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Platform Fee %</label>
                    <input type="number" step="0.01" value={form.platformFee?.percentage ?? ''} onChange={(e) => setPath('platformFee.percentage', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Driver Share</label>
                    <input type="number" step="0.01" value={form.platformFee?.driverShare ?? ''} onChange={(e) => setPath('platformFee.driverShare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Customer Share</label>
                    <input type="number" step="0.01" value={form.platformFee?.customerShare ?? ''} onChange={(e) => setPath('platformFee.customerShare', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Label</label>
                    <input type="text" value={form.label ?? ''} onChange={(e) => setPath('label', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Info</label>
                    <input type="text" value={form.info ?? ''} onChange={(e) => setPath('info', e.target.value)} className="w-full p-2 border border-[#DDC104] rounded bg-transparent text-[#DDC104]" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={onSave} className="px-4 py-2 rounded bg-[#DDC104] text-[#013220]">Save</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCharges;
  const normalizeKey = (str) => {
    if (!str) return '';
    const parts = String(str)
      .trim()
      .replace(/[^a-zA-Z0-9\s/&_()-]+/g, ' ')
      .replace(/[\/&_()-]/g, ' ') // treat separators as spaces
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return '';
    const first = parts[0].toLowerCase();
    const rest = parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
    return [first, ...rest].join('');
  };
