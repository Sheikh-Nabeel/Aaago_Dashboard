import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosConfig';

const WalletAdjustmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/wallet/admin/adjustments/logs', { params: { page: currentPage, limit: 20 } });
        const d = res.data?.data || res.data;
        setLogs(d?.logs || []);
        setPages(d?.pages || 1);
      } catch (e) {
        setLogs([]);
        setPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [currentPage]);

  return (
    <div className="min-h-screen px-8 py-10  text-yellow-300 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Table */}
        <div className="overflow-x-auto">
          <p className="mb-2 font-semibold">Paginated Table View:</p>
          <table className="min-w-full text-left border border-yellow-400">
            <thead className=" text-yellow-300">
              <tr>
                <th className="py-2 px-4 border-b border-yellow-400">Date</th>
                <th className="py-2 px-4 border-b border-yellow-400">User Name</th>
                <th className="py-2 px-4 border-b border-yellow-400">Type</th>
                <th className="py-2 px-4 border-b border-yellow-400">Amount</th>
                <th className="py-2 px-4 border-b border-yellow-400">Reason</th>
                <th className="py-2 px-4 border-b border-yellow-400">Admin</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? [] : logs).map((item, index) => (
                <tr key={index} className="">
                  <td className="py-2 px-4 border-b border-yellow-400">{new Date(item.date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.userName || item.username}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.type}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">AED {Number(item.amount || 0).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.reason}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.adminName || item.adminEmail}</td>
                </tr>
              ))}
              {(!loading && logs.length === 0) && (
                <tr>
                  <td className="py-4 px-4 text-center" colSpan={6}>No adjustments found</td>
                </tr>
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
  );
};

export default WalletAdjustmentTable;
