import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getRankings } from '@/lib/rankings';
import Avatar from '@/components/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

export async function getServerSideProps() {
  const rankings = await getRankings({});
  return { props: { rankings } };
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function GlobalSearch({ rankings }: { rankings: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const results = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const query = debouncedSearchQuery.toLowerCase();
    return rankings.filter((athlete) => 
      athlete.name.toLowerCase().includes(query) ||
      athlete.rollNumber.toLowerCase().includes(query) ||
      athlete.className.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery, rankings]);

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
              name="global-search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              {searchQuery && (
                <button aria-label="Clear search" className="text-on-surface-variant hover:text-on-surface" onClick={() => setSearchQuery('')}>
                  <span className="material-symbols-outlined" data-icon="close">close</span>
                </button>
              )}
            </div>
          </div>
          
          {debouncedSearchQuery && (
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Showing top results for <span className="text-on-surface font-semibold">"{debouncedSearchQuery}"</span>
            </p>
          )}
        </section>

        {/* Results Grid Layout */}
        <div className="w-full">
          {!debouncedSearchQuery ? (
            <div className="py-20 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">search</span>
              <h2 className="font-headline-md text-on-surface">Search the Varsity Directory</h2>
              <p className="text-on-surface-variant mt-2">Find athletes by name, ID, or school.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">person_search</span>
              <h2 className="font-headline-md text-on-surface">No results found</h2>
              <p className="text-on-surface-variant mt-2">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <section>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                  <h2 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" data-icon="directions_run">directions_run</span>
                    ATHLETES
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
                  <AnimatePresence>
                    {results.map((athlete) => (
                      <motion.div
                        key={athlete.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={`/athlete/${athlete.id}`} className="relative bg-surface-container rounded-lg overflow-hidden hover-card-lift border border-outline-variant/30 flex flex-col h-[320px] cursor-pointer group hover:border-primary/50 transition-all duration-300">
                          <div className="absolute top-4 left-4 z-10">
                            <div className="bg-surface-container-high border border-inverse-primary text-on-surface font-data-tabular text-data-tabular px-3 py-1 rounded-full font-bold flex items-center gap-1">
                              #{athlete.rank}
                            </div>
                          </div>
                          <div className="h-2/3 w-full relative bg-surface-variant overflow-hidden">
                            <Avatar photoUrl={athlete.photoUrl} name={athlete.name} className="w-full h-full object-cover text-5xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
                          </div>
                          <div className="p-4 z-10 flex flex-col justify-end h-full mt-auto">
                            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">{athlete.name}</h3>
                            <p className="font-body-md text-body-md text-primary mt-1">{athlete.className}</p>
                            <div className="flex gap-4 mt-3 pt-3 border-t border-outline-variant/20">
                              <div>
                                <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">PTS</div>
                                <div className="font-data-tabular text-data-tabular text-on-surface">{athlete.totalPoints}</div>
                              </div>
                              <div>
                                <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">EVT</div>
                                <div className="font-data-tabular text-data-tabular text-on-surface">{athlete.eventsCount}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
