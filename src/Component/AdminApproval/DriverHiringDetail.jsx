import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowUndoOutline } from 'react-icons/io5';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav';
import {
  fetchDriverHiringById,
  approveHiring,
  rejectHiring,
  updateTerms,
  addNote,
  resetStatus,
} from '../../features/driverHiring/driverHiringSlice';

const statusIndicator = (status) => {
  let color = '';
  switch (status) {
    case 'Valid':
      color = 'bg-green-500';
      break;
    case 'Pending Validation':
      color = 'bg-red-500';
      break;
    case 'Missing':
      color = 'bg-yellow-400';
      break;
    default:
      color = 'bg-gray-500';
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span>{status}</span>
    </div>
  );
};

const DriverHiringDetail = () => {
  const navigate = useNavigate();
  const { driverHiringId } = useParams();
  const dispatch = useDispatch();
  const { currentHiring, loading, error, success } = useSelector((state) => state.driverHiring);
  const token = localStorage.getItem('token');

  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState('');
  const [termsModal, setTermsModal] = useState(false);
  const [newTerms, setNewTerms] = useState('');
  const [noteModal, setNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    if (driverHiringId) {
      console.log('Fetching driver hiring details for ID:', driverHiringId);
      dispatch(fetchDriverHiringById({ driverHiringId, token }));
    }
  }, [dispatch, driverHiringId, token]);

  useEffect(() => {
    if (success || error) {
      console.log('Status update:', { success, error });
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleApprove = () => {
    if (!token || !driverHiringId) {
      console.error('Missing token or driverHiringId:', { token, driverHiringId });
      alert('Authentication or hiring ID missing');
      return;
    }
    console.log('Approving hiring:', driverHiringId);
    dispatch(approveHiring({ driverHiringId, token }))
      .unwrap()
      .then(() => console.log('Approve successful'))
      .catch((err) => console.error('Approve failed:', err));
  };

  const handleReject = () => {
    if (!reason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    if (!token || !driverHiringId) {
      console.error('Missing token or driverHiringId:', { token, driverHiringId });
      alert('Authentication or hiring ID missing');
      return;
    }
    console.log('Rejecting hiring:', driverHiringId, 'Reason:', reason);
    dispatch(rejectHiring({ driverHiringId, reason, token }))
      .unwrap()
      .then(() => {
        console.log('Reject successful');
        setReason('');
        setRejectId(null);
      })
      .catch((err) => console.error('Reject failed:', err));
  };

  const handleUpdateTerms = () => {
    if (!newTerms.trim()) {
      alert('Please provide new terms');
      return;
    }
    if (!token || !driverHiringId) {
      console.error('Missing token or driverHiringId:', { token, driverHiringId });
      alert('Authentication or hiring ID missing');
      return;
    }
    console.log('Updating terms for hiring:', driverHiringId, 'Terms:', newTerms);
    dispatch(updateTerms({ driverHiringId, terms: newTerms, token }))
      .unwrap()
      .then(() => {
        console.log('Update terms successful');
        setNewTerms('');
        setTermsModal(false);
      })
      .catch((err) => console.error('Update terms failed:', err));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      alert('Please provide a note');
      return;
    }
    if (!token || !driverHiringId) {
      console.error('Missing token or driverHiringId:', { token, driverHiringId });
      alert('Authentication or hiring ID missing');
      return;
    }
    console.log('Adding note for hiring:', driverHiringId, 'Note:', newNote);
    dispatch(addNote({ driverHiringId, note: newNote, token }))
      .unwrap()
      .then(() => {
        console.log('Add note successful');
        setNewNote('');
        setNoteModal(false);
      })
      .catch((err) => console.error('Add note failed:', err));
  };

  if (loading && !currentHiring) return <p className="text-blue-500 text-center">Loading...</p>;
  if (error && !currentHiring) return <p className="text-red-500 text-center">{error}</p>;
  if (!currentHiring) return <p className="text-yellow-400 text-center">No data available</p>;

  return (
    <div className="flex min-h-screen text-yellow-400">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <AdminApprovalNav />

        {/* Status Messages */}
        {loading && <p className="text-blue-500 mx-2">Loading...</p>}
        {error && <p className="text-red-500 mx-2">{error}</p>}
        {success && <p className="text-green-500 mx-2">{success}</p>}

        {/* Back Button */}
        <div className="flex items-center gap-2 mb-4 m-4">
          <IoArrowUndoOutline size={25} className="text-yellow-400" />
          <button
            onClick={() => navigate(-1)}
            className="text-yellow-400 hover:underline"
          >
            Back
          </button>
        </div>

        {/* Agreement Summary */}
        <h2 className="text-xl font-semibold text-center mb-4">Agreement Summary:</h2>
        <div className="flex justify-center items-center mb-6">
          <div className="max-w-2xl w-full border border-yellow-300 rounded-md overflow-hidden">
            <table className="w-full table-fixed border border-yellow-300 text-left">
              <thead>
                <tr className="text-yellow-500 text-center">
                  <th className="border-r border-yellow-300 px-4 py-2 w-1/2">Field</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Driver Name</td>
                  <td className="px-4 py-2">{currentHiring.userId?.firstName || 'N/A'}</td>
                </tr>
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Owner Name</td>
                  <td className="px-4 py-2">{currentHiring.vehicleOwnerName || 'N/A'}</td>
                </tr>
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Engagement Type</td>
                  <td className="px-4 py-2">{currentHiring.engagementType || 'N/A'}</td>
                </tr>
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Terms</td>
                  <td className="px-4 py-2">
                    {currentHiring.engagementType === 'Salary Based'
                      ? `Salary: PKR ${currentHiring.salaryOffered || 'N/A'}`
                      : currentHiring.terms || 'N/A'}
                  </td>
                </tr>
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Start Date</td>
                  <td className="px-4 py-2">
                    {currentHiring.startDate
                      ? new Date(currentHiring.startDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Proposed Duration</td>
                  <td className="px-4 py-2">{currentHiring.proposedDuration || 'N/A'}</td>
                </tr>
                <tr className="border-t border-yellow-300">
                  <td className="border-r border-yellow-300 px-4 py-2">Assigned Vehicle</td>
                  <td className="px-4 py-2">{currentHiring.assignedVehicle || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Table */}
        <div className="mx-auto border border-yellow-400 rounded-md overflow-hidden w-full max-w-4xl mb-8">
          <div className="grid grid-cols-3 border-b border-yellow-300 py-2 px-4 font-semibold text-yellow-400">
            <span className="pr-2">Document Type</span>
            <span className="px-2">Status</span>
            <span className="text-center pl-2">Action</span>
          </div>
          {(currentHiring.documents || []).map((doc, index) => (
            <div key={index} className="grid grid-cols-3 items-center py-2 px-4">
              <span className="pr-2">{doc.type || 'N/A'}</span>
              <span className="px-2">{statusIndicator(doc.status)}</span>
              <span className="pl-2">
                {doc.status === 'Missing' ? (
                  <button
                    className="text-xs block mx-auto bg-yellow-400 text-black px-2 py-1 rounded-md"
                    onClick={() => console.log('Request upload for:', doc.type)}
                  >
                    Request Upload
                  </button>
                ) : (
                  <button
                    className="text-xs block mx-auto bg-yellow-400 text-black px-4 py-1 rounded-md"
                    onClick={() => console.log('View details for:', doc.type)}
                  >
                    View Detail
                  </button>
                )}
              </span>
            </div>
          ))}
          {(!currentHiring.documents || currentHiring.documents.length === 0) && (
            <div className="text-center py-4 text-yellow-400">No documents available</div>
          )}
        </div>

        {/* Action Buttons */}
        {currentHiring.approvalStatus === 'Pending' ? (
          <div className="flex justify-center items-center pt-10 gap-6">
            <button
              onClick={handleApprove}
              className="bg-yellow-400 px-8 py-2 rounded-full text-[#013220] text-sm font-semibold hover:bg-yellow-300"
              disabled={loading}
            >
              Approve
            </button>
            <button
              onClick={() => setRejectId(driverHiringId)}
              className="bg-yellow-400 px-12 py-2 rounded-full text-[#013220] text-sm font-semibold hover:bg-yellow-300"
              disabled={loading}
            >
              Reject
            </button>
            <button
              onClick={() => setTermsModal(true)}
              className="bg-yellow-400 px-6 py-2 rounded-full text-[#013220] text-sm font-semibold hover:bg-yellow-300"
              disabled={loading}
            >
              Modify Terms
            </button>
            <button
              onClick={() => setNoteModal(true)}
              className="bg-yellow-400 px-4 py-2 rounded-full text-[#013220] text-sm font-semibold hover:bg-yellow-300"
              disabled={loading}
            >
              Add Internal Note
            </button>
          </div>
        ) : (
          <p className="text-center text-yellow-400">This hiring is {currentHiring.approvalStatus}. No further actions are available.</p>
        )}

        {/* Rejection Modal */}
        {rejectId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl text-yellow-400 mb-4">Reject Driver Hiring</h2>
              <textarea
                className="w-full bg-transparent border border-yellow-400 text-yellow-400 p-2 rounded mb-4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for rejection"
                rows="4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    console.log('Cancel reject modal');
                    setReason('');
                    setRejectId(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-800 text-white px-4 py-1 rounded-full hover:bg-red-900"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modify Terms Modal */}
        {termsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl text-yellow-400 mb-4">Modify Terms</h2>
              <textarea
                className="w-full bg-transparent border border-yellow-400 text-yellow-400 p-2 rounded mb-4"
                value={newTerms}
                onChange={(e) => setNewTerms(e.target.value)}
                placeholder="Enter new terms"
                rows="4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    console.log('Cancel terms modal');
                    setNewTerms('');
                    setTermsModal(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTerms}
                  className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full hover:bg-yellow-300"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Internal Note Modal */}
        {noteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl text-yellow-400 mb-4">Add Internal Note</h2>
              <textarea
                className="w-full bg-transparent border border-yellow-400 text-yellow-400 p-2 rounded mb-4"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter internal note"
                rows="4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    console.log('Cancel note modal');
                    setNewNote('');
                    setNoteModal(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full hover:bg-yellow-300"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverHiringDetail;