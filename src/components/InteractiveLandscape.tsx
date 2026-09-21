import React from 'react';

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
    </div>
  );
}
