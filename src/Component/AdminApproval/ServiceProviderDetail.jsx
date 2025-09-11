import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav';
import { IoArrowUndoOutline } from "react-icons/io5";

const documents = [
  { type: 'Rapid Recovery Hub', status: 'Valid' },
  { type: 'Service Permit', status: 'Pending Validation' },
  { type: 'Optional Docs', status: 'Missing' },
  { type: 'Rapid Recovery Hub', status: 'Valid' },
  { type: 'Service Permit', status: 'Pending Validation' },
  { type: 'Optional Docs', status: 'Missing' },
  { type: 'Rapid Recovery Hub', status: 'Pending Validation' },
];

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

const ServiceProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <AdminApprovalNav />
 <div className="flex items-center gap-2 mb-4 m-4">
    <IoArrowUndoOutline size={25} className="text-yellow-400 text-lg" />
    <button
      onClick={() => navigate(-1)}
      className="text-yellow-400 hover:underline"
    >
      Back
    </button>
  </div>
  
        {/* Detail Box */}
        <div className="bg-gradient-to-r from-[#013321] to-[#026D46] mx-auto border border-yellow-400 rounded-md p-6 mb-6 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
            Detail View
          </h2>
         <div className="space-y-3">
  <div className="flex items-center justify-between px-12">
    <strong className="w-36">Business Name:</strong>
    <span>Rapid Recovery Hub</span>
  </div>
  <div className="flex items-center justify-between px-12">
    <strong className="w-36">Owner Name:</strong>
    <span>Usman Raza</span>
  </div>

  <div className="flex items-center justify-between px-12">
    <strong className="w-36">Status Badge:</strong>
    <div className="flex items-center justify-between px-12 gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500 " />
      <span>Pending</span>
    </div>
  </div>

  <div className="flex items-center justify-between px-12">
    <strong className="w-36">Date Submitted:</strong>
    <span>Jul 29, 2025</span>
  </div>

  <div className="flex items-center justify-between px-12">
    <strong className="w-36">Area of Operation:</strong>
    <span>Lahore – DHA</span>
  </div>

  <div className="flex items-center justify-between px-12">
    <strong className="w-36">Services Offered:</strong>
    <span>Recovery • Workshop</span>
  </div>
</div>

        </div>

        {/* Document Table */}
        <div className="mx-auto border border-yellow-400 rounded-md overflow-hidden w-full max-w-4xl">
          <div className="grid grid-cols-3 border-b border-yellow-300 py-2 px-4 font-semibold text-yellow-400 w-full">
            <span>Document Type</span>
            <span>Status</span>
            <span className='text-center'>Action</span>
          </div>
          {documents.map((doc, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center py-2 px-4">
              <span>{doc.type}</span>
              <span>{statusIndicator(doc.status)}</span>
              <span>
                {doc.status === 'Missing' ? (
                  <button className="text-xs block mx-auto bg-yellow-400 text-black px-1 py-1 rounded-md">
                    Request Upload
                  </button>
                ) : (
                  <button className="text-xs block mx-auto bg-yellow-400 text-black px-4 py-1 rounded-md">
                    View Detail
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className='flex justify-center items-center pt-10 gap-6'>
        <button className='bg-yellow-400 px-4 py-2 rounded-full text-black text-sm font-semibold'>Approve Provider</button>
        <button className='bg-yellow-400 px-4 py-2 rounded-full text-black text-sm font-semibold'>Reject Application</button>
        <button className='bg-yellow-400 px-4 py-2 rounded-full text-black text-sm font-semibold'>Request More Info</button>
      </div>
      </div>
      
    </div>
  );
};

export default ServiceProviderDetail;
