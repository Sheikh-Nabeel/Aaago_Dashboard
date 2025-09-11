import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import Sidebar from './Home/Sidebar';

const allNotifications = {
  general: [
    {
      id: 1,
      name: "Zoe",
      message: "Zoe Sent You A Message",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      detail:
        "General: Lorem Ipsum Dolor Sit Amet Consectetur. Augue Dolor Proin Nulla Eu Mi Tincidunt.",
      time: "Just Now",
    },
  ],
  booking: [
    {
      id: 2,
      name: "Zoe",
      message: "Booking Confirmed",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      detail:
        "Booking: Your appointment has been confirmed for tomorrow at 10AM.",
      time: "2 hours ago",
    },
  ],
  important: [
    {
      id: 3,
      name: "Admin",
      message: "Important Policy Update",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      detail:
        "Important: New wallet freezing rules are now in effect. Please review.",
      time: "5 hours ago",
    },
  ],
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("general");

  const currentNotifications = allNotifications[activeTab];

  return (
    <div className="flex bg-[#13220] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 relative">
        {/* Back */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <TiArrowBackOutline size={30} className="cursor-pointer" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="py-10">
          <h1 className="text-xl font-semibold inline-block relative pb-1">
            Notification & Alerts
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-yellow-400 rounded-full" />
          </h1>
          <h5 className="text-sm float-right text-yellow-400 cursor-pointer">
            Mark All As Read
          </h5>
        </div>

        {/* Tabs */}
        <div className="border-b border-yellow-400 mb-6">
          <div className="flex gap-20 text-sm font-semibold items-center pb-2">
            {["general", "booking", "important"].map((type) => (
              <div
                key={type}
                onClick={() => setActiveTab(type)}
                className={`relative cursor-pointer`}
              >
                {type === "general" && "General Notification"}
                {type === "booking" && "Booking Notification"}
                {type === "important" && "Important Notification"}
                {activeTab === type && (
                  <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-yellow-400 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notification Cards */}
        <div className="flex flex-col gap-4">
          {currentNotifications.length === 0 ? (
            <div className="text-center py-8 text-sm text-yellow-200">
              No notifications in this category.
            </div>
          ) : (
            currentNotifications.map((item) => (
              <div
                key={item.id}
                className="bg-[#0A3A26] border border-[#3A4F3A] p-4 rounded-xl flex justify-between items-start"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm mb-1">
                      {item.message}
                    </p>
                    <p className="text-xs">{item.detail}</p>
                    <div className="flex items-center text-xs mt-1 ">
                      <FaClock className="mr-1" />
                      {item.time}
                    </div>
                  </div>
                </div>
                <button className="text-yellow-400 text-sm whitespace-nowrap relative hover:underline">
                  View Detail
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
