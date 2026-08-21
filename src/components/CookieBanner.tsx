import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const consent = localStorage.getItem('uai_cookie_consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('uai_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('uai_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[9999] bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#D4AF37]/10 p-2 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-[#D4AF37] text-xl">cookie</span>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-widest text-white mb-1">We use cookies</h4>
              <p className="font-sans text-xs text-white/60 mb-4 leading-relaxed">
                This website uses cookies to enhance your experience and analyze site traffic. Read our <Link href="/privacy" className="text-[#D4AF37] hover:underline">Privacy Policy</Link>.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={acceptCookies}
                  className="flex-1 bg-[#D4AF37] text-black font-bold font-sans text-xs uppercase tracking-widest py-2 rounded-lg hover:bg-white transition-colors"
                >
                  Accept
                </button>
                <button 
                  onClick={declineCookies}
                  className="flex-1 bg-transparent border border-white/20 text-white font-bold font-sans text-xs uppercase tracking-widest py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
