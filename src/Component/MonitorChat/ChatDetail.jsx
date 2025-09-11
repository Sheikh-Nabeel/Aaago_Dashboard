import React, { useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import Sidebar from '../Home/Sidebar';
import { Link } from 'react-router-dom';
import { LuMessageSquareText } from "react-icons/lu";

const ChatDetail = () => {
  const [menu, setMenue] = useState('chat');
  const [inputText, setInputText] = useState('');
const [submenu, setSubmenu] = useState('allchats')
  const messages = [
    {
      sender: 'Smith Joy',
      time: '10:45 AM',
      text: 'Lorem ipsum dolor sit amet consectetur. Volutpatte enim duis orci tortor amet lorem quam tellus.',
      avatar: 'https://i.pravatar.cc/40?img=1',
    },
    {
      sender: 'You',
      time: '11:15 AM',
      text: 'Lorem dolor sit amet consectetur. Volutpatte enim duis orci tortor amet lorem quam tellus.',
      avatar: 'https://i.pravatar.cc/40?img=2',
    },
  ];

  const chatList = Array(9).fill({
    name: 'Smith Joy',
    time: '10:45 AM',
    text: 'Lorem ipsum dolor sit amet consectetur. Volutpatte enim duis orci tortor amet lorem quam tellus.',
    avatar: 'https://i.pravatar.cc/40?img=1',
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div >

      {/* Chat Section */}
      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        {/* Back Button */}
        <div className="flex items-center gap-2 py-4">
          <Link to="/" className='flex items-center gap-2'>
            <TiArrowBackOutline size={30} className="cursor-pointer text-lg" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
        </div>

        {/* Menu Tabs */}
        <div className='flex gap-2 pb-6'>
          <button onClick={() => setMenue("chat")} className={`menu-tab ${menu === "chat" ? 'active' : ""}`}>
            Chat
          </button>
          <button onClick={() => setMenue("explore")} className={`menu-tab ${menu === "explore" ? 'active' : ""}`}>
            Explore
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex flex-1 gap-3 overflow-hidden">
          {/* Chat List */}
          <div className="w-[40%] bg-yellow-400  rounded-xl text-[#1c350d] p-4 space-y-2 overflow-y-auto ">
          <div className='flex justify-between'>
            <h3 onClick={()=> setSubmenu('allchats')} className={` text-bold mb-2 menu-tab ${submenu == 'allchats' ? 'linebelow' : " "}`}>All Chats</h3>
            <h3 onClick={()=> setSubmenu('resolution')} className={` text-bold mb-2 menu-tab ${submenu == 'resolution' ? 'linebelow' : " "}`}>Resolution Channel</h3>
            <h3 onClick={()=> setSubmenu('assigned')} className={` text-bold mb-2 menu-tab ${submenu == 'assigned' ? 'linebelow' : " "}`}>Assigned Agent</h3>

          </div>
            {chatList.map((chat, index) => (
              <div key={index} className="p-2 rounded-lg  hover:bg-yellow-200 transition">
                <div className="text-right text-xs text-gray-800">{chat.time}</div>

                <div className="flex items-center space-x-2">
                  <img src={chat.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{chat.name}</p>
                    <div className='flex gap-12'>
                    <p className="text-xs">{chat.text.slice(0, 40)}...</p>
<LuMessageSquareText size={20}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Board */}
          <div className="flex-1 flex flex-col justify-between p-4 space-y-4 shadow-sm shadow-black/70 rounded-xl border-t border-b border-black">
            {/* Messages */}
            <div className="space-y-4 overflow-y-auto pr-2 rounded-xl  px-2 py-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.sender === 'You' ? 'bg-gray-800 text-white' : 'bg-yellow-400 text-black'} p-3 rounded-xl max-w-sm shadow-md`}>
                    <div className="flex items-center justify-between">
                      <img src={msg.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                      <p className="text-xs text-right mt-1">{msg.time}</p>
                      {/* <p className="font-semibold">{msg.sender}</p> */}
                    </div>
                    <p className="text-sm mt-2">{msg.text}</p>
                    
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box with Voice Icon */}
            <div className="flex items-center gap-3  ">
              {/* Voice Icon (no functionality) */}
              <button className="hover:text-yellow-600">
                <FaMicrophone size={25} />
              </button>

              {/* Input Field */}
              <div className='border w-full border-yellow-400 rounded-full px-4 py-2 text-yellow-400 shadow-md'>

              <input
                type="text"
                placeholder="Type here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none placeholder-yellow-400 text-yellow-400"
              />
              </div>

              {/* Send Icon */}
              <button className="hover:text-yellow-600">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
