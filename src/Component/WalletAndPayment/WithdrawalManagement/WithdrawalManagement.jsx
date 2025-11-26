import React, { useEffect, useState } from 'react'
import Sidebar from '../../Home/Sidebar'
import WalletPaymentNavbar from '../WalletPaymentNavbar'
import { FaCheck } from "react-icons/fa6";
import { FaPause } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import WithdrawalSettings from './WithdrawalSettings';
import axiosInstance from '../../../services/axiosConfig';
import toast from 'react-hot-toast';

const WithdrawalManagement = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/wallet/admin/withdrawals', { params: { status: 'pending', page, limit: 20, includePaused: true } });
      const d = res.data?.data || res.data;
      setWithdrawals(d?.withdrawals || []);
      setPages(d?.pages || d?.pagination?.pages || 1);
    } catch (e) {
      setWithdrawals([]);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWithdrawals(); }, [page]);

  const act = async (userId, requestId, action) => {
    try {
      const url = `/wallet/admin/withdrawal/${userId}/${requestId}/${action}`;
      const res = await axiosInstance.put(url);
      if (res.data?.success) {
        toast.success(res.data?.message || `Withdrawal ${action}`);
        fetchWithdrawals();
      } else {
        toast.error(res.data?.message || 'Action failed');
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />
        <div className='w-[95%] mx-auto py-12 '>
          <h2 className='py-4'>Paginated Table View</h2>
  <div className="w-full max-w-7xl border border-yellow-400 rounded-xl overflow-hidden">
    <table className="w-full max-w-5xl  text-sm text-yellow-300">
      <thead className="border-b border-yellow-400">
        <tr>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">User Name</th>
          <th className="text-left px-4 py-3">KYC</th>
          <th className="text-left px-4 py-3">Amount</th>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">Account Type</th>
          <th className="text-center px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="bg-transparent">
       {(loading ? [] : withdrawals).map((w) => (
        <tr key={w.requestId} className=" ">
          <td className="px-4 py-3">{new Date(w.date).toLocaleString()}</td>
          <td className="px-4 py-3">{w.userName || w.username}</td>
          <td className="px-4 py-3">{w.kyc ? <FaCheck size={20}/> : <RxCross2 size={20}/>}</td>
          <td className="px-4 py-3">AED {Number(w.amount || 0).toLocaleString()}</td>
          <td className="px-4 py-3">{new Date(w.date).toLocaleDateString()}</td>
          <td className="px-4 py-3">{String(w.accountType || '').replace('_', ' ')}</td>
          <td className="px-4 py-3">
            <div className='flex gap-2 justify-center'>
              <button className='rounded-full p-1 border border-yellow-300' onClick={() => act(w.userId, w.requestId, 'approve')}><FaCheck size={20}/></button> 
              <button className='rounded-full p-1 border border-yellow-300' onClick={() => act(w.userId, w.requestId, 'reject')}><RxCross2 size={20}/></button> 
              {w.status === 'paused' ? (
                <button className='rounded-full p-1 border border-yellow-300' onClick={() => act(w.userId, w.requestId, 'resume')}>Resume</button>
              ) : (
                <button className='rounded-full p-1 border border-yellow-300' onClick={() => act(w.userId, w.requestId, 'pause')}><FaPause size={20}/></button>
              )}
            </div>
          </td>
        </tr>
       ))}
       {(!loading && withdrawals.length === 0) && (
        <tr><td className="px-4 py-6 text-center" colSpan={7}>No pending withdrawals</td></tr>
       )}
      </tbody>
    </table>
  </div>
  <div className='flex justify-center items-center gap-3 py-3'>
    <button onClick={() => setPage(p => Math.max(p - 1, 1))} className='px-3 py-1 rounded-full border border-yellow-400' disabled={page === 1}>Prev</button>
    <span>{page}/{pages}</span>
    <button onClick={() => setPage(p => Math.min(p + 1, pages))} className='px-3 py-1 rounded-full border border-yellow-400' disabled={page === pages}>Next</button>
  </div>
  <WithdrawalSettings/>
</div>
</div>
    </div>
  )
}

export default WithdrawalManagement
