import React from "react";
import Sidebar from "../../Home/Sidebar";
import ReportNavbar from "../ReportNavbar";
const sampleData = [
  {
    name: "Ali",
    servicetype: "Ride",
    Bookingid: "R-9872",
    date: "Aug 4, 2025",
    amount: "AED 15,000",
    status: "Completed",
  },
  {
    name: "Ali",
    servicetype: "Ride",
    Bookingid: "R-9872",
    date: "Aug 4, 2025",
    amount: "AED 15,000",
    status: "Cancelled",
  },
];
const CustomReportTable = () => {
  return (
    <>
      <div className="flex bg-[#13220] min-h-screen ">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <ReportNavbar />
          <div className="p-4"> 
            <h2 className="text-lg font-semibold pt-6">Build your Custom Report</h2> 
             </div>       
          <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl my-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-yellow-400  text-yellow-400">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Service Type</th>
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.servicetype}</td>
                    <td className="px-4 py-3">{item.Bookingid}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CustomReportTable;
