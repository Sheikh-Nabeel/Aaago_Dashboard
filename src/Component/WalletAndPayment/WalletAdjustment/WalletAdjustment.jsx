import React, { useState } from 'react';
import Sidebar from '../../Home/Sidebar';
import WalletPaymentNavbar from '../WalletPaymentNavbar';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import WalletAdjustmentTable from './WalletAdjustmentTable';
import axiosInstance from '../../../services/axiosConfig';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';

const WalletAdjustment = () => {
  const [amount, setAmount] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('Bonus');
  const [reason, setReason] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('customer');
  const [q, setQ] = useState('');
  const [targets, setTargets] = useState([]);
  const [tPage, setTPage] = useState(1);
  const [tPages, setTPages] = useState(1);
  const [tLoading, setTLoading] = useState(false);

  const increment = () => setAmount((prev) => {
    const n = Number(prev || 0);
    return String(n + 1);
  });
  const decrement = () => setAmount((prev) => {
    const n = Number(prev || 0);
    return String(Math.max(n - 1, 0));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = Number(amount);
    if (!userId || !userId.trim()) {
      toast.error('Select a user/driver');
      return;
    }
    if (isNaN(a) || a <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    if (!reason || !reason.trim()) {
      toast.error('Enter a reason');
      return;
    }
    try {
      const body = {
        userId: userId.trim(),
        amount: a,
        adjustmentType,
        reason: reason.trim(),
      };
      const res = await axiosInstance.post('/wallet/admin/adjust', body);
      if (res.data?.success) {
        toast.success(res.data?.message || 'Wallet adjusted');
        setAmount('');
        setReason('');
      } else {
        toast.error(res.data?.message || 'Adjustment failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const fetchTargets = async () => {
    setTLoading(true);
    try {
      const res = await axiosInstance.get('/wallet/admin/adjustments/targets', { params: { role, q, page: tPage, limit: 20 } });
      const d = res.data?.data || res.data;
      setTargets(d?.targets || []);
      setTPages(d?.pagination?.pages || 1);
    } catch (err) {
      setTargets([]);
      setTPages(1);
    } finally {
      setTLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTargets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, tPage]);

  const onSearch = (e) => {
    e?.preventDefault?.();
    setTPage(1);
    fetchTargets();
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />
        <div className="flex-1 overflow-y-auto text-yellow-400 px-8 py-6 space-y-6">
          {/* Input Fields Section */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Amount Input */}
            <div className="col-span-2 flex items-center gap-4">
              <input
                type="text"
                placeholder="Amount Input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 rounded-full placeholder:text-yellow-300 border border-yellow-400 bg-transparent px-4 py-2 focus:outline-none"
              />
              <FiMinusCircle size={32} className="text-yellow-400 cursor-pointer" onClick={decrement} />
              <FiPlusCircle size={32} className="text-yellow-400 cursor-pointer" onClick={increment} />
            </div>

            {/* Adjustment Type */}
           <div className="w-full border border-yellow-400 rounded-full overflow-hidden">
  <select className="w-full block bg-transparent px-4 py-2 focus:outline-none appearance-none text-yellow-300"
    value={adjustmentType}
    onChange={(e) => setAdjustmentType(e.target.value)}
  >
    <option className="bg-yellow-400 text-black" value="Bonus">Bonus</option>
    <option className="bg-yellow-400 text-black" value="Penalty">Penalty</option>
    <option className="bg-yellow-400 text-black" value="Refund">Refund</option>
  </select>
</div>
            {/* Type Reason */}
            <textarea
              placeholder="Type Reason Here...."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-32 rounded-lg placeholder:text-yellow-300 border border-yellow-400 bg-transparent px-4 py-2 focus:outline-none col-span-2"
            />          
            {/* User / Driver Select (ID input) */}
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Select User/Driver"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full rounded-full placeholder:text-yellow-300 border border-yellow-400 bg-transparent px-4 py-2 focus:outline-none"
              />
              <div className="mt-3 flex items-center gap-2">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-transparent border border-yellow-400 rounded-full px-3 py-1 focus:outline-none">
                  <option value="customer" className="bg-yellow-400 text-black">User</option>
                  <option value="driver" className="bg-yellow-400 text-black">Driver</option>
                </select>
                <form onSubmit={onSearch} className="flex items-center gap-2">
                  <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search username/name" className="bg-transparent border border-yellow-400 rounded-full px-3 py-1 focus:outline-none" />
                  <button type="submit" className="rounded-full border border-yellow-400 px-3 py-1"><FiSearch className="text-yellow-300" /></button>
                </form>
              </div>
              <div className="mt-3 border border-yellow-400 rounded-lg max-h-40 overflow-y-auto">
                {tLoading ? (
                  <div className="px-3 py-2 text-sm">Loading...</div>
                ) : targets.length === 0 ? (
                  <div className="px-3 py-2 text-sm">No targets found</div>
                ) : (
                  targets.map(t => (
                    <button key={t.id} type="button" onClick={() => setUserId(t.id)} className="w-full text-left px-3 py-2 hover:bg-[#014b38]">
                      <div className="text-sm font-semibold">{t.name} <span className="text-xs">({t.username})</span></div>
                      <div className="text-xs">Role: {t.role} • Wallet: AED {Number(t.walletBalance || 0).toLocaleString()}</div>
                    </button>
                  ))
                )}
                {tPages > 1 && (
                  <div className="flex justify-center gap-2 px-3 py-2">
                    <button type="button" onClick={() => setTPage(p => Math.max(p - 1, 1))} className="text-xs hover:underline" disabled={tPage === 1}>Prev</button>
                    <span className="text-xs">{tPage}/{tPages}</span>
                    <button type="button" onClick={() => setTPage(p => Math.min(p + 1, tPages))} className="text-xs hover:underline" disabled={tPage === tPages}>Next</button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="px-6 py-2 rounded-full bg-yellow-400 text-black font-semibold">Apply Adjustment</button>
            </div>
            
          </form>         
        </div>
         <WalletAdjustmentTable/>
      </div>     
    </div>
  );
};

export default WalletAdjustment;
