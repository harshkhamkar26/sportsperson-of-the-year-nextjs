import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CinematicBackground from '@/components/cinema/CinematicBackground';
import Reveal from '@/components/cinema/Reveal';

export default function Custom404() {
  return (
    <Layout 
      title="404 - Page Not Found | Universal AI University"
      description="The page you are looking for does not exist on the SPOTY platform."
    >
      <CinematicBackground tone="arena" />
      
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-5">
        <Reveal className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="material-symbols-outlined text-5xl text-white/50">sports_score</span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-black uppercase text-white tracking-tight drop-shadow-2xl mb-4">
            404
          </h1>
          
          <p className="font-sans text-xl text-white/70 mb-10 max-w-md mx-auto">
            Out of bounds! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-sans text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Return to Homepage
          </Link>
        </Reveal>
      </div>
    </Layout>
  );
}
