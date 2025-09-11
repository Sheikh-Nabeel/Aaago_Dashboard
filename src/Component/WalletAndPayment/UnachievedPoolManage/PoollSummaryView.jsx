import React from "react";

const PoolCard = ({ title, amount, claimed, unclaimed }) => {
  const totalBars = 10;
  const claimedBars = Math.round((claimed / 100) * totalBars);
  const unclaimedBars = totalBars - claimedBars;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border-2 border-green-300 p-6 bg-gradient-to-br from-[#003e27] to-[#004d2c]
 text-yellow-400 shadow-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="flex justify-between">
      <p className="text-lg font-semibold mb-4">Amount: AED {amount.toLocaleString()}</p>
 {/* Legend */}
      <div className="flex flex-col text-medium mr-20">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full" />
          <span>Claimed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span>Unclaimed</span>
        </div>
      </div>
      </div>

      <div className="space-y-1 font-semibold">
        <p className="font-bold text-lg">Status:</p>
        <div className="flex justify-between  text-medium mr-20">
          <div>
        <p className="text-green-400">{claimed}% Claimed</p>
        <p className="text-yellow-400">{unclaimed}% Unclaimed</p>
          </div>
<div className="mt-4">
        <p className="text-sm font-semibold mb-1">Progress Bar</p>
        <div className="flex gap-1">
          {[...Array(claimedBars)].map((_, i) => (
            <div key={`c-${i}`} className="w-2 h-5 bg-green-400 rounded-sm" />
          ))}
          {[...Array(unclaimedBars)].map((_, i) => (
            <div key={`u-${i}`} className="w-2 h-5 bg-yellow-400 rounded-sm" />
          ))}
        </div>
      </div>
        </div>
      </div>     
    </div>
  );
};

const PoollSummaryView= () => {
  return (
    <div className=" min-h-screen py-10 space-y-10 px-4">
      {/* Time Filter */}
      <div className="flex justify-end pr-8">
        <label className="flex items-center text-yellow-400 font-medium">
          <span>Time:</span>
          <select className="bg-transparent rounded focus:outline-none">
            <option>7 days</option>
            <option>30 days</option>
          </select>
        </label>
      </div>

      {/* Pool Cards */}
      <PoolCard title="CRR Pool" amount={45000} claimed={60} unclaimed={40} />
      <PoolCard title="BBR Pool" amount={32750} claimed={75} unclaimed={25} />
      <PoolCard title="Referral Pool" amount={32750} claimed={75} unclaimed={25} />
      <PoolCard title="Loyalty Pool" amount={32750} claimed={30} unclaimed={75} />
<button className="font-semibold block mx-auto bg-yellow-400 px-4 py-2 text-black rounded-full">Explore Summary</button>

    </div>
  );
};

export default PoollSummaryView;
