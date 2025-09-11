import React from "react";

const data = {
  image: "https://i.pravatar.cc/100?img=1",
  children: [
    {
      image: "https://i.pravatar.cc/100?img=2",
      children: [
        { image: "https://i.pravatar.cc/100?img=5" },
        { image: "https://i.pravatar.cc/100?img=6" },
      ],
    },
    {
      image: "https://i.pravatar.cc/100?img=3",
      children: [
        { image: "https://i.pravatar.cc/100?img=7" },
        { image: "https://i.pravatar.cc/100?img=8" },
        {
          image: "https://i.pravatar.cc/100?img=9",
          children: [
            { image: "https://i.pravatar.cc/100?img=13" },
            { image: "https://i.pravatar.cc/100?img=14" },
          ],
        },
      ],
    },
    {
      image: "https://i.pravatar.cc/100?img=4",
      children: [
        { image: "https://i.pravatar.cc/100?img=10" },
        { image: "https://i.pravatar.cc/100?img=11" },
        { image: "https://i.pravatar.cc/100?img=12" },
      ],
    },
  ],
};

const TreeNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Node image */}
      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-300 bg-yellow-300 z-10">
        <img src={node.image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Vertical line down from this node */}
      {node.children && <div className="h-6 w-0.5 bg-yellow-300" />}

      {/* Horizontal line and children */}
      {node.children && (
        <div className="flex justify-center items-start relative pt-6">
          {/* Horizontal line only as wide as children */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-fit flex justify-center">
            <div
              className="h-0.5 bg-yellow-300"
              style={{
                width: `${node.children.length * 90}px`, // adjust line width based on children
              }}
            />
          </div>

          {node.children.map((child, idx) => (
            <div key={idx} className="flex flex-col items-center relative mx-2">
              {/* Vertical line from horizontal to child node */}
              <div className="w-0.5 h-6 bg-white absolute top-0 left-1/2 transform -translate-x-1/2" />
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = () => {
  return (
    <div className="min-h-screen py-10 w-full overflow-x-auto">
      <h2 className="text-xl font-bold text-yellow-400 px-4 mb-10">
        Tree View Growth
      </h2>
      <div className="flex justify-center border border-yellow-300 w-full max-w-3xl  py-10 mx-auto">
        <TreeNode node={data} />
      </div>
    </div>
  );
};

export default TreeView;
