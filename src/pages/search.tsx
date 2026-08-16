import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('Basketball');

  return (
    <Layout title="Global Search - Universal AI University Athletics">
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-[80px]">
        {/* Search Header Section */}
        <section className="mb-12 flex flex-col gap-6">
          <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface">
            Global Search
          </h1>
          
          {/* Large Prominent Search Bar (Active State) */}
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary" data-icon="search">search</span>
            </div>
            <input 
              className="block w-full pl-12 pr-4 py-4 bg-surface-container-low border-2 border-primary rounded-lg font-body-lg text-body-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-0 focus:border-primary shadow-[0_0_15px_rgba(173,198,255,0.15)] transition-shadow" 
              placeholder="Search athletes, sports, events..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button aria-label="Clear search" className="text-on-surface-variant hover:text-on-surface" onClick={() => setSearchQuery('')}>
                <span className="material-symbols-outlined" data-icon="close">close</span>
              </button>
            </div>
          </div>
          
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Showing top results for <span className="text-on-surface font-semibold">"{searchQuery}"</span>
          </p>
        </section>

        {/* Results Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Athletes & Events */}
          <div className="md:col-span-8 flex flex-col gap-10">
            
            {/* ATHLETES SECTION */}
            <section>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <h2 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" data-icon="directions_run">directions_run</span>
                  ATHLETES
                </h2>
                <Link href="/sports" className="font-body-md text-body-md text-primary hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                {/* Athlete Card 1 */}
                <Link href="/athlete/1" className="relative bg-surface-container rounded-lg overflow-hidden hover-card-lift border border-outline-variant/30 flex flex-col h-[320px] cursor-pointer group hover:border-primary/50 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-rank-gold text-background font-data-tabular text-data-tabular px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(212,175,55,0.5)] border border-outline-variant/20">
                      <span className="material-symbols-outlined text-sm" data-icon="workspace_premium" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span> 1st
                    </div>
                  </div>
                  <div className="h-2/3 w-full relative">
                    <div className="bg-cover bg-center w-full h-full absolute inset-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCm_dJVsdDW76PtiUU6PXoSkxxE2OpXBCxjh4GiZqBzAZGQPUE8iGN7u3bBXQUS_MKoVaXAOQ_GoSBPHRoDWpyGhqhJLetdvZ154_aT2z5iNqNPvSjANjCP-iZTAOAnamy8WCNrDtSlWlN-_bxLjY0YYutQc56_dr5532KTo8_vHrNdpyh6ZhqoVYv8oQuZMCgMmJ7MvFPP_CF2Xu2HCwdbHfQsFF-_A02a1dztZQyDuFj0ktb4vgU')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
                  </div>
                  <div className="p-4 z-10 flex flex-col justify-end h-full mt-auto">
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Marcus "The Flash" Johnson</h3>
                    <p className="font-body-md text-body-md text-primary mt-1">Men's Basketball • Point Guard</p>
                    <div className="flex gap-4 mt-3 pt-3 border-t border-outline-variant/20">
                      <div>
                        <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">PPG</div>
                        <div className="font-data-tabular text-data-tabular text-on-surface">24.5</div>
                      </div>
                      <div>
                        <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">AST</div>
                        <div className="font-data-tabular text-data-tabular text-on-surface">8.2</div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Athlete Card 2 */}
                <Link href="/athlete/2" className="relative bg-surface-container rounded-lg overflow-hidden hover-card-lift border border-outline-variant/30 flex flex-col h-[320px] cursor-pointer group hover:border-primary/50 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-surface-container-high border border-inverse-primary text-on-surface font-data-tabular text-data-tabular px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      #12
                    </div>
                  </div>
                  <div className="h-2/3 w-full relative">
                    <div className="bg-cover bg-center w-full h-full absolute inset-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbsKOiI4EcuKpo983lJi2J9O5rD08LeMbx4muARHSSemFmWghHgwvMN3N0e1pOG-0jbohPN13D05mX0JxHAc_Dc_qP588yT7qeyrVwQ8xzhwCtkLsbZ_9cC6FaAYF-ngOSehrTwx44HbFHcIWArLzNhTBjvGi_-1wGslJqA3yatar1_jLhlSTe5cbkchxX68ALrGuznH_EeYaS8NPw3Jj-tvQZJcZlprfgdp84fryBl5Fi0fFadSo')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
                  </div>
                  <div className="p-4 z-10 flex flex-col justify-end h-full mt-auto">
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Sarah Jenkins</h3>
                    <p className="font-body-md text-body-md text-primary mt-1">Women's Basketball • Shooting Guard</p>
                    <div className="flex gap-4 mt-3 pt-3 border-t border-outline-variant/20">
                      <div>
                        <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">PPG</div>
                        <div className="font-data-tabular text-data-tabular text-on-surface">18.9</div>
                      </div>
                      <div>
                        <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">3PT%</div>
                        <div className="font-data-tabular text-data-tabular text-on-surface">42%</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* EVENTS SECTION */}
            <section>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <h2 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" data-icon="event">event</span>
                  RECENT EVENTS
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {/* Event Row 1 */}
                <Link href="/events/1" className="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-surface-container-high transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="bg-surface-container-lowest p-3 rounded flex flex-col items-center justify-center min-w-[60px] border border-outline-variant/10">
                      <span className="font-label-caps text-xs text-primary">OCT</span>
                      <span className="font-headline-md text-headline-md text-on-surface leading-none">24</span>
                    </div>
                    <div>
                      <h3 className="font-body-lg text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">UAIU vs. State College</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">Men's Basketball Championship Final</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 sm:pl-4 sm:border-l border-outline-variant/20 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="text-center">
                      <div className="font-label-caps text-[10px] text-success uppercase">WIN</div>
                      <div className="font-data-tabular text-data-tabular text-on-surface font-bold text-xl">84 - 76</div>
                    </div>
                    <button className="bg-transparent border-2 border-inverse-primary text-inverse-primary font-label-caps text-xs px-3 py-1 rounded hover:bg-inverse-primary hover:text-white transition-colors">
                      Recap
                    </button>
                  </div>
                </Link>

                {/* Event Row 2 */}
                <Link href="/events/2" className="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-surface-container-high transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="bg-surface-container-lowest p-3 rounded flex flex-col items-center justify-center min-w-[60px] border border-outline-variant/10">
                      <span className="font-label-caps text-xs text-primary">NOV</span>
                      <span className="font-headline-md text-headline-md text-on-surface leading-none">02</span>
                    </div>
                    <div>
                      <h3 className="font-body-lg text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">UAIU vs. Tech University</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">Women's Basketball Semi-Finals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 sm:pl-4 sm:border-l border-outline-variant/20 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="text-center">
                      <div className="font-label-caps text-[10px] text-error uppercase">LOSS</div>
                      <div className="font-data-tabular text-data-tabular text-on-surface font-bold text-xl">62 - 65</div>
                    </div>
                    <button className="bg-transparent border-2 border-inverse-primary text-inverse-primary font-label-caps text-xs px-3 py-1 rounded hover:bg-inverse-primary hover:text-white transition-colors">
                      Recap
                    </button>
                  </div>
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column: Sports & Teams */}
          <div className="md:col-span-4 flex flex-col gap-10">
            {/* SPORTS SECTION */}
            <section>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <h2 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" data-icon="sports_basketball">sports_basketball</span>
                  SPORTS
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/sports/basketball" className="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex items-center gap-4 hover-card-lift group hover:border-primary/50 transition-all">
                  <div className="bg-surface-container-low p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="sports_basketball">sports_basketball</span>
                  </div>
                  <div>
                    <div className="font-body-lg text-body-lg font-semibold text-on-surface">Men's Basketball</div>
                    <div className="font-body-md text-sm text-on-surface-variant">Division I</div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant ml-auto group-hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</span>
                </Link>
                
                <Link href="/sports/basketball-w" className="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex items-center gap-4 hover-card-lift group hover:border-primary/50 transition-all">
                  <div className="bg-surface-container-low p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="sports_basketball">sports_basketball</span>
                  </div>
                  <div>
                    <div className="font-body-lg text-body-lg font-semibold text-on-surface">Women's Basketball</div>
                    <div className="font-body-md text-sm text-on-surface-variant">Division I</div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant ml-auto group-hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</span>
                </Link>
              </div>
            </section>

            {/* TEAMS SECTION */}
            <section>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <h2 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" data-icon="groups">groups</span>
                  TEAMS
                </h2>
              </div>
              <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-5 flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer group">
                <div className="w-20 h-20 bg-surface-container-lowest rounded-full border-2 border-primary flex items-center justify-center mb-4 overflow-hidden relative">
                  <div className="bg-cover bg-center w-full h-full absolute inset-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHMeKhleVmLMDFbXeqG7BziN8C858MvUBuFhliJ_4qD3LBt7DX03C39DToz9dEpfxt10QQ6WQ7R9zdSoZ_snpa9MATFI_ADBgGVJYl2tqqw8itpgW16uQEvH6R_xCJ3Avufti_ig7s464h4lGBswEKlnYlGY7P9tIh_CRwcqeZ7HwwYooJ2teKr6A_L99N2YewbhmudAO6jT2OJlbRn-bdrwo0ejPHayz7exFt_Jh5c68zpYT-BtY')" }}></div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">UAIU Panthers</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Varsity Basketball Squad</p>
                <div className="flex -space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container flex items-center justify-center text-xs font-bold text-on-surface">M</div>
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container flex items-center justify-center text-xs font-bold text-on-surface">S</div>
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container flex items-center justify-center text-xs font-bold text-on-surface">J</div>
                  <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface-container flex items-center justify-center text-xs font-bold text-on-primary-container">+12</div>
                </div>
                <Link href="/teams" className="w-full bg-inverse-primary text-white font-label-caps text-label-caps py-2 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors inline-block text-center mt-2">
                  View Roster
                </Link>
              </div>
            </section>
          </div>
          
        </div>
      </main>
    </Layout>
  );
}
