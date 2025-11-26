import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import Sidebar from "../../Home/Sidebar";
import WalletPaymentNavbar from "../WalletPaymentNavbar";
import { yellow } from "@mui/material/colors";
import { FaCalendarAlt } from "react-icons/fa";
import axiosInstance from '../../../services/axiosConfig';
import toast from 'react-hot-toast';


// Custom styled MUI switch to match Figma
const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  display: "flex",
  "&:active .MuiSwitch-thumb": {
    width: 18,
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#FFD700",
      "& + .MuiSwitch-track": {
        backgroundColor: "green",

        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FFD700",
    width: 18,
    height: 18,
    borderRadius: "50%",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 24,
    opacity: 1,
    backgroundColor: "#777",
    boxSizing: "border-box",
  },
}));

const WalletFreezingRule = () => {
  const [rules, setRules] = React.useState({
    blockIfUserFlagged: true,
    blockIfKycIncomplete: true,
    blockIfSameAccountUsedByMultiple: true,
    cancellationAbuseThreshold: 3,
    suspiciousTopupsCardReuseThreshold: 3,
  });
  const [accounts, setAccounts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);

  const fetchSettings = async () => {
    try {
      const res = await axiosInstance.get('/wallet/admin/settings');
      const d = res.data?.data || res.data;
      const fz = d?.freezeRules || {};
      setRules({
        blockIfUserFlagged: Boolean(fz.blockIfUserFlagged),
        blockIfKycIncomplete: Boolean(fz.blockIfKycIncomplete),
        blockIfSameAccountUsedByMultiple: Boolean(fz.blockIfSameAccountUsedByMultiple),
        cancellationAbuseThreshold: Number(fz.cancellationAbuseThreshold ?? 3),
        suspiciousTopupsCardReuseThreshold: Number(fz.suspiciousTopupsCardReuseThreshold ?? 3),
      });
    } catch (e) {}
  };

  const fetchFrozenAccounts = async () => {
    try {
      const res = await axiosInstance.get('/wallet/admin/frozen-accounts', { params: { page, limit: 20 } });
      const d = res.data?.data || res.data;
      setAccounts(d?.accounts || []);
      setPages(d?.pages || d?.pagination?.pages || 1);
    } catch (e) {
      setAccounts([]);
      setPages(1);
    }
  };

  React.useEffect(() => { fetchSettings(); }, []);
  React.useEffect(() => { fetchFrozenAccounts(); }, [page]);

  const setPath = (path, val) => {
    setRules(prev => ({ ...prev, [path]: val }));
  };

  const saveSettings = async () => {
    try {
      const payload = {
        freezeRules: {
          blockIfUserFlagged: rules.blockIfUserFlagged,
          blockIfKycIncomplete: rules.blockIfKycIncomplete,
          blockIfSameAccountUsedByMultiple: rules.blockIfSameAccountUsedByMultiple,
          cancellationAbuseThreshold: Number(rules.cancellationAbuseThreshold || 0),
          suspiciousTopupsCardReuseThreshold: Number(rules.suspiciousTopupsCardReuseThreshold || 0),
        },
      };
      const res = await axiosInstance.put('/wallet/admin/settings', payload);
      if (res.data?.success) toast.success(res.data?.message || 'Settings updated');
      else toast.error(res.data?.message || 'Update failed');
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1  overflow-hidden">
        <WalletPaymentNavbar />
         
          <div className="flex justify-end items-center pt-6  w-2/3">
            <button onClick={saveSettings} className="bg-yellow-400 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-300">Save</button>
          </div>

 {/* Abuse Rules */}
          <div className="w-full max-w-7xl flex justify-center px-6  mb-8 relative">
          <div className="border border-yellow-500 rounded-xl  w-full max-w-3xl  p-6  mb-8 ">
            {/* Cancellation Abuse */}
            <div className="">
              <span>
                <strong>Cancellation Abuse :</strong>
              </span>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 py-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-yellow-400" checked={rules.blockIfUserFlagged} onChange={(e) => setPath('blockIfUserFlagged', e.target.checked)} />
                    Freeze if user flagged
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <span>Threshold</span>
                  <input type="number" value={rules.cancellationAbuseThreshold} onChange={(e) => setPath('cancellationAbuseThreshold', e.target.value === '' ? '' : Number(e.target.value))} className="w-16 bg-transparent border border-yellow-400 rounded px-2 py-1" />
                </div>
              </div>
              {/* Suspicious Top-ups */}
              <span className="py-6">
                <strong className="py-6">Suspicious Top-ups :</strong>
              </span>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 py-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-yellow-400" checked={rules.blockIfSameAccountUsedByMultiple} onChange={(e) => setPath('blockIfSameAccountUsedByMultiple', e.target.checked)} />
                    Freeze if same account used by multiple
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <span>Card reuse threshold</span>
                  <input type="number" value={rules.suspiciousTopupsCardReuseThreshold} onChange={(e) => setPath('suspiciousTopupsCardReuseThreshold', e.target.value === '' ? '' : Number(e.target.value))} className="w-16 bg-transparent border border-yellow-400 rounded px-2 py-1" />
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Table Header */}
          <div className="mb-2 font-bold self-start flex justify-between gap-12">
            <h2 className="px-4 text-xl">  Auto-Frozen Accounts Table:</h2>
          
           
            <div className="flex gap-2 items-center mr-4">
               <span className="float-right text-sm font-normal">
              Sort By: 
              <select name="" id="" className="bg-[#013220] focus:outline-none bg-transparent">
                <option value=""> Reverification Needed Only Date</option>
              </select>
            </span>
              <FaCalendarAlt/>
              <span>Date</span>
            </div>
            

          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full max-w-5xl mx-auto">
            <table className="min-w-full  border border-yellow-400 rounded text-left">
              <thead className=" text-yellow-300">
                <tr className="border-b border-yellow-300 text-left">
                  <th className="p-3">User Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">
                    Trigger Reason
                  </th>
                  <th className="p-3">
                    Reverify Needed
                  </th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((item, i) => (
                    <tr key={item.userId || i} className="">
                      <td className="p-3">{item.userName || item.username}</td>
                      <td className="p-3">{item.status}</td>
                      <td className="p-3">{item.triggerReason}</td>
                      <td className="p-3">{item.reverifyNeeded ? 'Yes' : 'No'}</td>
                      <td className="p-3">
                        <button className="bg-yellow-400 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-300">Unlock</button>
                      </td>
                    </tr>
                  ))}
                  {accounts.length === 0 && (
                    <tr><td className="p-3 text-center" colSpan={5}>No frozen accounts</td></tr>
                  )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center gap-3 py-3">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className='px-3 py-1 rounded-full border border-yellow-400' disabled={page === 1}>Prev</button>
            <span>{page}/{pages}</span>
            <button onClick={() => setPage(p => Math.min(p + 1, pages))} className='px-3 py-1 rounded-full border border-yellow-400' disabled={page === pages}>Next</button>
          </div>
        
      </div>
    </div>
  );
};

export default WalletFreezingRule;
