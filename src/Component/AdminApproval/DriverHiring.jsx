import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import Sidebar from "../Home/Sidebar";
import AdminApprovalNav from "./AdminApprovalNav";
import {
  fetchPendingDriverHirings,
  approveHiring,
  rejectHiring,
  resetStatus,
} from "../../features/driverHiring/driverHiringSlice";

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
      color = "bg-yellow-500";
      break;
    case "Under-review":
      color = "bg-blue-800";
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

const DriverHiring = () => {
  const dispatch = useDispatch();
  const { pendingHirings, totalPending, loading, error, success } = useSelector(
    (state) => state.driverHiring
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchPendingDriverHirings(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleApprove = (driverHiringId) => {
    dispatch(approveHiring({ driverHiringId, token }));
  };

  const handleReject = (driverHiringId) => {
    if (reason.trim()) {
      dispatch(rejectHiring({ driverHiringId, reason, token }));
      setReason("");
      setRejectId(null);
    } else {
      toast.error("Please provide a reason for rejection");
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const filteredData = selectedStatus
    ? pendingHirings.filter((item) => item.approvalStatus === selectedStatus)
    : pendingHirings;

  return (
    <div className="flex text-yellow-400 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav />

        {/* Header */}
        <div className="flex justify-end items-center mb-6 gap-4 mx-2">
          <div className="flex items-center gap-2">
            <span>Sort By:</span>
            <select
              className="bg-transparent focus:outline-none text-yellow-400 border border-yellow-400 rounded px-2 py-1"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="Under-review">Under-review</option>
            </select>
          </div>
        </div>

        {/* Status Messages */}
        {loading && <p className="text-blue-500 mx-2">Loading...</p>}
        {error && <p className="text-red-500 mx-2">{error}</p>}
        {success && <p className="text-green-500 mx-2">{success}</p>}

        {/* Scrollable Table */}
        <div className="mx-2 mt-6 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto border border-yellow-400 rounded-xl scrollbar-hide">
          <table className="w-full text-left min-w-[800px]">
            <thead className="sticky top-0 bg-gray-800">
              <tr className="border-b border-yellow-400">
                <th className="px-4 py-3 w-[150px]">Driver Name</th>
                <th className="px-4 py-3 w-[150px]">Owner Name</th>
                <th className="px-4 py-3 w-[150px]">Engagement</th>
                <th className="px-4 py-3 w-[150px]">Terms</th>
                <th className="px-4 py-3 w-[120px]">Submitted On</th>
                <th className="px-4 py-3 w-[100px]">Status</th>
                <th className="px-4 py-3 w-[250px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="text-sm">
                    <td className="px-4 py-3">
                      {item.userId?.firstName} {item.userId?.lastName || ""}
                    </td>
                    <td className="px-4 py-3">{item.vehicleOwnerName}</td>
                    <td className="px-4 py-3">{item.engagementType}</td>
                    <td className="px-4 py-3">
                      {item.engagementType === "Salary Based"
                        ? `PKR ${item.salaryOffered}`
                        : item.engagementType}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{statusIndicator(item.approvalStatus)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRow(item._id)}
                          className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full text-sm hover:bg-yellow-300"
                        >
                          {expandedRow === item._id ? "Hide Details" : "Show Details"}
                        </button>
                        {item.approvalStatus === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setRejectId(item._id)}
                              className="bg-red-800 text-white px-4 py-1 rounded-full text-sm hover:bg-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedRow === item._id && (
                    <tr className="bg-gray-800">
                      <td colSpan="7" className="px-4 py-4">
                        <div className="max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">User Information</h3>
                              <p><strong>Username:</strong> {item.userId?.username}</p>
                              <p><strong>Email:</strong> {item.userId?.email}</p>
                              <p><strong>Phone:</strong> {item.userId?.phoneNumber}</p>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Vehicle Information</h3>
                              <p><strong>Vehicle Type:</strong> {item.vehicleType}</p>
                              <p><strong>Plate Number:</strong> {item.vehiclePlateNumber}</p>
                              <p><strong>Make & Model:</strong> {item.vehicleMakeModel}</p>
                              <p><strong>Company Name:</strong> {item.companyName || "N/A"}</p>
                              <p><strong>Company Emirate:</strong> {item.companyEmirate || "N/A"}</p>
                              <p><strong>Registration Card:</strong></p>
                              <div className="flex gap-4">
                                <a
                                  href={`http://localhost:3001/${item.registrationCard.front}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-yellow-400 hover:underline"
                                >
                                  Front
                                </a>
                                <a
                                  href={`http://localhost:3001/${item.registrationCard.back}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-yellow-400 hover:underline"
                                >
                                  Back
                                </a>
                              </div>
                              <p><strong>Vehicle Images:</strong></p>
                              <div className="flex gap-4 flex-wrap">
                                {item.vehicleImages.map((img, index) => (
                                  <a
                                    key={index}
                                    href={`http://localhost:3001/${img}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 hover:underline"
                                  >
                                    Image {index + 1}
                                  </a>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Hiring Details</h3>
                              <p><strong>Driver Can Offer Counter Rent:</strong> {item.driverCanOfferCounterRent ? "Yes" : "No"}</p>
                              <p><strong>Agreement Duration:</strong> {item.agreementDuration}</p>
                              {item.customDurationAmount && (
                                <p><strong>Custom Duration:</strong> {item.customDurationAmount} months</p>
                              )}
                              <p><strong>Work Schedule:</strong> {item.workSchedule}</p>
                              <p><strong>Shift Timing:</strong> {item.shiftTimingOrDutyHours}</p>
                              <p><strong>Preferred Start Date:</strong> {new Date(item.preferredStartDate).toLocaleDateString()}</p>
                              <p><strong>Information Confirmed:</strong> {item.informationConfirmed ? "Yes" : "No"}</p>
                              <p><strong>Auto-Generated Agreement:</strong> {item.autoGeneratedAgreement ? "Yes" : "No"}</p>
                              <p><strong>Mutual Approval:</strong> {item.mutualApproval ? "Yes" : "No"}</p>
                              <p><strong>Terms Agreed:</strong> {item.termsAgreed ? "Yes" : "No"}</p>
                              <p><strong>Digital Signature:</strong> {item.digitalSignature}</p>
                              <p><strong>Admin Comments:</strong> {item.adminComments || "None"}</p>
                              <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                              <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleDateString()}</p>
                              <p><strong>Total Applications:</strong> {item.driverApplications.length}</p>
                              {item.selectedDriverId && (
                                <p><strong>Selected Driver ID:</strong> {item.selectedDriverId}</p>
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Maintenance Responsibilities</h3>
                              <p><strong>Minor Maintenance:</strong></p>
                              <ul className="list-disc pl-5">
                                <li>
                                  Daily Fuel: Owner: {item.maintenanceResponsibilities.minor.dailyFuel.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.minor.dailyFuel.driver ? "Yes" : "No"}
                                </li>
                                <li>
                                  Car Wash: Owner: {item.maintenanceResponsibilities.minor.carWash.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.minor.carWash.driver ? "Yes" : "No"}
                                </li>
                                <li>
                                  Oil Change: Owner: {item.maintenanceResponsibilities.minor.oilChange.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.minor.oilChange.driver ? "Yes" : "No"}
                                </li>
                                <li>
                                  Tyre Pressure Check: Owner: {item.maintenanceResponsibilities.minor.tyrePressureCheck.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.minor.tyrePressureCheck.driver ? "Yes" : "No"}
                                </li>
                              </ul>
                              <p><strong>Major Maintenance:</strong></p>
                              <ul className="list-disc pl-5">
                                <li>
                                  Engine Repairs: Owner: {item.maintenanceResponsibilities.major.engineRepairs.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.major.engineRepairs.driver ? "Yes" : "No"}
                                </li>
                                <li>
                                  Transmission System: Owner: {item.maintenanceResponsibilities.major.transmissionSystem.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.major.transmissionSystem.driver ? "Yes" : "No"}
                                </li>
                                <li>
                                  AC System: Owner: {item.maintenanceResponsibilities.major.acSystem.owner ? "Yes" : "No"}, Driver: {item.maintenanceResponsibilities.major.acSystem.driver ? "Yes" : "No"}
                                </li>
                              </ul>
                              {item.maintenanceResponsibilities.custom.length > 0 && (
                                <>
                                  <p><strong>Custom Maintenance:</strong></p>
                                  <ul className="list-disc pl-5">
                                    {item.maintenanceResponsibilities.custom.map((custom, index) => (
                                      <li key={index}>
                                        {custom.name}: Owner: {custom.owner ? "Yes" : "No"}, Driver: {custom.driver ? "Yes" : "No"}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-yellow-400">
                    No matching data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
                  onClick={() => setRejectId(null)}
                  className="bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(rejectId)}
                  className="bg-red-800 text-white px-4 py-1 rounded-full hover:bg-red-900"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom CSS for Hiding Scrollbars */}
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;  /* Internet Explorer 10+ */
              scrollbar-width: none;  /* Firefox */
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default DriverHiring;