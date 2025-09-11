import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const GeoKYCSection = () => {
  return (
    <div>
      <div className="flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-3xl">
          {/* Geo Analysis Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-yellow-400">Geo Analysis:</h2>
            <div className="flex  gap-6">
              {/*Location */}
              <div className="w-full h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.642362785302!2d73.07320327479479!3d33.64051393936022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11a4d1a8d62fd41%3A0x1feebab68518189!2sCodesVista!5e0!3m2!1sen!2s!4v1753904744706!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Alert Box */}
              <div className="self-start  bg-gradient-to-br from-green-900 to-green-500 p-4  rounded-lg w-full md:w-2/5 shadow-lg">
                <h3 className="text-red-500 font-bold text-xl mb-2 text-center">
                  Alert
                </h3>
                <div className="flex items-start gap-2 mb-2">
                  <FaExclamationTriangle
                    size={25}
                    className="text-yellow-300 mt-1"
                  />
                  <p className="text-md">Region Mismatched Detected</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle
                    size={25}
                    className="text-yellow-300 mt-1"
                  />
                  <p className="text-md">
                    Distance anomaly: 800km deviation in 10 mins
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KYC Section */}
          <div className=" pt-6">
            <h3 className="text-yellow-400 font-semibold mb-4">
              KYC Document:
            </h3>

            {/* Profile Row */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" // Replace with actual profile
                alt="Profile"
                className="w-16 h-16 object-cover rounded-xl border border-yellow-400"
              />
              <p className="text-sm text-red-800 font-medium">
                Mismatched With System Record
              </p>
            </div>

            {/* CNIC Cards Row */}
            <div className="flex justify-between gap-2 pb-6">
              {/* Front Side */}
              <div className="space-y-2">
                <img
                  src="/card1.jpg"
                  alt="Front Side"
                  className="w-56 h-auto rounded shadow-md"
                />
                <p className="text-sm text-yellow-300 text-center text-semibold">
                  Front Side
                </p>
              </div>

              {/* Back Side + Alert */}
              <div className="flex gap-4 space-y-2">
                <div>
                  <img
                    src="/card2.jpg"
                    alt="Back Side"
                    className="w-56 h-auto rounded shadow-md"
                  />
                  <p className="text-sm text-yellow-300 text-center text-semibold pt-2">
                    Back Side
                  </p>
                </div>

                <div className="self-start bg-gradient-to-br from-green-900 to-green-500 px-2 py-4 rounded-md shadow-lg">
                  <h4 className="text-red-800 font-bold text-lg mb-1 text-center">
                    Alert
                  </h4>

                  <div className="flex justify-center gap-4">
                    <div className="">
                      <FaExclamationTriangle
                        size={30}
                        className="text-yellow-300 mt-1"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-yellow-200">
                        Duplicate CNIC detected in 2 accounts:
                      </p>

                      <ul className="text-xs pl-4 text-yellow-100 list-disc">
                        <li>CUST-7834 (this user)</li>
                        <li>CUST-7921 (flagged last week)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-10 border-t pt-6 border-yellow-300">
            <button className="bg-yellow-400 px-4 py-2 rounded-full font-semibold text-base text-black outline outline-yellow-500">
              Marked Save
            </button>
            <button className="bg-yellow-400 px-4 py-2 rounded-full font-semibold text-base text-black outline outline-yellow-500">
              Temporary Ban
            </button>
            <button className="bg-yellow-400 px-4 py-2 rounded-full font-semibold text-base text-black outline outline-yellow-500">
              Permanent Ban
            </button>
            <button className="bg-yellow-400 px-4 py-2 rounded-full font-semibold text-base text-black outline outline-yellow-500">
              Freeze Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoKYCSection;
