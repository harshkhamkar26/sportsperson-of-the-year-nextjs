import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getRankings } from '@/lib/rankings';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import AnimatedCounter from '@/components/AnimatedCounter';
import Avatar from '@/components/Avatar';

export async function getStaticProps() {
  const rankings = await getRankings();
  const topAthlete = rankings[0] || null;
  return {
    props: { topAthlete },
    revalidate: 60,
  };
}

export default function SportsPersonOfTheYear({ topAthlete }: { topAthlete: any }) {
  if (!topAthlete) {
    return <Layout title="Sports Person of the Year - Universal AI University"><div className="text-center py-20 text-on-background">No data available</div></Layout>;
  }

  return (
    <Layout title="Sports Person of the Year - Universal AI University">
      <main className="pt-12 pb-20">
        {/* Hero Section: Current Leader */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24 mt-8">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-label-caps text-label-caps text-rank-gold tracking-widest mb-4 uppercase"
            >
              The Pursuit of Gold
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-headline-xl text-headline-xl text-on-background uppercase text-shadow-glow shadow-rank-gold" style={{
              background: 'linear-gradient(to right, #D4AF37, #FFF5E1, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shine 5s linear infinite'
            }}>
              Person of the Year
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl"
            >
              Recognizing exceptional athletic performance, academic achievement, and unwavering leadership across Universal AI University.
            </motion.p>
          </div>

          <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor="#FFFFFF" scale={1.01} transitionSpeed={2000} tiltMaxAngleX={3} tiltMaxAngleY={3}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative bg-surface-container-low rounded-xl border border-white/5 overflow-hidden flex flex-col md:flex-row group shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-shadow duration-500"
          >
            {/* Leader Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-rank-gold text-black px-4 py-2 rounded-full font-label-caps text-label-caps font-bold shadow-lg">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              Current Leader
            </div>
            
            {/* Image Side */}
            <div className="md:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden bg-surface-container-lowest">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10 pointer-events-none"></div>
              <Avatar 
                photoUrl={topAthlete.photoUrl} 
                name={topAthlete.name} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            
            {/* Content Side */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-surface-container-low/80 backdrop-blur-sm">
              <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 bg-rank-gold/10 text-rank-gold border border-rank-gold/30 px-5 py-2 rounded-full font-label-caps text-label-caps tracking-widest mb-8">
                <span className="material-symbols-outlined text-sm">social_leaderboard</span>
                CURRENT LEADER
              </div>
              
              <h1 className="font-headline-xl text-headline-xl sm:text-7xl font-black text-on-surface mb-4 tracking-tighter">
                {topAthlete.name}
              </h1>
              <h2 className="font-headline-md text-headline-md text-on-surface-variant max-w-2xl mx-auto mb-10">
                {topAthlete.className} &bull; ID: {topAthlete.rollNumber}
              </h2>
              
              <div className="flex flex-wrap justify-center gap-8 font-data-tabular text-data-tabular">
                <div className="bg-surface-container-lowest/80 backdrop-blur border border-outline-variant/20 px-8 py-6 rounded-2xl flex flex-col items-center">
                  <AnimatedCounter value={topAthlete.totalPoints} className="text-4xl font-bold text-rank-gold mb-1" />
                  <span className="font-label-caps text-label-caps text-on-surface-variant">TOTAL POINTS</span>
                </div>
                
                <div className="bg-surface-container-lowest/80 backdrop-blur border border-outline-variant/20 px-8 py-6 rounded-2xl flex flex-col items-center">
                  <AnimatedCounter value={topAthlete.medals?.gold || 0} className="text-4xl font-bold text-on-surface mb-1" />
                  <span className="font-label-caps text-label-caps text-on-surface-variant">GOLD MEDALS</span>
                </div>
                
                <div className="bg-surface-container-lowest/80 backdrop-blur border border-outline-variant/20 px-8 py-6 rounded-2xl flex flex-col items-center">
                  <AnimatedCounter value={topAthlete.eventsCount} className="text-4xl font-bold text-on-surface mb-1" />
                  <span className="font-label-caps text-label-caps text-on-surface-variant">EVENTS</span>
                </div>
              </div>
            </div>
              
              <Link href={`/athlete/${topAthlete.slug || topAthlete.id}`} className="bg-primary text-on-primary font-headline-md text-headline-md text-[16px] px-8 py-4 rounded-lg font-bold w-fit hover:bg-primary-fixed-dim transition-colors flex items-center gap-2">
                View Full Profile
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
          </Tilt>
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
