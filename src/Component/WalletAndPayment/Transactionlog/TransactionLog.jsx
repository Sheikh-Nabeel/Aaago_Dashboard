import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Sidebar from '../../Home/Sidebar';
import WalletPaymentNavbar from '../WalletPaymentNavbar';
import axiosInstance from '../../../services/axiosConfig';

const formatAED = (n) => `AED ${Number(n || 0).toLocaleString()}`;

const TransactionLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [pages, setPages] = useState(1);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = {
        minAmount: minAmount === '' ? undefined : Number(minAmount),
        maxAmount: maxAmount === '' ? undefined : Number(maxAmount),
        startDate: date || undefined,
        endDate: date || undefined,
        page: currentPage,
        limit: 20,
      };
      const res = await axiosInstance.get('/wallet/admin/transactions', { params });
      const d = res.data?.data || res.data;
      setTransactions(d?.transactions || []);
      setPages(d?.pages || d?.pagination?.pages || 1);
    } catch (e) {
      setTransactions([]);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, [currentPage]);
  const onSearch = (e) => { e?.preventDefault?.(); setCurrentPage(1); fetchTransactions(); };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />

        <div className="min-h-screen px-8 py-10 font-sans">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Filters and Search */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <p className="font-semibold text-lg">Main Table Layout:</p>

              <div className="flex gap-4 items-center flex-wrap">
                {/* Amount Range */}
                <label className="flex items-center gap-2">
                  <span className="text-sm font-medium">Amount Range</span>
                  <input
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="w-20 px-2 border bg-transparent border-yellow-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </label>

                {/* To */}
                <label className="flex items-center gap-2">
                  <span className="text-sm font-medium">To</span>
                  <input
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="w-20 px-2 bg-transparent border border-yellow-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </label>

                {/* Date */}
                <label className="flex items-center gap-2">
                  <span className="text-sm font-medium">Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-2 bg-transparent border border-yellow-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </label>
                <button onClick={onSearch} className="rounded-full border border-yellow-400 px-3 py-1"><FiSearch /></button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded border border-yellow-400">
              <table className="min-w-full text-left">
                <thead className="">
                  <tr>
                    <th className="py-2 px-4 border-b border-yellow-400">Type</th>
                    <th className="py-2 px-4 border-b border-yellow-400">User ID</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Amount</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Timestamp</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Notes</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Tags</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(loading ? [] : transactions).map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-yellow-400">{item.type}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{item.userId}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{formatAED(item.amount)}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{new Date(item.timestamp).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b border-yellow-400 whitespace-pre-line">{item.description || item.adminNote || ''}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{Array.isArray(item.tags) ? item.tags.join(', ') : ''}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">
                        <button className="bg-yellow-300 px-6 py-1 rounded-full text.black hover:bg-yellow-200">
                          Note
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!loading && transactions.length === 0) && (
                    <tr><td className="py-4 px-4 text-center" colSpan={7}>No transactions</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 gap-2 text-yellow-300">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="hover:underline disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: pages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-full border border-yellow-400 text-center text-sm font-semibold ${
                    currentPage === index + 1 ? 'bg-yellow-400 text-black' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages))}
                className="hover:underline disabled:opacity-50"
                disabled={currentPage === pages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionLog;
