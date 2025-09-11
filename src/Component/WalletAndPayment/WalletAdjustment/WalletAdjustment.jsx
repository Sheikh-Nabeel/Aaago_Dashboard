import React from 'react';
import Sidebar from '../../Home/Sidebar';
import WalletPaymentNavbar from '../WalletPaymentNavbar';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import WalletAdjustmentTable from './WalletAdjustmentTable';

const WalletAdjustment = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />
        <div className="flex-1 overflow-y-auto text-yellow-400 px-8 py-6 space-y-6">
          {/* Input Fields Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Input */}
            <div className="col-span-2 flex items-center gap-4">
              <input
                type="text"
                placeholder="Amount Input"
                className="flex-1 rounded-full placeholder:text-yellow-300 border border-yellow-400 bg-transparent px-4 py-2 focus:outline-none"
              />
              <FiMinusCircle size={32} className="text-yellow-400 cursor-pointer" />
              <FiPlusCircle size={32} className="text-yellow-400 cursor-pointer" />
            </div>

            {/* Adjustment Type */}
           <div className="w-full border border-yellow-400 rounded-full overflow-hidden">
  <select className="w-full block bg-transparent px-4 py-2 focus:outline-none appearance-none text-yellow-300"
  >
    <option className="bg-yellow-400 text-black">Bonus</option>
    <option className="bg-yellow-400 text-black">Penalty</option>
    <option className="bg-yellow-400 text-black">Refund</option>
  </select>
</div>
            {/* Type Reason */}
            <textarea
              placeholder="Type Reason Here...."
              className="w-full h-32 rounded-lg placeholder:text-yellow-300 border border-yellow-400 bg-transparent px-4 py-2 focus:outline-none col-span-2"
            />          
          </div>         
        </div>
         <WalletAdjustmentTable/>
      </div>     
    </div>
  );
};

export default WalletAdjustment;
