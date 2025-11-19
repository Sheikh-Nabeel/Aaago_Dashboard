import React, { useState, useEffect } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import Sidebar from '../Home/Sidebar';
import { Link } from 'react-router-dom';
import { LuMessageSquareText } from "react-icons/lu";
import axiosInstance from '../../services/axiosConfig';
import toast from 'react-hot-toast';

const ChatDetail = () => {
  const [menu, setMenue] = useState('chat');
  const [inputText, setInputText] = useState('');
const [submenu, setSubmenu] = useState('allchats')
  const [showKeywords, setShowKeywords] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [newWordsText, setNewWordsText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [activeChatMessages, setActiveChatMessages] = useState(null);
  const [activeChatBookingId, setActiveChatBookingId] = useState(null);
  const [sending, setSending] = useState(false);
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

  const fetchKeywords = async () => {
    setKeywordsLoading(true);
    try {
      const res = await axiosInstance.get('/admin/users/dashboard/keywords');
      if (res.data?.success) {
        setKeywords(res.data.data?.keywords || []);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setKeywordsLoading(false);
    }
  };

  const openKeywords = async () => {
    setShowKeywords(true);
    await fetchKeywords();
  };

  const saveKeywords = async () => {
    const words = newWordsText
      .split(',')
      .map(w => w.trim())
      .filter(Boolean);
    if (words.length === 0) {
      toast.error('Enter at least one word');
      return;
    }
    try {
      const res = await axiosInstance.post('/admin/users/dashboard/keywords', { words });
      if (res.data?.success) {
        toast.success(res.data.message || 'Keywords updated');
        setNewWordsText('');
        const refresh = await axiosInstance.get('/admin/users/dashboard/keywords');
        if (refresh.data?.success) {
          setKeywords(refresh.data.data?.keywords || []);
        }
      } else {
        toast.error(res.data?.message || 'Failed to update keywords');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  const searchChats = async () => {
    const q = searchQuery.trim();
    if (!q) {
      toast.error('Enter keywords to search');
      return;
    }
    setSearchLoading(true);
    try {
      const res = await axiosInstance.get('/admin/users/dashboard/keywords/search-chats', { params: { words: q } });
      if (res.data?.success) {
        setSearchResults(res.data.data || null);
      } else {
        toast.error(res.data?.message || 'Search failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = inputText.trim();
    if (!activeChatBookingId) {
      toast.error('Select a chat first');
      return;
    }
    if (!text) {
      toast.error('Type a message');
      return;
    }
    setSending(true);
    try {
      const res = await axiosInstance.post('/admin/users/dashboard/chats/send-message', {
        bookingId: activeChatBookingId,
        message: text,
      });
      if (res.data?.success) {
        const d = res.data?.data || {};
        const newMsg = d?.message || {
          id: d?.id || `local-${Date.now()}`,
          sender: { role: 'superadmin' },
          message: text,
          timestamp: new Date().toISOString(),
        };
        setActiveChatMessages((prev) => ([...(prev || []), newMsg]));
        setInputText('');
      } else {
        toast.error(res.data?.message || 'Failed to send');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div >

      {/* Chat Section */}
      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        {/* Top Search */}
        <div className="flex justify-center pb-3">
          <div className="flex items-center gap-2 border border-yellow-400 rounded-full px-4 py-2 w-full max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') searchChats(); }}
              placeholder="Search here"
              className="flex-1 bg-transparent text-yellow-400 placeholder-yellow-400 focus:outline-none"
            />
            <button
              onClick={searchChats}
              disabled={searchLoading}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
              aria-label="Search"
            >
              <FaPaperPlane size={18} />
            </button>
          </div>
        </div>
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
          <div className='flex-1' />
          <button onClick={openKeywords} className="px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500">
            Keywords
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
            {searchResults?.items?.length ? (
              searchResults.items.map((item) => {
                const firstMsg = (item.messages || [])[0];
                const time = firstMsg ? new Date(firstMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const preview = firstMsg?.message || '';
                const avatar = firstMsg?.sender?.avatar ? `${import.meta.env?.VITE_IMAGE_BASE_URL || 'http://localhost:3001'}/${firstMsg.sender.avatar}` : 'https://via.placeholder.com/40';
                const title = `Booking ${item.bookingId}`;
                return (
                  <div
                    key={item.bookingId}
                    className="p-2 rounded-lg hover:bg-yellow-200 transition cursor-pointer"
                    onClick={() => {
                      setActiveChatMessages(item.messages || []);
                      setActiveChatBookingId(item.bookingId);
                    }}
                  >
                    <div className="text-right text-xs text-gray-800">{time}</div>
                    <div className="flex items-center space-x-2">
                      <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-semibold text-sm">{title}</p>
                        <div className='flex gap-12'>
                          <p className="text-xs">{preview.slice(0, 40)}...</p>
                          <LuMessageSquareText size={20}/>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-sm">Search to view chats</div>
            )}
          </div>

          {/* Chat Board */}
          <div className="flex-1 flex flex-col justify-between p-4 space-y-4 shadow-sm shadow-black/70 rounded-xl border-t border-b border-black">
            
            {activeChatBookingId && (
              <div className="text-xs text-yellow-400">Showing chat for Booking {activeChatBookingId}</div>
            )}
            <div className="space-y-4 overflow-y-auto pr-2 rounded-xl  px-2 py-4">
              {activeChatMessages?.length ? (
              activeChatMessages.map((msg, i) => {
                const isApiMsg = !!msg.timestamp;
                const isSelf = isApiMsg ? (msg.sender?.role === 'superadmin') : (msg.sender === 'You');
                const bubbleClass = isSelf ? 'bg-gray-800 text-white' : 'bg-yellow-400 text-black';
                const avatarSrc = isApiMsg
                  ? (msg.sender?.avatar ? `${import.meta.env?.VITE_IMAGE_BASE_URL || 'http://localhost:3001'}/${msg.sender.avatar}` : 'https://via.placeholder.com/32')
                  : msg.avatar;
                const timeStr = isApiMsg ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : msg.time;
                const textStr = isApiMsg ? msg.message : msg.text;
                return (
                  <div key={isApiMsg ? msg.id : i} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${bubbleClass} p-3 rounded-xl max-w-sm shadow-md`}>
                      <div className="flex items-center justify-between">
                        <img src={avatarSrc} alt="avatar" className="w-6 h-6 rounded-full" />
                        <p className="text-xs text-right mt-1">{timeStr}</p>
                      </div>
                      <p className="text-sm mt-2">{textStr}</p>
                    </div>
                  </div>
                );
              })
              ) : (
                <div className="flex items-center justify-center h-48">
                  <div className="text-sm text-yellow-400">Search and select a chat to view messages</div>
                </div>
              )}
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
              <button className="hover:text-yellow-600" onClick={sendMessage} disabled={sending} aria-label="Send">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
        </div>
      {showKeywords && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg outline outline-black/20 shadow-black/80 p-6 w-full max-w-md text-yellow-400">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Dashboard Keywords</h3>
              <button onClick={() => setShowKeywords(false)} className="text-yellow-400 hover:text-yellow-300">✕</button>
            </div>
            <div className="mb-4 min-h-16">
              {keywordsLoading ? (
                <div className="text-sm">Loading...</div>
              ) : keywords.length === 0 ? (
                <div className="text-sm">No keywords found</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((k, i) => (
                    <span key={`${k}-${i}`} className="px-2 py-1 rounded-full bg-yellow-400 text-black text-xs">{k}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm">Add keywords (comma-separated)</label>
              <input
                type="text"
                value={newWordsText}
                onChange={(e) => setNewWordsText(e.target.value)}
                placeholder="e.g., delay,payment,urgent"
                className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowKeywords(false)} className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700">Close</button>
              <button onClick={saveKeywords} className="px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500">Save</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ChatDetail;
