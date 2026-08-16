import React from 'react';

interface AvatarProps {
  photoUrl?: string | null;
  name: string;
  className?: string;
}

export default function Avatar({ photoUrl, name, className = "" }: AvatarProps) {
  if (photoUrl) {
    return <img src={photoUrl} alt={name} className={`object-cover ${className}`} />;
  }

  // Fallback generation
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Create a stable random gradient based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const h1 = Math.abs(hash) % 360;
  const h2 = (h1 + 40) % 360;
  
  return (
    <div 
      className={`flex items-center justify-center font-bold text-white shadow-inner ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${h1}, 70%, 50%), hsl(${h2}, 80%, 40%))`
      }}
    >
      {initials}
    </div>
  );
}
