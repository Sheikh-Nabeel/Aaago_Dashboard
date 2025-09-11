import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Home/Sidebar"; // Import Sidebar
import CareerNavbar from "./CareerNavbar";

const data = [
  {
    image:
      "https://www.shutterstock.com/image-photo/close-headshot-portrait-serious-caucasian-260nw-1531440581.jpg",
    name: "Smith",
    rating: 4.8,
    category: "Lorem Ipsum",
  },
  {
    image:
      "https://www.shutterstock.com/image-photo/close-headshot-portrait-serious-caucasian-260nw-1531440581.jpg",
    name: "Smith",
    rating: 4.8,
    category: "Lorem Ipsum",
  },
  {
    image:
      "https://www.shutterstock.com/image-photo/close-headshot-portrait-serious-caucasian-260nw-1531440581.jpg",
    name: "Smith",
    rating: 4.8,
    category: "Lorem Ipsum",
  },
];

const vendorList = [
  {
    vendorname: "Smith Joy",
    category: "Auto",
    status: "Active",
  },
  {
    vendorname: "Smith Joy",
    category: "Auto",
    status: "Active",
  },
  {
    vendorname: "Smith Joy",
    category: "Auto",
    status: "Active",
  },
];

const proposalQueue = [
  {
    proposalid: "PR-001",
    title: "Free Oil Change",
    flagReason: "Inappropriate",
    submittedby: "User123",
  },
];

const MarketPlaceControl = () => {
 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
        <Sidebar />
      

      {/* Main Content */}
      <div className="flex-1  overflow-y-auto">
        {/* Top Nav Links */}
       <CareerNavbar/>

        {/* Card List */}
        <div className=" px-1 flex py-8 justify-around items-center flex-wrap ">
          {data.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-gradient-to-r from-[#03915D] to-[#013924] border border-yellow-200 px-6 py-6 flex gap-4 items-center min-w-[300px]"
            >
              <div className="h-24 w-24 rounded-full border border-dashed border-yellow-400 overflow-hidden flex items-center justify-center">
                <img
                  className="h-full w-full object-cover"
                  src={item.image}
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-8">
                  <span className="font-semibold">Name:</span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-semibold">Rating:</span>
                  <span className="text-sm">⭐{item.rating}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-semibold">Category:</span>
                  <span className="text-sm">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Controls */}
        <div className="px-8">
          <form>
            <div className="flex flex-col gap-8">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="market-toggle"
                  className="accent-yellow-400"
                />
                <label htmlFor="market-toggle" className="text-sm">
                  Turns entire marketplace visibility for all users
                </label>
              </div>
              <div className="flex justify-center gap-6">
                <button
                  type="button"
                  className="bg-yellow-400 px-6 py-1 outline outline-yellow-500 rounded-full text-[#013220] font-semibold text-sm"
                >
                  Add Vendor
                </button>
                <button
                  type="button"
                  className="bg-yellow-400 px-4 py-2 outline outline-yellow-500 rounded-full text-[#013220] font-semibold text-sm"
                >
                  Remove Vendor
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Vendor Table */}
        <div className="mt-10 px-8">
          <h3 className="text-lg font-bold mb-1">Vendor List:</h3>
          <span className="text-sm flex justify-end w-2/3 underline">
            Add Trusted Vendors
          </span>
          <div className="flex justify-center items-center mt-4">
            <div className="border border-yellow-300 rounded-md w-full max-w-3xl overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-300">
                    <th className="px-4 py-2 text-left">Vendor Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">
                      Status
                      <select className="ml-2 bg-[#013220] text-yellow-300 rounded text-xs px-1 py-0.5 focus:outline-none">
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                      </select>
                    </th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorList.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.vendorname}</td>
                      <td className="px-4 py-2">{item.category}</td>
                      <td className="px-4 py-2">{item.status}</td>
                      <td className="px-4 py-2">
                        <button className="text-sm bg-yellow-400 rounded-full px-2 py-1 text-black">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Proposal Queue */}
        <div className="mt-4 px-8">
          <h3 className="text-lg font-bold mb-1">Proposal Moderation Queue:</h3>
          <span className="text-sm flex justify-end w-2/3">
            Sorted By:
            <select
              name=""
              id=""
              className="bg-[#013220] focus:outline-none ml-2"
            >
              <option value="">Flagged Only</option>
            </select>
          </span>
          <div className="flex justify-center items-center mt-4">
            <div className="border border-yellow-300 rounded-md w-full max-w-3xl overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-300">
                    <th className="px-4 py-2 text-left">Proposal ID</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Flag Reason</th>
                    <th className="px-4 py-2 text-left">Submitted By</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {proposalQueue.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.proposalid}</td>
                      <td className="px-4 py-2">{item.title}</td>
                      <td className="px-4 py-2">{item.flagReason}</td>
                      <td className="px-4 py-2">{item.submittedby}</td>
                      <td className="px-4 py-2">
                        <button className="text-sm bg-yellow-400 rounded-full px-4 py-1 text-black">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              className="bg-yellow-400 px-6 py-1 outline outline-yellow-500 rounded-full text-[#013220] font-semibold text-sm"
            >
              Accept All
            </button>
            <button
              type="button"
              className="bg-yellow-400 px-4 py-2 outline outline-yellow-500 rounded-full text-[#013220] font-semibold text-sm"
            >
              Remove Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceControl;
