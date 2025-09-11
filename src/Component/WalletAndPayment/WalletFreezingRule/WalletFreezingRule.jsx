import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import Sidebar from "../../Home/Sidebar";
import WalletPaymentNavbar from "../WalletPaymentNavbar";
import { yellow } from "@mui/material/colors";
import { FaCalendarAlt } from "react-icons/fa";


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
  const frozenAccount = [
    {
      username:'Asad Raza',
      status:'Frozen',
      triggerReason:'4 Cancels in 24h',
      reverifyneeded:'yes'
    },
    {
      username:'Asad Raza',
      status:'Frozen',
      triggerReason:'4 Cancels in 24h',
      reverifyneeded:'no'
    },
  ]
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1  overflow-hidden">
        <WalletPaymentNavbar />
         
          <div className="flex justify-end items-center pt-6  w-2/3">
  <span className="underline text-yellow-400 cursor-pointer">Edit</span>
</div>

 {/* Abuse Rules */}
          <div className="w-full max-w-7xl flex justify-center px-6  mb-8 relative">
          <div className="border border-yellow-500 rounded-xl  w-full max-w-3xl  p-6  mb-8 ">
            {/* Cancellation Abuse */}
            <div className="">
              <span>
                <strong>Cancellation Abuse :</strong>
              </span>
              <div className="flex justify-between ">
               <label className="flex items-center gap-4 py-6">
  <input
    type="checkbox"
    defaultChecked
    className="accent-yellow-400"
    name="cancelAbuse"
  />
  Freeze if cancels &gt;3 in 24 hrs
</label>

                {/* Figma-style Switch */}
                <FormControlLabel
                  control={<CustomSwitch />}
                  label="On"
                  className="text-yellow-400"
                />
              </div>
              {/* Suspicious Top-ups */}
              <span className="py-6">
                <strong className="py-6">Suspicious Top-ups :</strong>
              </span>
              <div className="flex justify-between">
                <label className="flex items-center gap-4 py-6">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-yellow-400"
                    name="cancelAbuse"
                  />
                  Freeze if same card used 3+ times in 1 day
                </label>

                {/* Figma-style Switch */}
                <FormControlLabel
                  control={<CustomSwitch />}
                  label="On"
                  className="text-yellow-400"
                />
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
                {frozenAccount.map((item, i) => (
                    <tr key={i} className="">
                      <td className="p-3">{item.username}</td>
                      <td className="p-3">{item.status}</td>
                      <td className="p-3">
                        {i % 2 === 0
                          ? "4 Cancels in 24h"
                          : "Reused Card ID across 2 accts"}
                      </td>
                      <td className="p-3">{item.reverifyneeded}</td>
                      <td className="p-3">
                        <button
                          className="bg-yellow-400 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-300"
                          onClick={() =>
                            console.log(`Unlock clicked for row ${i + 1}`)
                          }
                        >
                          Unlock
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        
      </div>
    </div>
  );
};

export default WalletFreezingRule;
