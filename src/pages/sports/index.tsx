import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function SportsDirectory() {
  const sports = [
    {
      id: 'basketball',
      name: 'Basketball',
      icon: 'sports_basketball',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYSUS6_8lG4HYIDlfq6WfMhSjkhDop71tvlk2DqlG6c3TYbnvsDzxYao8ybGoJHDWdDH4klIog-pejKW9BdHQjd-eWMzRhEOzpCaFXWNd_XigabFz9L5eRmpgg0f94Rlpri8FKLMf-Uu-bZmGCbOaDR-agJ7R3wijbGLlLQ5klfMJ1l-vsN07INUAcm6DCEBuXTg6Tk4T80OgnPLWQ9N8L7VyfeVScQ6554yAXCEv8RcRlHc9hrLA',
      athletes: 142,
      events: 12,
      topAthlete: {
        name: 'Marcus Vance',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8vX-vA2OjeiCAKc9cetwpaJ3LRiSe2CSW-Gd6nzVmsS2twIldCZvbbrYWz8r61Ifs7b4zggklkL0tzszJtGgYNEbnwNnqgFxEsc3TJH4uWpLIBPVHSD9VbiQ6ijMc_lUsni1T4p0KZboKD7haBm6E8kKE-ePwXLhzbunuaVARzUavoHQuxh3c1DTX9WgO12z3rQ_7jZBQSzaTaTBKO4CiV1FW4iUwEyukfGuTXv2ft1nanqPflr0'
      }
    },
    {
      id: 'football',
      name: 'Football',
      icon: 'sports_soccer',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9edQ2xW4RV_y3_z8yb2iY4ttPpLfgvvq_88zhDFdTu9AI8VjwQW485MM9JyrQKdkUHeqw0IYFoEmXhscm7-7q-Kx7XAHJRud8SDG-lDZ8UuNZEirLZyAgoC6OIevITeTGdvONy7ydfD_92cuBFh3cubKYpkC8jnKGf0YIEBMBG67fyrknOf3F_yE2Fyl2ZUMdFkvPeXUCVWgKuOk7T87cio9yGiDsAWTAiAu2-obH9B4QBjcK6M4',
      athletes: 210,
      events: 18,
      topAthlete: {
        name: 'Elena Rostova',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyREmagzCQolszCOYAkCAn1L0q7cB6wt_LDqqAqrE-2pD84jD7jQlZyjk3o2WzjqliDbKGmdIXBoUfPIq5KqItTSw66Knna2x1jDu-Jf9jrvg2KxAkXHmyYzoWHwynYTsq22y6qbKOYhRr9D4Sf5LL4GYGlIiRkMWZTGphvz4eH5oRjVCdOEd4PtsFL4CJRH8lkUvSGIIqf250koHLgj6B3g_NsH6qI8JETeJjt-aeHUSBNw7tgNw'
      }
    },
    {
      id: 'athletics',
      name: 'Athletics',
      icon: 'sprint',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSIjEk-OG1H2LB9mGJJXPIPzhSQKQn1fV4XK-og0MdbN6feoVI_gKAKhzch2AUzL5_fByPtd6Xq9THfUYbMMaBt0x-HrbyXaZHTf0PPhb2zrUl7O8bbgewhRN8JTIjOgadu63Yj6KvRBj3i9rJqkor_4dSAqHEBBskFZvAGkwgMVhqNepOtxbPuCuQ935aCgXNuIZ21qCGrjW9IgcnrQnhJER5IZH3JFjhe_FrWeNY6Ds5GF5_iF4',
      athletes: 85,
      events: 24,
      topAthlete: {
        name: 'David Chen',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1rczlDs-VXwYC4M4eyrF9oVI9I0rP7Xf3gJVNWQU6lqoB6nKhnG3H156uwl1BVKoHuNsg9-vUh-jkSkaibbbAIdr-v7T-C4VOrkz1hhYI58EI7AFoUoTDo_FlwVefBHXIFXaGHPPFXjvR7Qcetfg5GoqUIjgxqx_pfRBFihq1FH66C8baZl4ISWL0aNyBUBx_O7ZK74PnSqXkthrcyb5OYkLLGnzuD8z-SlXItK3Y-qZSva4bsrk'
      }
    }
  ];

  return (
    <Layout title="Sports Directory - Universal AI University Athletics">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-[80px]">
        {/* Header Section */}
        <header className="mb-[80px]">
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-base">Sports Directory</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Explore the athletic disciplines at Universal AI University. Discover the current standings, top athletes, and upcoming events across all major sports.
          </p>
        </header>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {sports.map((sport) => (
            <div key={sport.id} className="bg-[#162A45] rounded-lg border border-outline-variant/20 overflow-hidden flex flex-col sport-card-hover transition-all duration-300 group hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#3B82F6] hover:border-[#3B82F6]">
              {/* Sport Imagery Header */}
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-500" 
                  style={{ backgroundImage: `url('${sport.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-sm p-2 rounded-full text-primary border border-primary/30">
                  <span className="material-symbols-outlined block" style={{ fontVariationSettings: "'FILL' 1" }}>{sport.icon}</span>
                </div>
                <h2 className="absolute bottom-4 left-4 font-headline-md text-headline-md text-on-surface">{sport.name}</h2>
              </div>
              
              {/* Stats Area */}
              <div className="p-gutter flex-grow flex flex-col justify-between">
                <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Athletes</span>
                    <span className="font-data-tabular text-data-tabular text-primary">{sport.athletes}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Events</span>
                    <span className="font-data-tabular text-data-tabular text-primary">{sport.events}</span>
                  </div>
                </div>
                
                {/* Top Athlete Preview */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rank-gold relative">
                    <img className="w-full h-full object-cover" src={sport.topAthlete.image} alt={sport.topAthlete.name} />
                    <div className="absolute bottom-0 right-0 bg-rank-gold w-4 h-4 rounded-full border border-surface flex items-center justify-center">
                      <span className="font-data-tabular text-[10px] font-bold text-black leading-none">1</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-rank-gold block text-xs">Current Top Athlete</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">{sport.topAthlete.name}</span>
                  </div>
                </div>
                
                {/* Action */}
                <Link href={`/sports/${sport.id}`} className="w-full bg-transparent border-2 border-[#3B82F6] text-on-surface font-headline-md text-[16px] py-2 rounded-lg hover:bg-[#3B82F6] transition-colors flex items-center justify-center gap-2 group-hover:bg-[#3B82F6]">
                  View Sport Leaderboard
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
