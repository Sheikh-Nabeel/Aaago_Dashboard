import React from "react";

const sampleData = [
  {
    editedby: "Admin Rehan",
    fieldchanged: "Phone Number",
    useraffected: "Driver: Sohail",
    timestamp: "Aug 3, 10:14 AM",
    notes: "Verified via call",
    audit: "Locked",
  },
  {
    editedby: "Admin Rehan",
    fieldchanged: "KYC Status",
    useraffected: "Provider: AutoPro",
    timestamp: "Aug 3, 10:14 AM",
    notes: "Uploaded missing\ndocument",
    audit: "Pending",
  },
  // Repeat or map more items if needed
];

const ManualEditsLog = () => {
  return (
    <>
      {/* Filters */}
      <div className="flex justify-end items-center my-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span>Date Range :</span>
          <input
            type="date"
            value=""
            readOnly
            className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
          />
          <span>To</span>
          <input
            type="date"
            value=""
            readOnly
            className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
          />
        </div>

        <div>
          <span>
            Admin:
            <select className="bg-transparent focus:outline-none ml-1">
              <option value="">Admin Rehan</option>
              <option value=""></option>
            </select>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>User Role:</span>
          <select className="bg-transparent focus:outline-none">
            <option value="">All</option>
            <option value=""></option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b border-yellow-400 text-yellow-400">
              <th className="px-4 py-3 w-1/6">Edited By</th>
              <th className="px-4 py-3 w-1/6">Field Changed</th>
              <th className="px-4 py-3 w-1/6">User Affected</th>
              <th className="px-4 py-3 w-1/6">Timestamp</th>
              <th className="px-4 py-3 w-1/4">Notes</th>
              <th className="px-4 py-3 w-1/12">Audit</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="px-4 py-3">{item.editedby}</td>
                <td className="px-4 py-3">{item.fieldchanged}</td>
                <td className="px-4 py-3">{item.useraffected}</td>
                <td className="px-4 py-3">{item.timestamp}</td>
                <td className="px-4 py-3 whitespace-pre-line">{item.notes}</td>
                <td className="px-4 py-3">{item.audit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManualEditsLog;
