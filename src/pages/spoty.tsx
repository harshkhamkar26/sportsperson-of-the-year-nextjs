import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function SportsPersonOfTheYear() {
  return (
    <Layout title="Sports Person of the Year - Universal AI University">
      <main className="pt-12 pb-20">
        {/* Hero Section: Current Leader */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24 mt-8">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-label-caps text-label-caps text-rank-gold tracking-widest mb-4 uppercase">
              The Pursuit of Gold
            </h2>
            <h1 className="font-headline-xl text-headline-xl text-on-background uppercase text-shadow-glow shadow-rank-gold" style={{
              background: 'linear-gradient(to right, #D4AF37, #FFF5E1, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shine 5s linear infinite'
            }}>
              Person of the Year
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
              Recognizing exceptional athletic performance, academic achievement, and unwavering leadership across Universal AI University.
            </p>
          </div>

          <div className="relative bg-surface-container-low rounded-xl border border-white/5 overflow-hidden flex flex-col md:flex-row group shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            {/* Leader Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-rank-gold text-black px-4 py-2 rounded-full font-label-caps text-label-caps font-bold shadow-lg">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              Current Leader
            </div>
            
            {/* Image Side */}
            <div className="md:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden bg-surface-container-lowest">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
              <img 
                alt="Current Leader" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYnd9M_4J-HZKlQ6icq1WLN4ggtFqg-z8EzW0Pqtn9tG3k7PD8mNFl-HA0bjTR9X7oU-TaUuG-oXdBkkicwrHQVZ2Ch2j5cjnQvs2qoCauLD24pgGawA4O4gGXGJF2mm5d54QymsEEKcIepO44GbcQqW_0x0ZjVda6cxXJUK93YYhPLMQ7OVXNT_trLO5lWC3AC8tBSZZ2XgJOMMHXLZ2mTeMmw1HMNXt5_A8_0jwkcIPp3k4KDx0"
              />
            </div>
            
            {/* Content Side */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-surface-container-low/80 backdrop-blur-sm">
              <div className="mb-8">
                <h3 className="font-headline-xl text-headline-xl text-on-surface mb-2">Elena Rostova</h3>
                <div className="flex flex-wrap items-center gap-4 font-data-tabular text-data-tabular text-primary">
                  <span>Track & Field</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span>Senior</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span>Computer Science</span>
                </div>
              </div>
              
              {/* Key Stats Bento Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-surface p-4 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2">National Records</span>
                  <span className="font-headline-lg text-headline-lg text-rank-gold">3</span>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2">GPA</span>
                  <span className="font-headline-lg text-headline-lg text-on-surface">3.95</span>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Win Rate</span>
                  <span className="font-headline-lg text-headline-lg text-on-surface">94%</span>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Community Hrs</span>
                  <span className="font-headline-lg text-headline-lg text-on-surface">120</span>
                </div>
              </div>
              
              <Link href="/athlete/elena" className="bg-primary text-on-primary font-headline-md text-headline-md text-[16px] px-8 py-4 rounded-lg font-bold w-fit hover:bg-primary-fixed-dim transition-colors flex items-center gap-2">
                View Full Profile
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}} />
    </Layout>
  );
}
