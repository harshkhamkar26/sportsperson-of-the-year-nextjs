import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getRankings } from '@/lib/rankings';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import AnimatedCounter from '@/components/AnimatedCounter';
import Avatar from '@/components/Avatar';

export async function getStaticProps() {
  const rankings = await getRankings();
  const top3 = rankings.slice(0, 3);
  
  return {
    props: {
      top3,
    },
    revalidate: 60, // revalidate every 60 seconds
  };
}

export default function Home({ top3 }: { top3: any[] }) {
  const rank1 = top3[0] || null;
  const rank2 = top3[1] || null;
  const rank3 = top3[2] || null;
  return (
    <Layout title="Universal AI University Athletics">
      <div className="pt-8 pb-20 md:pb-32 max-w-container-max mx-auto space-y-20 md:space-y-32">
        {/* Hero Section: Person of the Year */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden bg-[#162A45] border border-outline-variant/30 flex flex-col md:flex-row shadow-[4px_4px_0px_0px_#3B82F6]"
        >
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center z-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#162A45] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-rank-gold text-black px-4 py-1.5 rounded-full font-data-tabular text-data-tabular mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Rank #1
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2 leading-tight">SPORTS PERSON OF THE YEAR</h1>
              {rank1 ? (
                <>
                  <h2 className="font-headline-md text-headline-md text-primary mb-4">{rank1.name}</h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-md">{rank1.className}</p>
                  
                  <div className="flex items-center gap-6 mb-8 font-data-tabular text-data-tabular text-on-surface">
                    <div className="flex flex-col">
                      <AnimatedCounter value={rank1.totalPoints} className="text-3xl font-bold text-rank-gold" />
                      <span className="text-sm text-on-surface-variant uppercase tracking-widest">Points</span>
                    </div>
                    <div className="h-12 w-px bg-outline-variant/50"></div>
                    <div className="flex flex-col">
                      <AnimatedCounter value={rank1.medals?.gold || 0} className="text-xl font-bold text-on-surface" />
                      <span className="text-sm text-on-surface-variant uppercase tracking-widest">Gold</span>
                    </div>
                    <div className="flex flex-col">
                      <AnimatedCounter value={rank1.medals?.silver || 0} className="text-xl font-bold text-on-surface" />
                      <span className="text-sm text-on-surface-variant uppercase tracking-widest">Silver</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8">
                  <h2 className="font-headline-md text-headline-md text-primary mb-4">No data available</h2>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                <Link href="/leaderboard" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-headline-md text-body-md font-bold py-3 px-6 rounded-lg transition-colors inline-block">
                  View Leaderboard
                </Link>
                <Link href="/sports" className="border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 font-headline-md text-body-md font-bold py-3 px-6 rounded-lg transition-colors inline-block">
                  Explore Athletes
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 h-96 md:h-auto relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop')" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#162A45] via-transparent to-transparent md:bg-gradient-to-l opacity-80 pointer-events-none"></div>
          </div>
        </motion.section>

        {/* Section 2: Top 3 Podium */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">The Podium</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end h-auto md:h-[500px]">
            {/* Rank #2 */}
            {rank2 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="order-2 md:order-1 h-auto"
              >
                <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="#C0C0C0" scale={1.02} transitionSpeed={1500} className="relative group h-[400px] bg-[#162A45] rounded-lg border border-outline-variant/30 overflow-hidden shadow-lg hover:border-[#3B82F6]/50 flex flex-col justify-end">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <Avatar photoUrl={rank2.photoUrl} name={rank2.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>
                  <div className="relative z-10 p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-rank-silver flex items-center justify-center text-rank-silver font-data-tabular text-data-tabular font-bold mb-3 shadow-[0_0_10px_rgba(192,192,192,0.3)]">2</div>
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-1">{rank2.name}</h4>
                    <p className="font-data-tabular text-data-tabular text-rank-silver mb-2"><AnimatedCounter value={rank2.totalPoints} /> PTS</p>
                    <div className="flex gap-2">
                      {Array.from({ length: rank2.medals?.gold || 0 }).map((_, i) => (
                        <span key={`g-${i}`} className="material-symbols-outlined text-rank-gold text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      ))}
                      {Array.from({ length: rank2.medals?.silver || 0 }).map((_, i) => (
                        <span key={`s-${i}`} className="material-symbols-outlined text-rank-silver text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      ))}
                      {Array.from({ length: rank2.medals?.bronze || 0 }).map((_, i) => (
                        <span key={`b-${i}`} className="material-symbols-outlined text-rank-bronze text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ) : <div className="order-2 md:order-1"></div>}
            
            {/* Rank #1 */}
            {rank1 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                className="order-1 md:order-2 md:-translate-y-4"
              >
                <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#D4AF37" scale={1.03} transitionSpeed={1500} className="relative group h-[480px] bg-[#162A45] rounded-lg border border-rank-gold/50 overflow-hidden shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.5)] flex flex-col justify-end">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <Avatar photoUrl={rank1.photoUrl} name={rank1.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/70 to-transparent"></div>
                  <div className="relative z-10 p-6 flex flex-col items-center text-center">
                    <div className="bg-rank-gold text-black px-4 py-1.5 rounded-full font-data-tabular text-data-tabular font-bold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]">RANK 1</div>
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-1 text-2xl">{rank1.name}</h4>
                    <p className="font-data-tabular text-data-tabular text-rank-gold text-xl font-bold mb-3"><AnimatedCounter value={rank1.totalPoints} /> PTS</p>
                    <div className="flex gap-2 mb-2">
                      {Array.from({ length: rank1.medals?.gold || 0 }).map((_, i) => (
                        <span key={`g-${i}`} className="material-symbols-outlined text-rank-gold" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                      ))}
                      {Array.from({ length: rank1.medals?.silver || 0 }).map((_, i) => (
                        <span key={`s-${i}`} className="material-symbols-outlined text-rank-silver" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                      ))}
                      {Array.from({ length: rank1.medals?.bronze || 0 }).map((_, i) => (
                        <span key={`b-${i}`} className="material-symbols-outlined text-rank-bronze" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ) : <div className="order-1 md:order-2"></div>}

            {/* Rank #3 */}
            {rank3 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="order-3 h-auto"
              >
                <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="#CD7F32" scale={1.02} transitionSpeed={1500} className="relative group h-[360px] bg-[#162A45] rounded-lg border border-outline-variant/30 overflow-hidden shadow-lg hover:border-[#3B82F6]/50 flex flex-col justify-end">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <Avatar photoUrl={rank3.photoUrl} name={rank3.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>
                  <div className="relative z-10 p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-rank-bronze flex items-center justify-center text-rank-bronze font-data-tabular text-data-tabular font-bold mb-3 shadow-[0_0_10px_rgba(205,127,50,0.3)]">3</div>
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-1">{rank3.name}</h4>
                    <p className="font-data-tabular text-data-tabular text-rank-bronze mb-2"><AnimatedCounter value={rank3.totalPoints} /> PTS</p>
                    <div className="flex gap-2">
                      {Array.from({ length: rank3.medals?.gold || 0 }).map((_, i) => (
                        <span key={`g-${i}`} className="material-symbols-outlined text-rank-gold text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                      ))}
                      {Array.from({ length: rank3.medals?.silver || 0 }).map((_, i) => (
                        <span key={`s-${i}`} className="material-symbols-outlined text-rank-silver text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                      ))}
                      {Array.from({ length: rank3.medals?.bronze || 0 }).map((_, i) => (
                        <span key={`b-${i}`} className="material-symbols-outlined text-rank-bronze text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ) : <div className="order-3"></div>}
          </div>
        </section>

        {/* Section 3: Recent Highlights Grid */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">Recent Highlights</h3>
            <Link href="/events" className="text-primary hover:text-primary-fixed transition-colors font-label-caps text-label-caps flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Highlight Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-label-caps text-label-caps text-primary bg-primary/10 px-2 py-1 rounded">100m Sprint</span>
                  <span className="text-xs font-data-tabular text-data-tabular text-on-surface-variant">Oct 24</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-base text-on-surface mb-1">Aisha Khan takes Gold</h4>
                <p className="font-body-md text-body-md text-sm text-on-surface-variant">New university record set at 11.2s</p>
              </div>
            </motion.div>
            
            {/* Highlight Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-label-caps text-label-caps text-primary bg-primary/10 px-2 py-1 rounded">Tennis Men's Singles</span>
                  <span className="text-xs font-data-tabular text-data-tabular text-on-surface-variant">Oct 22</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-base text-on-surface mb-1">Khamkar Dominates Finals</h4>
                <p className="font-body-md text-body-md text-sm text-on-surface-variant">Straight sets victory (6-2, 6-1)</p>
              </div>
            </motion.div>
            
            {/* Highlight Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-label-caps text-label-caps text-primary bg-primary/10 px-2 py-1 rounded">Swimming 200m</span>
                  <span className="text-xs font-data-tabular text-data-tabular text-on-surface-variant">Oct 20</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-base text-on-surface mb-1">Patel Secures Bronze</h4>
                <p className="font-body-md text-body-md text-sm text-on-surface-variant">Crucial points added to overall standing</p>
              </div>
            </motion.div>
            
            {/* Highlight Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-label-caps text-label-caps text-primary bg-primary/10 px-2 py-1 rounded">Soccer Finals</span>
                  <span className="text-xs font-data-tabular text-data-tabular text-on-surface-variant">Oct 18</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-base text-on-surface mb-1">School of AI Wins</h4>
                <p className="font-body-md text-body-md text-sm text-on-surface-variant">Late penalty seals the championship</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
