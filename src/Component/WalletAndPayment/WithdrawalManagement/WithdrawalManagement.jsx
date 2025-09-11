import React from 'react'
import Sidebar from '../../Home/Sidebar'
import WalletPaymentNavbar from '../WalletPaymentNavbar'
import { FaCheck } from "react-icons/fa6";
import { FaPause } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import WithdrawalSettings from './WithdrawalSettings';

const WithdrawalManagement = () => {
  const Tabledata = [
    {
      userName:'Asad Raza',
      amount:'+500',
      date:'24-Jul-25',
      accountType:'Bank Transfer',
    },
    {
      userName:'Asad Raza',
      amount:'+500',
      date:'24-Jul-25',
      accountType:'Bank Transfer',
    }
  ]
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />
        <div className='w-[95%] mx-auto py-12 '>
          <h2 className='py-4'>Paginated Table View</h2>
  <div className="w-full max-w-7xl border border-yellow-400 rounded-xl overflow-hidden">
    <table className="w-full max-w-5xl  text-sm text-yellow-300">
      <thead className="border-b border-yellow-400">
        <tr>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">User Name</th>
          <th className="text-left px-4 py-3">KYC</th>
          <th className="text-left px-4 py-3">Amount</th>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">Account Type</th>
          <th className="text-center px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="bg-transparent">
       {Tabledata.map((item, index)=>(

        <tr className=" ">
          <td className="px-4 py-3">{item.date}</td>
          <td className="px-4 py-3">{item.userName}</td>
          <td className="px-4 py-3"><FaCheck size={25}/></td>
          <td className="px-4 py-3">{item.amount}</td>
          <td className="px-4 py-3">{item.date}</td>
          <td className="px-4 py-3">{item.accountType}</td>
          <td className="px-4 py-3">
            <div className='flex gap-2 justify-center'>
              <div className='rounded-full p-1 border border-yellow-300'><FaCheck size={20}/></div> 
              <div className='rounded-full p-1 border border-yellow-300'><RxCross2 size={20}/></div> 
              <div className=' rounded-full p-1 border border-yellow-300'><FaPause size={20}/></div>
            </div>
          </td>
        </tr>
       ))}
       
      </tbody>
    </table>
  </div>
  <WithdrawalSettings/>
</div>
</div>
    </div>
  )
}

export default WithdrawalManagement