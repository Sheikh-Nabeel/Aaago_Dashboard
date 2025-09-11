const WithdrawalSettings = () => {
  return (
    <div className=" text-yellow-400 p-6 rounded-md w-full max-w-5xl mx-auto border border-yellow-500 mt-10">
      <h2 className="text-xl font-bold mb-4">Withdrawal Settings :</h2>

      {/* Withdrawal Frequency */}
      <div className="mb-4">
        <label
          className="block mb-1 font-medium"
          htmlFor="withdrawal-frequency"
        >
          Withdrawal Frequency:
        </label>
        <select
          id="withdrawal-frequency"
          name="withdrawalFrequency"
          className="w-full p-2 rounded-full text-yellow-300 border border-yellow-400 focus:outline-none bg-[#013220]"
        >
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Daily Limit Per User */}
      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="daily-limit">
          Daily Limit Per User
        </label>
        <input
          type="number"
          id="daily-limit"
          name="dailyLimit"
          className="w-full p-2 placeholder:text-yellow-400 bg-[#013220] focus:outline-none rounded-full text-yellow-300 border border-yellow-400"
          placeholder="Enter amount"
        />
      </div>

      {/* Weekly Limit */}
      <div className="mb-6">
        <label className="block mb-1 font-medium" htmlFor="weekly-limit">
          Weekly Limit
        </label>
        <input
          type="number"
          id="weekly-limit"
          name="weeklyLimit"
          className="w-full p-2 rounded-full bg-[#013220] focus:outline-none  placeholder:text-yellow-400 border border-yellow-400"
          placeholder="Enter amount"
        />
      </div>

      {/* Freeze Rules */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">Freeze Rules:</h3>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="blockIfFlagged"
              className="mr-2 accent-yellow-400"
              defaultChecked
            />
            Block if user flagged
          </label>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="blockIfKYCIncomplete"
              className="mr-2 accent-yellow-400"
              defaultChecked
            />
            Block if KYC incomplete
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="blockIfShared"
              className="mr-2 accent-yellow-400"
              defaultChecked
            />
            Block if same account used by 2+ users
          </label>
      </div>

      {/* Apply Button */}
      <button
        type="submit"
        className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full block mx-auto hover:bg-yellow-300"
      >
        Apply Adjustment
      </button>
    </div>
  );
};

export default WithdrawalSettings;
