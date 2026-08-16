import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveBroadcast() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: "UAI Sports Admin", role: "admin", text: "Welcome to the Championship Finals! Stream starts in 10 mins.", time: "12:00 PM" },
    { id: 2, user: "Rohan V.", role: "student", text: "Let's go School of AI!!! 🔥", time: "12:05 PM" },
    { id: 3, user: "Ananya Patel", role: "student", text: "Is the audio working for anyone else?", time: "12:06 PM" },
    { id: 4, user: "UAI Sports Admin", role: "admin", text: "Audio will be unmuted once the players enter the court.", time: "12:07 PM" }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === 'SPORTS2026') {
      setUnlocked(true);
      setError('');
    } else {
      setError('Invalid Access Code');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      user: "You",
      role: "student",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  return (
    <Layout>
      <Head>
        <title>Live Broadcast | Universal AI University</title>
      </Head>

      <div className="min-h-screen bg-[#07090F] pt-24 pb-12">
        {/* Banner */}
        <div className="bg-[#D32F2F] text-white py-2 px-4 flex justify-center items-center gap-4 font-bold text-sm tracking-widest uppercase mb-8">
          <span className="animate-pulse">🔴 LIVE NOW</span>
          <span className="hidden md:inline">•</span>
          <span>Basketball Championship Finals 2026</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left: Video Player */}
            <div className="flex-grow flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
                <h1 className="font-headline-xl text-3xl font-extrabold text-white">LIVE SPORTS BROADCAST</h1>
              </div>

              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Simulated Video Background */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${unlocked ? 'opacity-100' : 'opacity-30 blur-md grayscale'}`}
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop')" }}
                ></div>

                {/* Locked Overlay */}
                <AnimatePresence>
                  {!unlocked && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                      <div className="bg-[#1A1C23] border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 text-center">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <span className="material-symbols-outlined text-white text-3xl">lock</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight mb-2">UNLOCK TODAY'S LIVE BROADCAST</h2>
                        <p className="text-white/60 text-sm mb-8">Verify you are a UAI student by following us on Instagram or entering the event access code.</p>
                        
                        <a 
                          href="https://instagram.com/uai_sports_club" 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-all mb-4"
                        >
                          FOLLOW OFFICIAL INSTAGRAM
                        </a>

                        <div className="flex items-center gap-4 my-6 text-white/30 text-xs font-bold uppercase tracking-widest">
                          <div className="h-px bg-white/10 flex-grow"></div>
                          OR
                          <div className="h-px bg-white/10 flex-grow"></div>
                        </div>

                        <form onSubmit={handleUnlock}>
                          <input 
                            type="text" 
                            placeholder="Enter Event Access Code" 
                            className="w-full bg-black/50 border border-white/10 text-white placeholder-white/30 text-center font-bold tracking-widest py-3 px-4 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all mb-4 uppercase"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                          />
                          {error && <p className="text-red-400 text-xs font-bold mb-4">{error}</p>}
                          <button 
                            type="submit" 
                            className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-black font-black py-3 px-4 rounded-xl transition-all uppercase tracking-wider"
                          >
                            Unlock Stream
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video UI Overlays (Only when unlocked) */}
                {unlocked && (
                  <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-6">
                    <div className="flex justify-between items-start">
                      <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-white font-bold text-sm">LIVE</span>
                        <span className="text-white/60 text-xs ml-2">1,204 watching</span>
                      </div>
                    </div>
                    {/* Fake play controls */}
                    <div className="bg-gradient-to-t from-black/80 to-transparent pt-12 pb-4 px-4 flex items-center gap-4 w-full">
                      <span className="material-symbols-outlined text-white cursor-pointer pointer-events-auto hover:text-primary">pause</span>
                      <span className="material-symbols-outlined text-white cursor-pointer pointer-events-auto hover:text-primary">volume_up</span>
                      <div className="flex-grow h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3"></div>
                      </div>
                      <span className="material-symbols-outlined text-white cursor-pointer pointer-events-auto hover:text-primary">fullscreen</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Event Info below player */}
              <div className="bg-[#1A1C23] border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Basketball Championship Finals 2026</h2>
                  <p className="text-white/50 text-sm">School of AI & Future Technologies vs School of Management</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">share</span> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Chat */}
            <div className="w-full lg:w-96 flex flex-col bg-[#1A1C23] border border-white/5 rounded-2xl overflow-hidden h-[600px] lg:h-auto">
              {/* Chat Header */}
              <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center shrink-0">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">forum</span> Live Chat
                </h3>
                <span className="text-xs text-white/40 font-bold tracking-widest uppercase">Popout</span>
              </div>

              {/* Pinned Message */}
              <div className="bg-blue-900/20 border-b border-blue-500/20 p-3 flex items-start gap-3 shrink-0">
                <span className="material-symbols-outlined text-blue-400 text-lg mt-0.5">push_pin</span>
                <p className="text-blue-100 text-xs leading-relaxed">
                  <span className="font-bold text-blue-400">Admin Pinned:</span> Please keep the chat respectful. Any use of inappropriate language will result in a ban from the platform. Go teams!
                </p>
              </div>

              {/* Messages Area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 flex flex-col">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`font-bold text-sm ${msg.role === 'admin' ? 'text-red-400' : 'text-white'}`}>
                        {msg.user}
                      </span>
                      {msg.role === 'admin' && (
                        <span className="bg-red-500/20 text-red-400 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">Admin</span>
                      )}
                      <span className="text-white/30 text-xs">{msg.time}</span>
                    </div>
                    <p className="text-white/80 text-sm">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-black/20 border-t border-white/10 shrink-0">
                {unlocked ? (
                  <form onSubmit={handleSendMessage} className="relative">
                    <input 
                      type="text" 
                      placeholder="Say something..." 
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-primary transition-colors"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors p-1"
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </form>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-center">
                    <p className="text-white/40 text-sm font-medium">Unlock stream to chat</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
