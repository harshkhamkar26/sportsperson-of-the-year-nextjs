import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Cheer {
  id: string;
  type: string;
  sessionId: string | null;
  createdAt: string;
  _key?: string;
}

interface CheerTickerProps {
  cheers: Cheer[];
  totalCheers: number;
}

const CHEER_EMOJI: Record<string, string> = {
  CLAP: "👏",
  FIRE: "🔥",
  GO: "💪",
  CHAMPIONS: "🏆",
  SUPPORT: "❤️",
};

const SESSION_NAMES = [
  "Rishabh", "Ananya", "Harsh", "Priya", "Arjun", "Sahil", "Meera",
  "Kunal", "Ishita", "Rohan", "Neha", "Amit", "Pooja", "Vikram",
  "Sneha", "Raj", "Tina", "Mohan", "Riya", "Sanjay",
];

export default function CheerTicker({ cheers, totalCheers }: CheerTickerProps) {
  const [visibleCheers, setVisibleCheers] = useState<Cheer[]>([]);
  const [recentCheer, setRecentCheer] = useState<Cheer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add new cheers to the visible list
  useEffect(() => {
    if (cheers.length === 0) return;

    const latest = cheers[0];
    setRecentCheer(latest);

    // Add to visible list
    setVisibleCheers((prev) => {
      const newCheer = { ...latest, _key: `${latest.id}-${Date.now()}` };
      return [newCheer, ...prev].slice(0, 20);
    });

    // Remove the cheer after animation
    const timer = setTimeout(() => {
      setVisibleCheers((prev) => prev.filter((c) => c.id !== latest.id));
    }, 5000);

    return () => clearTimeout(timer);
  }, [cheers]);

  const getSessionName = (sessionId: string | null) => {
    if (!sessionId) return "Someone";
    const hash = sessionId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return SESSION_NAMES[hash % SESSION_NAMES.length];
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-2 overflow-y-auto max-h-64"
    >
      {/* Recent cheer flash */}
      <AnimatePresence>
        {recentCheer && (
          <motion.div
            key={`flash-${recentCheer.id}`}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none z-10 flex items-center gap-3 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-xl px-4 py-3 border border-[#D4AF37]/30"
          >
            <span className="text-2xl">
              {CHEER_EMOJI[recentCheer.type] || "🎉"}
            </span>
            <span className="font-sans text-sm font-bold text-white">
              {getSessionName(recentCheer.sessionId)}
            </span>
            <span className="font-sans text-xs text-[#D4AF37]">
              {recentCheer.type.replace("_", " ")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cheer list */}
      <AnimatePresence>
        {visibleCheers.map((cheer) => (
          <motion.div
            key={cheer._key || cheer.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
          >
            <span className="text-lg">
              {CHEER_EMOJI[cheer.type] || "🎉"}
            </span>
            <span className="font-sans text-sm font-medium text-white/80">
              {getSessionName(cheer.sessionId)}
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">
              {cheer.type.replace("_", " ")}
            </span>
            <span className="ml-auto font-sans text-[10px] text-white/30">
              {new Date(cheer.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {visibleCheers.length === 0 && (
        <div className="text-center py-8 text-white/30 font-sans text-xs uppercase tracking-widest">
          Be the first to cheer!
        </div>
      )}

      {/* Total count footer */}
      <div className="mt-auto pt-2 border-t border-white/5 text-center">
        <span className="font-display text-xl font-bold text-[#D4AF37]">
          {totalCheers}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-widest text-white/40 ml-2">
          Total Cheers
        </span>
      </div>
    </div>
  );
}
