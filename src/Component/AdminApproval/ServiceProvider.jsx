import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../Home/Sidebar";
import AdminApprovalNav from "./AdminApprovalNav";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices, approveService, rejectService } from "../../features/service/serviceSlice";

const IMAGE_BASE_URL = 'http://localhost:3001';

const statusIndicator = (status) => {
  let color = "";
  switch (status) {
    case "approved":
      color = "bg-green-500";
      break;
    case "rejected":
      color = "bg-red-800";
      break;
    case "pending":
      color = "bg-yellow-600";
      break;
    default:
      color = "bg-gray-500";
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  );
};

const ServiceProvider = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleApprove = async (serviceId) => {
    try {
      await dispatch(approveService(serviceId)).unwrap();
      toast.success("Service approved successfully");
    } catch (err) {
      toast.error(err.message || "Failed to approve service");
    }
  };

  const handleReject = async (serviceId) => {
    try {
      if (!rejectionReason) {
        toast.error("Please provide a rejection reason");
        return;
      }
      await dispatch(rejectService({ serviceId, reason: rejectionReason })).unwrap();
      toast.success("Service rejected successfully");
      setRejectionReason("");
      setSelectedService(null);
    } catch (err) {
      toast.error(err.message || "Failed to reject service");
    }
  };

  // Helper function to clean file paths
  const getFileUrl = (filePath) => {
    // Remove any leading 'uploads/services/' or similar prefixes
    const cleanPath = filePath.replace(/^\/?uploads\/services\//, '');
    return `${IMAGE_BASE_URL}/${cleanPath}`;
  };

  const filteredData = selectedStatus
    ? services.filter((item) => item.status === selectedStatus)
    : services;

  if (loading) return <div className="text-yellow-400 text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error.message || "Failed to fetch services"}</div>;

  return (
    <div className="flex text-yellow-400 min-h-screen overflow-hidden bg-[#013220] font-sans">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav />
        <div className="flex justify-end items-center mb-6 gap-4 px-4">
          <div className="flex items-center gap-2">
            <span>Sort By:</span>
            <select
              className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-yellow-400"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-yellow-400 rounded-xl mx-4 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400 bg-[#038A59]">
                <th className="px-4 py-3 font-medium tracking-wide">Business Name</th>
                <th className="px-4 py-3 font-medium tracking-wide">Owner Name</th>
                <th className="px-4 py-3 font-medium tracking-wide">Area</th>
                <th className="px-4 py-3 font-medium tracking-wide">Service Offered</th>
                <th className="px-4 py-3 font-medium tracking-wide">Status</th>
                <th className="px-4 py-3 font-medium tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id} className="text-sm border-b border-[#013723] hover:bg-[#038A59]/50">
                  <td className="px-4 py-3">{item.businessCompanyName}</td>
                  <td className="px-4 py-3">{item.ownerIdentification.fullName}</td>
                  <td className="px-4 py-3">{item.serviceArea}</td>
                  <td className="px-4 py-3">{item.serviceType}</td>
                  <td className="px-4 py-3">{statusIndicator(item.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedService(item)}
                        className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full text-sm font-medium hover:bg-yellow-300 transition duration-200"
                      >
                        View
                      </button>
                      {item.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(item._id)}
                            className="bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setSelectedService(item)}
                            className="bg-red-800 text-white px-4 py-1 rounded-full text-sm hover:bg-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-yellow-400">
                    No services to approve
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto text-yellow-400 font-sans transform transition-all duration-300">
              <h2 className="text-2xl font-semibold tracking-wide mb-4">{selectedService.businessCompanyName}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium">Owner:</span> {selectedService.ownerIdentification.fullName}</p>
                  <p><span className="font-medium">Emirates ID:</span> {selectedService.ownerIdentification.emiratesId}</p>
                  <p><span className="font-medium">Trade License:</span> {selectedService.tradeLicenseNumber}</p>
                  <p><span className="font-medium">Company Type:</span> {selectedService.companyType}</p>
                  <p><span className="font-medium">Service Type:</span> {selectedService.serviceType}</p>
                  <p><span className="font-medium">Service Area:</span> {selectedService.serviceArea}</p>
                  <p><span className="font-medium">Business Phone:</span> {selectedService.businessPhoneNumber}</p>
                  <p><span className="font-medium">Contact Person:</span> {selectedService.managerOwnerReceptionName}</p>
                  <p><span className="font-medium">Contact Mobile:</span> {selectedService.contactPersonMobile}</p>
                </div>
                <div>
                  <p><span className="font-medium">Address:</span> {selectedService.businessAddress}</p>
                  <p><span className="font-medium">Opening Time:</span> {selectedService.openingTime}</p>
                  <p><span className="font-medium">Closing Time:</span> {selectedService.closingTime}</p>
                  <p><span className="font-medium">Staff Count:</span> {selectedService.numberOfStaff}</p>
                  <p><span className="font-medium">Services:</span> {selectedService.listOfServices}</p>
                  <p><span className="font-medium">Status:</span> {selectedService.status.charAt(0).toUpperCase() + selectedService.status.slice(1)}</p>
                  {selectedService.rejectionReason && (
                    <p><span className="font-medium">Rejection Reason:</span> {selectedService.rejectionReason}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold tracking-wide">Documents</h3>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {selectedService.tradeLicenseCopy && (
                    <p>
                      <a
                        href={getFileUrl(selectedService.tradeLicenseCopy)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        Trade License
                      </a>
                    </p>
                  )}
                  {selectedService.shopImages?.map((img, index) => (
                    <p key={index}>
                      <a
                        href={getFileUrl(img)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        Shop Image {index + 1}
                      </a>
                    </p>
                  ))}
                  {selectedService.passportCopy?.map((img, index) => (
                    <p key={index}>
                      <a
                        href={getFileUrl(img)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        Passport Copy {index + 1}
                      </a>
                    </p>
                  ))}
                  {selectedService.uploadedPriceList && (
                    <p>
                      <a
                        href={getFileUrl(selectedService.uploadedPriceList)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        Price List
                      </a>
                    </p>
                  )}
                  {selectedService.uploadedPortfolio && (
                    <p>
                      <a
                        href={getFileUrl(selectedService.uploadedPortfolio)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        Portfolio
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {selectedService.status === "pending" && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 bg-[#013A2A] border border-yellow-400 text-yellow-400 rounded"
                    placeholder="Enter rejection reason (if rejecting)"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setRejectionReason("");
                  }}
                  className="bg-yellow-400 text-[#013220] px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition duration-200"
                  autoFocus
                >
                  Close
                </button>
                {selectedService.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedService._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedService._id)}
                      className="bg-red-800 text-white px-4 py-2 rounded-full text-sm hover:bg-red-900"
                      disabled={!rejectionReason}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProvider;