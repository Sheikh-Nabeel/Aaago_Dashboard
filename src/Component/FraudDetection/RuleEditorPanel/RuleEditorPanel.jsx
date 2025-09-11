import React from 'react';
import { FaEdit } from 'react-icons/fa';
import FraudDetectNav from '../FraudDetectNav';
import Sidebar from '../../Home/Sidebar';

const RuleEditorPanel = () => {
  return (
    <div className="flex min-h-screen  ">
      <Sidebar />

      <div className="flex-1">
        <FraudDetectNav />

        <div className="py-8 font-sans px-6 mt-10">
          {/* Rule List Section */}
          <h3 className="text-yellow-400 mb-4 text-xl font-semibold px-2">Rule List:</h3>

          <div className="flex justify-center">
            <div className="rounded-xl border w-full max-w-3xl border-yellow-500 p-4 mb-10 space-y-6">
              {[
                {
                  label: 'Frequent Cancellations',
                  value: 'if cancels ≥ 3 in 24 hrs',
                },
                {
                  label: 'GPS Spoof Detected',
                  value: 'Emulator or spoofing logs',
                },
                {
                  label: 'Fake Referral Pattern',
                  value: 'Same IP/referral loops',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center gap-4 py-2">
                  <span className="w-1/3">{item.label}</span>
                  <input
                    type="text"
                    defaultValue={item.value}
                    className="bg-transparent focus:outline-none rounded-full border border-yellow-400 px-2 py-1 w-1/2"
                  />
                  <div className="flex gap-2">
                    <button className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full">Save</button>
                    <FaEdit size={25} className="px-1 py-1 rounded-full bg-yellow-300 text-[#013220] cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editable Inputs Table */}
          <h3 className="text-yellow-400 mb-4 mt-10 text-xl font-semibold px-2">Editable Inputs:</h3>

          <div className="flex justify-center">
            <div className="overflow-x-auto w-full max-w-3xl rounded-xl border border-yellow-500">
              <table className="w-full border-collapse text-sm text-left">
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="border border-yellow-500 px-4 py-6 font-medium">Threshold values</td>
                    <td className="border border-yellow-500 px-4 py-4">
                      <input
                        type="number"
                        defaultValue={3}
                        className="bg-transparent   border border-yellow-400 rounded-full px-1 py-1 w-16 text-center"
                      />
                    </td>
                    <td className="border border-yellow-500 px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <button className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full">Save</button>
                        <FaEdit size={25} className="p-1 rounded-full text-[#013220] bg-yellow-400 cursor-pointer" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="border border-yellow-500 px-4 py-6 font-medium">Rule severity level</td>
                    <td className="border border-yellow-500 px-4 py-4">
                      <div className="flex justify-center gap-6">
                        <label className="flex items-center gap-1"><input type="radio" name="severity" /> Low</label>
                        <label className="flex items-center gap-1"><input type="radio" name="severity" /> Medium</label>
                        <label className="flex items-center gap-1"><input type="radio" name="severity" /> High</label>
                      </div>
                    </td>
                    <td className="border border-yellow-500 px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <button className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full">Save</button>
                        <FaEdit size={25} className="p-1 rounded-full text-[#013220] bg-yellow-400 cursor-pointer" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="border border-yellow-500 px-4 py-6 font-medium">Fake Referral Pattern</td>
                    <td className="border border-yellow-500 px-4 py-4">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1"><input type="checkbox" className='accent-[#013220] focus:right-0' defaultChecked /> Warn User</label>
                        <label className="flex items-center gap-1"><input type="checkbox" className='accent-[#013220] focus:right-0' defaultChecked /> Flag for Review</label>
                        <label className="flex items-center gap-1"><input type="checkbox" className='accent-[#013220] focus:right-0' defaultChecked /> Auto Lock Account</label>
                      </div>
                    </td>
                    <td className="border border-yellow-500 px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <button className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full">Save</button>
                        <FaEdit size={25} className="p-1 rounded-full text-[#013220] bg-yellow-400 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-center gap-6 mt-10">
            <button className="bg-yellow-400 text-[#013220] font-bold px-8 py-2 rounded-full shadow-md">Save Rules</button>
            <button className="bg-yellow-400 text-[#013220] font-bold px-8 py-2 rounded-full shadow-md">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleEditorPanel;
