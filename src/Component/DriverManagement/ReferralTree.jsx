// ReferralTree.jsx
import React from 'react';
import { treeData } from './RefferalTreeData';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import DriverDetailnav from './DriverDetailnav';

const AvatarNode = ({ image }) => (
  <div className="flex flex-col items-center relative z-10">
    <img src={image} alt="" className="w-16 h-16 rounded-full border-4 border-yellow-400 shadow-lg bg-white" />
  </div>
);

const renderTree = (node) => {
  return (
    <div className="flex flex-col items-center relative ">
      {/* Avatar Node */}
      <AvatarNode image={node.image} />

      {/* If children exist, draw connectors and children */}
      {node.children && (
        <div className="relative flex flex-col items-center mt-">

          {/* Vertical line from parent to horizontal line */}
          <div className="h-8 w-0.5 bg-yellow-400"></div>

          {/* Horizontal line connecting all children */}
          <div className="flex justify-center items-start relative mt-0">

            {/* Absolute horizontal line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-yellow-400 z-0" />

            {node.children.map((child, index) => (
              <div className="flex flex-col items-center mx-4 relative" key={index}>
                
                {/* Vertical line from horizontal to child */}
                <div className="h-6 w-0.5 bg-yellow-400 z-0"></div>

                {/* Recursive render */}
                <div className="mt-">{renderTree(child)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};




const ReferralTree = () => {
  return (
    <>
        <DriverDetailnav/> 
    <div className="min-h-screen bg-[#013220] py-10 px-4  overflow-x-auto">
      <div className="flex justify-center">{renderTree(treeData)}</div>
    </div>
    </>
  );
};

export default ReferralTree;
