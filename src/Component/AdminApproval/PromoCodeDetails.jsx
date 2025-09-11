import React from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import Sidebar from "../Home/Sidebar";
import { Link } from "react-router-dom";
import AdminApprovalNav from "./AdminApprovalNav";
const PromoCodeDetails = () => {
  return (
    <div className="flex  text-yellow-400 min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav />
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-4 m-4">
          <IoArrowUndoOutline size={25} className="text-yellow-400" />
          <Link to={"/promocode"} className="text-yellow-400 hover:underline">
            Back
          </Link>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Promo Code Details:</h2>
          <div className="w-full  text-yellow-400 flex flex-col items-center font-sans">
            {/* Main Box */}
            <div className="w-full max-w-2xl border border-yellow-400 rounded-xl p-8">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-4 text-sm mb-8">
                <p className="font-semibold">Code:</p>
                <p className="">AAA015</p>

                <p className="font-semibold">Discount Structure:</p>
                <p className="">15% off on total ride fare</p>

                <p className="font-semibold">Redemption Limit:</p>
                <p className="">1 per user, max 2,000 redemptions</p>

                <p className="font-semibold">Eligible Users:</p>
                <p className="">All UAE users</p>

                <p className="font-semibold">Distribution Channel:</p>
                <p className="">In-app banner + push notifications</p>

                <p className="col-span-2 font-bold mt-4">
                  Budget & Performance Impact
                </p>

                <p className="font-semibold">Estimated Cost to Platform:</p>
                <p className="">AED 60,000</p>

                <p className="font-semibold">Projected Revenue Influence:</p>
                <p className="">AED 60,000</p>

                <p className="font-semibold">Forecasted ROI:</p>
                <p className="">AED 60,000</p>

                <p className="font-semibold">Break-even Target:</p>
                <p className="">900 redemptions</p>
              </div>

              {/* Notes */}
              <div>
                <p className="font-semibold mb-2">Team Submission Notes</p>
                <div className="border border-yellow-400  rounded-md p-4 text-sm">
                  <p> Proposed as part of our UAE National Day awareness campaign.
                  Targeting increased engagement in key metro areas.</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-6 flex gap-10">
              <button className="bg-yellow-400 text-green-900 font-sm font-semibold px-10 py-2 rounded-full shadow hover:bg-yellow-300 transition-all">
                Approve Offer
              </button>
              <button className="bg-yellow-400 text-green-900 font-sm font-semibold px-10 py-2 rounded-full shadow hover:bg-yellow-300 transition-all">
                Reject Proposal
              </button>
              <button className="bg-yellow-400 text-green-900 font-sm font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition-all">
                Suggest Modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeDetails;
