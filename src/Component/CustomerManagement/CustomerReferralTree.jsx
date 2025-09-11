import React from "react";
import CustomerDetailnav from "./CustomerDetailnav";
import DateRange from "../DriverManagement/DateRange";

const referralData = {
  image: "https://i.pravatar.cc/100?img=1",
  children: [
    {
      image: "https://i.pravatar.cc/100?img=2",
      children: [
        { image: "https://i.pravatar.cc/100?img=3" },
        { image: "https://i.pravatar.cc/100?img=6" },
        { image: "https://i.pravatar.cc/100?img=6" },
      ],
    },
    {
      image: "https://i.pravatar.cc/100?img=7",
      children: [
        { image: "https://i.pravatar.cc/100?img=8" },
        {
          image: "https://i.pravatar.cc/100?img=9",
          children: [
            { image: "https://i.pravatar.cc/100?img=9" },
            {
              image: "https://i.pravatar.cc/100?img=9",
              children: [
                { image: "https://i.pravatar.cc/100?img=9" },
                { image: "https://i.pravatar.cc/100?img=9" },
                { image: "https://i.pravatar.cc/100?img=9" },
              ],
            },
            { image: "https://i.pravatar.cc/100?img=9" },
          ],
        },
        { image: "https://i.pravatar.cc/100?img=9" },
      ],
    },
    {
      image: "https://i.pravatar.cc/100?img=9",
      children: [
        { image: "https://i.pravatar.cc/100?img=9" },
        { image: "https://i.pravatar.cc/100?img=9" },
        { image: "https://i.pravatar.cc/100?img=9" },
      ],
    },
  ],
};

const TreeNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Profile */}
      <div className="relative flex flex-col items-center">
        <img
          src={node.image}
          alt="profile"
          className="w-20 h-20 rounded-full border-4 border-yellow-500 object-cover z-10"
        />
        {node.children && node.children.length > 0 && (
          <div className="w-0.5 bg-yellow-500 h-6"></div>
        )}
      </div>

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <div className="relative flex justify-center mt-3">
          {/* Horizontal connector */}
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="bg-yellow-500 w-full h-0.5"></div>
          </div>

          {/* Child nodes */}
          <div className="flex gap-16 pt-2">
            {node.children.map((child, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Vertical line above child */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 bg-yellow-500 h-2"></div>
                <TreeNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CustomerReferralTree() {
  return (
    <>
      <CustomerDetailnav />
      <div>      
     <div className="flex items-center gap-2 justify-end">
      <div className="flex items-center pt-2 ">
           <label className="flex items-center space-x-2">
             <div className="text-sm flex items-center gap-1"><span>Date Range:</span></div>
             <input
               type="date"
               className="bg-transparent rounded border py-1  border-yellow-300  text-yellow-300 focus:outline-none text-sm"
             />
           </label>
 
           <span className="text-sm pr-3">To</span>
 
           <label className="flex items-center space-x-2">
             <div className="text-sm flex items-center gap-1"> <span>Date:</span></div>
             <input
               type="date"
               className="bg-transparent rounded py-1  border border-yellow-300 text-yellow-300 focus:outline-none text-sm"
             />
           </label>
</div>
           <div className="pr-4  text-sm">
          <label htmlFor="">Sort By: </label>
            <select name="" id="" className="bg-transparent focus:outline-none">
              <option value="">Name</option>
            </select>
         </div>
         </div>
         
         </div>
      <div className=" min-h-screen pt-10 flex justify-center items-start w-full max-w-5xl mx-auto">
        <div className="relative flex flex-col items-center ">
          <TreeNode node={referralData} />
        </div>
      </div>
    </>
  );
}
