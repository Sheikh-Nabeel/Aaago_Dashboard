// CustomerMlmDdrTable.jsx
import React, { useState } from 'react';
import Level1Table from './Level1Table';
import Level2Table from './Level2Table';
import Level3Table from './Level3Table';
import Level4Table from './Level4Table';

const CustomerMlmDdrTable = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const renderLevelComponent = () => {
    switch (selectedLevel) {
      case 1: return <Level1Table />;
      case 2: return <Level2Table />;
      case 3: return <Level3Table />;
      case 4: return <Level4Table />;
      default: return null;
    }
  };

  return (
    <div className='w-[85%] mx-auto'>
      <h2 className="text-lg font-semibold m-6">DDR Balance: $1000</h2>

      {/* Level buttons */}
      <div className='flex gap-20 ml-6 my-3'>
        {[1, 2, 3, 4].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`p-2 rounded border border-yellow-300
              ${selectedLevel === level ? 'bg-yellow-400 text-black' : 'hover:bg-yellow-200'}`}
          >
            Level {level}
          </button>
        ))}
      </div>

      {/* Render selected level */}
      <div className=" w-[95%] mx-auto px-8 py-2 ">
        {renderLevelComponent()}
      </div>
    </div>
  );
};

export default CustomerMlmDdrTable;
