import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function SportDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  // Title capitalization
  const sportName = typeof id === 'string' ? id.charAt(0).toUpperCase() + id.slice(1) : 'Basketball';

  return (
    <Layout title={`${sportName} - Sport Details | Universal AI University`}>
      <div className="flex flex-col flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[614px] min-h-[500px] flex items-end pb-12 mb-20">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClETeIkspaRmDrY17nCvMWMo1tqJtq-JcIf8dUUqglQzMccLe5P-UqvL964T-eUgpDdWUnRTiluQHrOrUl8PCI5NOj-Q6B3jlsQN_tl5REwMKyWHcNmsP6GaMXBn6bmiIMjiPHBclqiaaitBFmG8HmdLDYFs3IFeLFDEaUsutX-9VFamLxrCd1bmAhz-6t7AerNoCKH2J1p2jd0cfRcFf2qmsj7MZ4BrzrBRQbsnEX2ssERdFgq3Q')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>sports_basketball</span>
                  <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Varsity Athletics</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2 text-shadow-glow">{sportName}</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">The pinnacle of court agility and team synergy. Witness the high-stakes games defining this season's athletic legacy.</p>
              </div>
              
              {/* Key Stats Bento Box */}
              <div className="flex gap-4 bg-[#162A45]/40 backdrop-blur-md rounded-xl p-4 border border-outline-variant/30">
                <div className="px-4 py-2 border-r border-outline-variant/30">
                  <div className="font-headline-lg text-headline-lg text-on-surface">124</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">Athletes</div>
                </div>
                <div className="px-4 py-2 border-r border-outline-variant/30">
                  <div className="font-headline-lg text-headline-lg text-on-surface">8</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">Events</div>
                </div>
                <div className="px-4 py-2">
                  <div className="font-headline-lg text-headline-lg text-on-surface">450</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">Participations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop flex flex-col gap-24 pb-24">
          
          {/* Podium & Rules Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Top Athletes Podium */}
            <section className="lg:col-span-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Top Athletes</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Current leaders in {sportName.toLowerCase()} performance.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-end justify-center gap-4 h-auto md:h-[400px] mt-16 md:mt-12">
                {/* Rank 2 */}
                <div className="w-full md:w-1/3 h-[280px] bg-surface-container-low rounded-t-xl relative border-t-2 border-l-2 border-r-2 border-rank-silver flex flex-col items-center pt-12 pb-4 px-4 shadow-[0_0_15px_rgba(192,192,192,0.2)] hover:-translate-y-2 transition-transform mt-12 md:mt-0">
                  <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-rank-silver overflow-hidden bg-surface-variant">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNU_BHYCzufWqYXH_NUWiBMRAtUbaob7nf43zdUYWb-rg6EGDBy6KCcjAJiiYYfhOlRuO9nQ1SlWpxG4xtpptuMOF9bcq0TWH9qUNUMXIZ32MQJKeT6YYhU6-4_aDoOBNZ1z6nmJ7KmPsAI4vSJweAWwBFQ0MWz_prvxtisq7c_TzKZ8nnjNvlN9LvYsFZUG3dJlFToL5a-oQwO2P9XvTmAYd7OAJeGidJpt0cbbBZFj9r3OOforw" alt="Sarah Jenkins" />
                  </div>
                  <div className="absolute -top-12 right-1/2 translate-x-12 bg-rank-silver text-on-background font-label-caps text-label-caps px-2 py-1 rounded shadow-lg text-xs font-bold">2ND</div>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-center">Sarah Jenkins</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">PG • Junior</p>
                  <div className="mt-auto">
                    <span className="font-data-tabular text-data-tabular text-rank-silver text-2xl font-bold">840</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant text-xs ml-1">PTS</span>
                  </div>
                </div>
                
                {/* Rank 1 */}
                <div className="w-full md:w-1/3 h-[340px] bg-[#162A45] rounded-t-xl relative border-t-2 border-l-2 border-r-2 border-rank-gold flex flex-col items-center pt-14 pb-4 px-4 z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-2 transition-transform mt-12 md:mt-0">
                  <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-rank-gold overflow-hidden bg-surface-variant shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN8bdp2LmlE0TnO2vawgKnzVBF_U71TbTIG9nDIbNDjhFJd4rSAf6kPwfbiXayy5CTuuwUOuRFk8ittLHtyqAFgLjLdd61hLqCFf_q3Z8tvJ7U7UQRTaQcsBCoZVjiiZt69xBXBTnmk2j5BgX676tf4cox7ZWgvxT498HToHQCdKIB7OMHkPGXYXXL4E91Z0Vr7iPGZQpFxm2XizHgTQq6oDObP2UN8nhdxZUFNmXCAQCIaqw0MzQ" alt="Marcus Chen" />
                  </div>
                  <div className="absolute -top-14 right-1/2 translate-x-14 bg-rank-gold text-[#502400] font-label-caps text-label-caps px-3 py-1 rounded shadow-lg text-sm font-bold">1ST</div>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-center font-bold">Marcus Chen</h3>
                  <p className="font-label-caps text-label-caps text-primary-fixed-dim mt-1">SG • Senior</p>
                  <div className="mt-auto flex flex-col items-center">
                    <div className="flex items-baseline">
                      <span className="font-data-tabular text-data-tabular text-rank-gold text-4xl font-bold">1,250</span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant ml-2">PTS</span>
                    </div>
                  </div>
                </div>

                {/* Rank 3 */}
                <div className="w-full md:w-1/3 h-[250px] bg-surface-container-low rounded-t-xl relative border-t-2 border-l-2 border-r-2 border-rank-bronze flex flex-col items-center pt-10 pb-4 px-4 shadow-[0_0_15px_rgba(205,127,50,0.2)] hover:-translate-y-2 transition-transform mt-12 md:mt-0">
                  <div className="absolute -top-8 w-16 h-16 rounded-full border-4 border-rank-bronze overflow-hidden bg-surface-variant">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBD0y06oYxZasyjfs4bcyXDDeYbPyLAmKo2EJOFs1PSIt9Le59hV9iBdJqrPnlww79aA2rGZXZaCfJHP4fqqeX0B-wob_T-psNjn5nnmdvRsqOi84__ck-G0V_i3oBJlEM-Ec4zcKrgdOaqMrIGNGYFKt-dyEXy5AC9Af2urdElQuCTrRNr5k5dN5EFXJX4NP6JMpQVBheSjlVxRhvBggaBbWBAtbIKBJVS-eXbceRJ_HfHXKCfno" alt="David Osei" />
                  </div>
                  <div className="absolute -top-10 right-1/2 translate-x-10 bg-rank-bronze text-on-background font-label-caps text-label-caps px-2 py-1 rounded shadow-lg text-xs font-bold">3RD</div>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-center text-lg mt-2">David Osei</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 text-xs">SF • Sophomore</p>
                  <div className="mt-auto">
                    <span className="font-data-tabular text-data-tabular text-rank-bronze text-xl font-bold">795</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant text-xs ml-1">PTS</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Sidebar Rules */}
            <aside className="lg:col-span-4 flex flex-col gap-6 mt-12 lg:mt-0">
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Point Rules</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">Match Win</span>
                    <span className="font-data-tabular text-data-tabular text-success font-bold">+50 PTS</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">Points Scored (per 10)</span>
                    <span className="font-data-tabular text-data-tabular text-primary-fixed-dim font-bold">+5 PTS</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">MVP Award</span>
                    <span className="font-data-tabular text-data-tabular text-rank-gold font-bold">+100 PTS</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">Foul out (Limit)</span>
                    <span className="font-data-tabular text-data-tabular text-error font-bold">-20 PTS</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">Technical Foul</span>
                    <span className="font-data-tabular text-data-tabular text-error font-bold">-50 PTS</span>
                  </li>
                </ul>
                <div className="mt-8 pt-4 border-t border-outline-variant/30">
                  <h4 className="font-label-caps text-label-caps text-on-surface mb-4">Medal Distribution</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rank-gold"></div>
                      <span className="font-body-md text-body-md text-on-surface-variant flex-1">Gold (1st Place Teams)</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rank-silver"></div>
                      <span className="font-body-md text-body-md text-on-surface-variant flex-1">Silver (2nd Place Teams)</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rank-bronze"></div>
                      <span className="font-body-md text-body-md text-on-surface-variant flex-1">Bronze (3rd Place Teams)</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Leaderboard Table Section */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">{sportName} Leaderboard</h2>
            </div>
            <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                      <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-16">Rank</th>
                      <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Athlete</th>
                      <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase hidden md:table-cell">School/Program</th>
                      <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase hidden sm:table-cell">Events</th>
                      <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface">
                    <tr className="border-b border-outline-variant/10 hover:bg-surface-container-high/50 transition-colors">
                      <td className="py-3 px-6">
                        <div className="w-8 h-8 rounded-full bg-rank-gold flex items-center justify-center text-on-tertiary font-data-tabular font-bold text-sm">1</div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoh95uYRS4Fgj2cCtB_ojRVPJ29I1UwYLmgYY3QJ1k0KqUabsJrt6cnRbixoDWjh1srn-6A2UMH0IsMhIShRjiFsv03DOOtyXvMoFhhJ7zfkoKH1nPRf2bGUbZFQpXx6XOzEPq7ou552_Yy4e1Pcb-M9i9QGJfrvmo8lS9ROHmIQ6BSLxG_FyjzXKTJXhao2hxdrRC9cI1B8SrTjyWv5GK7Y2nJKoX9MoFTPojDuFANd15Z20b8UA" alt="Marcus Chen"/>
                          </div>
                          <div className="font-medium">Marcus Chen</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-on-surface-variant hidden md:table-cell">School of Engineering</td>
                      <td className="py-3 px-6 font-data-tabular hidden sm:table-cell">12</td>
                      <td className="py-3 px-6 text-right font-data-tabular text-data-tabular font-bold text-primary">1,250</td>
                    </tr>
                    <tr className="border-b border-outline-variant/10 hover:bg-surface-container-high/50 transition-colors">
                      <td className="py-3 px-6">
                        <div className="w-8 h-8 rounded-full bg-rank-silver flex items-center justify-center text-on-background font-data-tabular font-bold text-sm">2</div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfIPYZhpgiyM1auM0wEpRnjOzwANP2SUvLhRA6APJj0GKJo5vUEPByaFg9R8EAlU_zjpEPkkHwZLcaw6Vh04JGoiAeDlLci7RIAShgORyWjnaS0YkWykGnVuGl7NbLgPgZuJ0hjtsM0fV4okbsqQL-Q8dWtsSmSg6kN1EzdTZ645j3Pw68-ZB4ta8eCbmOuYMFAJkhYnZHKOMUAWP9TlKihfbUr3RVsAopUhjq25FtBuW9b9auaLo" alt="Sarah Jenkins"/>
                          </div>
                          <div className="font-medium">Sarah Jenkins</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-on-surface-variant hidden md:table-cell">School of Business</td>
                      <td className="py-3 px-6 font-data-tabular hidden sm:table-cell">10</td>
                      <td className="py-3 px-6 text-right font-data-tabular text-data-tabular font-bold text-primary">840</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 flex justify-center border-t border-outline-variant/20">
                <Link href="/leaderboard" className="font-label-caps text-label-caps text-primary hover:text-primary-fixed-dim transition-colors">View Full Leaderboard</Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}
