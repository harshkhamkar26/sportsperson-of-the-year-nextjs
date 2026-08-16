import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Universal AI University Athletics">
      <div className="pt-8 pb-20 md:pb-32 max-w-container-max mx-auto space-y-20 md:space-y-32">
        {/* Hero Section: Person of the Year */}
        <section className="relative rounded-xl overflow-hidden bg-[#162A45] border border-outline-variant/30 flex flex-col md:flex-row shadow-[4px_4px_0px_0px_#3B82F6] transition-transform duration-300 hover:scale-[1.01]">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center z-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#162A45] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-rank-gold text-black px-4 py-1.5 rounded-full font-data-tabular text-data-tabular mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Rank #1
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2 leading-tight">SPORTS PERSON OF THE YEAR</h1>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Harsh Khamkar</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-md">School of AI &amp; Future Technologies</p>
              
              <div className="flex items-center gap-6 mb-8 font-data-tabular text-data-tabular text-on-surface">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-rank-gold">385</span>
                  <span className="text-sm text-on-surface-variant uppercase tracking-widest">Points</span>
                </div>
                <div className="h-12 w-px bg-outline-variant/50"></div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-on-surface">4</span>
                  <span className="text-sm text-on-surface-variant uppercase tracking-widest">Gold</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-on-surface">2</span>
                  <span className="text-sm text-on-surface-variant uppercase tracking-widest">Silver</span>
                </div>
              </div>
              
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
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYSUS6_8lG4HYIDlfq6WfMhSjkhDop71tvlk2DqlG6c3TYbnvsDzxYao8ybGoJHDWdDH4klIog-pejKW9BdHQjd-eWMzRhEOzpCaFXWNd_XigabFz9L5eRmpgg0f94Rlpri8FKLMf-Uu-bZmGCbOaDR-agJ7R3wijbGLlLQ5klfMJ1l-vsN07INUAcm6DCEBuXTg6Tk4T80OgnPLWQ9N8L7VyfeVScQ6554yAXCEv8RcRlHc9hrLA')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#162A45] via-transparent to-transparent md:bg-gradient-to-l opacity-80"></div>
          </div>
        </section>

        {/* Section 2: Top 3 Podium */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">The Podium</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end h-auto md:h-[500px]">
            {/* Rank #2 */}
            <div className="relative group h-[400px] bg-[#162A45] rounded-lg border border-outline-variant/30 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:border-[#3B82F6]/50 order-2 md:order-1 flex flex-col justify-end">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyREmagzCQolszCOYAkCAn1L0q7cB6wt_LDqqAqrE-2pD84jD7jQlZyjk3o2WzjqliDbKGmdIXBoUfPIq5KqItTSw66Knna2x1jDu-Jf9jrvg2KxAkXHmyYzoWHwynYTsq22y6qbKOYhRr9D4Sf5LL4GYGlIiRkMWZTGphvz4eH5oRjVCdOEd4PtsFL4CJRH8lkUvSGIIqf250koHLgj6B3g_NsH6qI8JETeJjt-aeHUSBNw7tgNw')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>
              <div className="relative z-10 p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border-2 border-rank-silver flex items-center justify-center text-rank-silver font-data-tabular text-data-tabular font-bold mb-3 shadow-[0_0_10px_rgba(192,192,192,0.3)]">2</div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Aisha Khan</h4>
                <p className="font-data-tabular text-data-tabular text-rank-silver mb-2">310 PTS</p>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-rank-gold text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-silver text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-silver text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                </div>
              </div>
            </div>
            
            {/* Rank #1 */}
            <div className="relative group h-[480px] bg-[#162A45] rounded-lg border border-rank-gold/50 overflow-hidden shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-[1.02] order-1 md:order-2 flex flex-col justify-end md:-translate-y-4">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8vX-vA2OjeiCAKc9cetwpaJ3LRiSe2CSW-Gd6nzVmsS2twIldCZvbbrYWz8r61Ifs7b4zggklkL0tzszJtGgYNEbnwNnqgFxEsc3TJH4uWpLIBPVHSD9VbiQ6ijMc_lUsni1T4p0KZboKD7haBm6E8kKE-ePwXLhzbunuaVARzUavoHQuxh3c1DTX9WgO12z3rQ_7jZBQSzaTaTBKO4CiV1FW4iUwEyukfGuTXv2ft1nanqPflr0')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/70 to-transparent"></div>
              <div className="relative z-10 p-6 flex flex-col items-center text-center">
                <div className="bg-rank-gold text-black px-4 py-1.5 rounded-full font-data-tabular text-data-tabular font-bold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]">RANK 1</div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1 text-2xl">Harsh Khamkar</h4>
                <p className="font-data-tabular text-data-tabular text-rank-gold text-xl font-bold mb-3">385 PTS</p>
                <div className="flex gap-2 mb-2">
                  <span className="material-symbols-outlined text-rank-gold" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-gold" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-gold" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-gold" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                </div>
              </div>
            </div>

            {/* Rank #3 */}
            <div className="relative group h-[360px] bg-[#162A45] rounded-lg border border-outline-variant/30 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:border-[#3B82F6]/50 order-3 md:order-3 flex flex-col justify-end">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1rczlDs-VXwYC4M4eyrF9oVI9I0rP7Xf3gJVNWQU6lqoB6nKhnG3H156uwl1BVKoHuNsg9-vUh-jkSkaibbbAIdr-v7T-C4VOrkz1hhYI58EI7AFoUoTDo_FlwVefBHXIFXaGHPPFXjvR7Qcetfg5GoqUIjgxqx_pfRBFihq1FH66C8baZl4ISWL0aNyBUBx_O7ZK74PnSqXkthrcyb5OYkLLGnzuD8z-SlXItK3Y-qZSva4bsrk')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>
              <div className="relative z-10 p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border-2 border-rank-bronze flex items-center justify-center text-rank-bronze font-data-tabular text-data-tabular font-bold mb-3 shadow-[0_0_10px_rgba(205,127,50,0.3)]">3</div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Rohan Patel</h4>
                <p className="font-data-tabular text-data-tabular text-rank-bronze mb-2">290 PTS</p>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-rank-silver text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-bronze text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                  <span className="material-symbols-outlined text-rank-bronze text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>test_clone</span>
                </div>
              </div>
            </div>
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
            <div className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSIjEk-OG1H2LB9mGJJXPIPzhSQKQn1fV4XK-og0MdbN6feoVI_gKAKhzch2AUzL5_fByPtd6Xq9THfUYbMMaBt0x-HrbyXaZHTf0PPhb2zrUl7O8bbgewhRN8JTIjOgadu63Yj6KvRBj3i9rJqkor_4dSAqHEBBskFZvAGkwgMVhqNepOtxbPuCuQ935aCgXNuIZ21qCGrjW9IgcnrQnhJER5IZH3JFjhe_FrWeNY6Ds5GF5_iF4')" }}></div>
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
            </div>
            
            {/* Highlight Card 2 */}
            <div className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRDGXdUAtDoM1c59iiiuAWwouMwA5A9fkYgNoGxPVHUy8f2bKYbyiuSfPk1gYp5bnsgE6R_iE5AAayf8yCeP_nX6zp7ygWzEZqzgNOlDVhIlMghXO8a-UBJj6iCeY0HUE9-Et3Cd3VxO146V6iKOQnjjxpjIclQzzllxYgHIaBTP8mbl5qW_lnNBxIT44ZYCPR_zww3reADv71Iyt2J6MzFx-Po4ABGRQfPZwx615sVQekeAPVdnw')" }}></div>
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
            </div>
            
            {/* Highlight Card 3 */}
            <div className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6OjZVolybM2P0qxhkuITSK-x6NNIsUhR-0929ZYt-V4WLZyld2o6iLqBb_I_WehYx-RmG5JfMN_rpOXNUx0CHObmtYwCZyQiFU3gpN5BsNVAhRUPHzesbqkaSbzCoY2ubrkre8oAAnP0CIDFzeJf9qwEbqV-1cIhGIiU4EjhiKwbq1tGGyBU30ZjUoW549fGuYyQNcHznAqT-YtyrliE8BD_ai6TsdaiuzOIvWeoOugKknph4jGQ')" }}></div>
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
            </div>
            
            {/* Highlight Card 4 */}
            <div className="bg-[#162A45] border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9edQ2xW4RV_y3_z8yb2iY4ttPpLfgvvq_88zhDFdTu9AI8VjwQW485MM9JyrQKdkUHeqw0IYFoEmXhscm7-7q-Kx7XAHJRud8SDG-lDZ8UuNZEirLZyAgoC6OIevITeTGdvONy7ydfD_92cuBFh3cubKYpkC8jnKGf0YIEBMBG67fyrknOf3F_yE2Fyl2ZUMdFkvPeXUCVWgKuOk7T87cio9yGiDsAWTAiAu2-obH9B4QBjcK6M4')" }}></div>
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
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
