import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CinematicBackground from '@/components/cinema/CinematicBackground';
import Reveal from '@/components/cinema/Reveal';

export default function ThankYou() {
  return (
    <Layout title="Thank You | Universal AI University Sports">
      <CinematicBackground tone="arena" />
      
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-5">
        <Reveal className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-8">
            <span className="material-symbols-outlined text-5xl text-[#D4AF37]">check_circle</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-2xl mb-4">
            Thank You
          </h1>
          
          <p className="font-sans text-xl text-white/70 mb-10 max-w-md mx-auto">
            Your submission has been received. Our team will review it and get back to you shortly.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-sans text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            Return Home
          </Link>
        </Reveal>
      </div>
    </Layout>
  );
}
