import React from 'react';
import { Trophy } from 'lucide-react';

export default function InteractiveLandscape() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <iframe
        src="/landscape/background.html"
        title="3D Interactive Landscape"
        className="w-full h-full border-0 pointer-events-auto"
        loading="eager"
        style={{
          width: '100%',
          height: '100%',
          filter: 'brightness(1.05) contrast(1.15)',
        }}
      />
      {/* Subtle blend to seamlessly match the obsidian theme and ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#060606_85%)] pointer-events-none opacity-40" />

      {/* The Trophy Replacement for the Moon */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative animate-[pulse_4s_ease-in-out_infinite]">
          <Trophy size={160} strokeWidth={1} className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,1)]" />
          <div className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-50">
            <Trophy size={160} strokeWidth={1} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,1)] blur-[2px]" />
          </div>
        </div>
      </div>

      {/* The Running Athletes */}
      <style>{`
        @keyframes runTowardsHorizon {
          0% {
            top: 100%;
            transform: translateX(-50%) scale(1.5);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            top: 40%;
            transform: translateX(-50%) scale(0.05);
            opacity: 0;
          }
        }
        @keyframes runBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15%); }
        }
      `}</style>
      
      <div 
        className="absolute left-[50%] pointer-events-none origin-bottom"
        style={{
          animation: 'runTowardsHorizon 8s linear infinite'
        }}
      >
        <div className="flex gap-4 items-end" style={{ animation: 'runBob 0.3s ease-in-out infinite' }}>
          {/* Male Athlete (Gold) */}
          <span className="material-symbols-outlined text-6xl text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" style={{ transform: 'scaleX(-1)', fontVariationSettings: '"FILL" 1' }}>
            directions_run
          </span>
          {/* Female Athlete (Purple) */}
          <span className="material-symbols-outlined text-5xl text-[#8B5CF6] drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]" style={{ transform: 'scaleX(-1)', fontVariationSettings: '"FILL" 1' }}>
            directions_run
          </span>
        </div>
      </div>
    </div>
  );
}
