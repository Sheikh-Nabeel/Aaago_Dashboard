import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Sidebar from "../../Home/Sidebar";
import WalletPaymentNavbar from "../WalletPaymentNavbar";
import { MdBugReport } from "react-icons/md";

const AlertAndSmartNotifi = () => {
  const [activeTab, setActiveTab] = useState("general");

  const allNotifications = {
    general: [
      {
        id: 1,
        message: "Suspicious Cross-Account Activity(Shared Card ID)",
        detail:"General: Lorem Ipsum Dolor Sit Amet Consectetur. Augue Dolor Proin Nulla Eu Mi Tincidunt.",
        time: "Just Now",
      },
    ],
    booking: [
      {
        id: 2,
        message: "Suspicious Cross-Account Activity(Shared Card ID)",
        detail:"Booking: Your appointment has been confirmed for tomorrow at 10AM.",
        time: "5 min ago",
      },
    ],
    important: [
      {
        id: 3,
        message: "Suspicious Cross-Account Activity(Shared Card ID)",
        detail:
          "Important: Please review the new wallet freezing policy effective next week.",
        time: "2 hrs ago",
      },
    ],
  };

  const currentNotifications = allNotifications[activeTab];

  return (
    <div className="flex bg-[#13220] min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <WalletPaymentNavbar />

        {/* Heading */}
        <div className="py-10">
          <h1 className="flex gap-2 items-center text-xl font-semibold pb-1 px-4">
            <IoIosNotifications /> {currentNotifications.length} Notifications
          </h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 px-4">
          <div className="flex gap-8 text-sm font-semibold items-center border-b border-yellow-300 pb-2">
            <button
              onClick={() => setActiveTab("general")}
              className={`${
                activeTab === "general"
                  ? "bg-yellow-400 text-black px-4 py-1 rounded"
                  : "hover:text-yellow-200"
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`${
                activeTab === "booking"
                  ? "bg-yellow-400 text-black px-4 py-1 rounded"
                  : "hover:text-yellow-200"
              }`}
            >
             Warning
            </button>
            <button
              onClick={() => setActiveTab("important")}
              className={`${
                activeTab === "important"
                  ? "bg-yellow-400 text-black px-4 py-1 rounded"
                  : "hover:text-yellow-200"
              }`}
            >
            Info
            </button>
          </div>
        </div>

        {/* Notification Cards */}
        <div className="flex flex-col gap-4 px-6">
          {currentNotifications.length === 0 ? (
            <div className="text-sm text-center py-10">
              No notifications found.
            </div>
          ) : (
            currentNotifications.map((item) => (
              <div
                key={item.id}
                className="bg-[#0A3A26] border border-[#3A4F3A] p-4 rounded-xl flex justify-between items-start"
              >
                <div className="flex gap-4">
                    <div className="rounded-full border self-start  p-1 border-yellow-400 ">
                 <MdBugReport size={30} />
                    </div>
                  <div className="max-w-full">
                    <p className="font-semibold text-sm mb-1">
                      {item.message}
                    </p>
                    <p className="text-xs">{item.detail}</p>
                    <div className="flex items-center text-xs mt-1">
                      <FaClock className="mr-1" />
                      {item.time}
                    </div>
                  </div>
                </div>
                <button className="text-yellow-400 relative text-sm whitespace-nowrap hover:underline">
                  Investigate
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertAndSmartNotifi;
