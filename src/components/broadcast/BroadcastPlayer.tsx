import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BroadcastPlayerProps {
  streamUrl: string | null;
  thumbnail: string | null;
  title: string;
  description: string | null;
  status: string;
  startedAt: string | null;
  event?: {
    name: string;
    sport?: { name: string } | null;
    category: string | null;
    venue: string | null;
    startTime: string | null;
  } | null;
}

export default function BroadcastPlayer({
  streamUrl,
  thumbnail,
  title,
  description,
  status,
  startedAt,
  event,
}: BroadcastPlayerProps) {
  const [elapsed, setElapsed] = useState("00:00:00");
  const [isLive, setIsLive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === "LIVE" && startedAt) {
      setIsLive(true);
      const startTime = new Date(startedAt).getTime();

      const updateElapsed = () => {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setElapsed(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        );
      };

      updateElapsed();
      intervalRef.current = setInterval(updateElapsed, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, startedAt]);

  const renderPlayer = () => {
    if (!streamUrl) {
      // Placeholder when no stream is configured
      return (
        <div className="relative flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <span className="text-6xl">📺</span>
            <h3 className="font-display text-2xl font-bold text-white">
              Stream Coming Soon
            </h3>
            <p className="font-sans text-sm text-white/50 max-w-md">
              The broadcast will begin shortly. Please wait for the stream to start.
            </p>
          </div>
        </div>
      );
    }

    // Check if it's a Cloudflare Stream embed
    if (streamUrl.includes("iframe.videodelivery.com") || streamUrl.includes("stream.videodelivery.com")) {
      return (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src={streamUrl}
            title={title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    }

    // Check if it's a YouTube embed
    if (streamUrl.includes("youtube.com") || streamUrl.includes("youtu.be")) {
      const embedUrl = streamUrl.includes("/embed/")
        ? streamUrl
        : streamUrl
            .replace("youtube.com/watch?v=", "youtube.com/embed/")
            .replace("youtu.be/", "youtube.com/embed/");

      return (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    }

    // Check if it's a Twitch embed
    if (streamUrl.includes("twitch.tv")) {
      return (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src={`https://player.twitch.tv/?${new URL(streamUrl).searchParams.get("channel") ? `channel=${new URL(streamUrl).searchParams.get("channel")}` : `video=${new URL(streamUrl).searchParams.get("video")}`}&parent=localhost`}
            title={title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    }

    // HLS.js for direct HLS streams
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
        <video
          ref={(el) => {
            if (el && typeof window !== "undefined" && (window as any).Hls) {
              if ((window as any).Hls.isSupported()) {
                const hls = new (window as any).Hls();
                hls.loadSource(streamUrl);
                hls.attachMedia(el);
              } else if (el.canPlayType("application/vnd.hls.playlist.m3u8")) {
                el.src = streamUrl;
              }
            } else if (el) {
              el.src = streamUrl;
            }
          }}
          className="h-full w-full object-cover"
          controls
          autoPlay
          muted
          playsInline
          poster={thumbnail || undefined}
        />
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Video Player */}
      <div className="relative">
        {renderPlayer()}

        {/* Live badge overlay */}
        {isLive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#ef4444]/90 border border-[#ef4444]/40 px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]"></span>
            </span>
            LIVE
          </motion.div>
        )}

        {/* Timer overlay */}
        {isLive && (
          <div className="absolute top-4 right-4 rounded-full bg-black/50 border border-white/10 px-4 py-2 font-data-tabular text-sm font-bold text-white backdrop-blur-md">
            {elapsed}
          </div>
        )}
      </div>

      {/* Event info below player */}
      <div className="mt-6 flex flex-col gap-2">
        <h1 className="font-display text-3xl md:text-4xl font-black uppercase text-white">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-sm text-white/60">{description}</p>
        )}

        {event && (
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
                {event.sport?.name || "Sports"}
              </span>
              <span className="text-white/20">•</span>
              <span className="font-sans text-xs text-white/60">
                {event.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-white/40">
                location_on
              </span>
              <span className="font-sans text-xs text-white/60">
                {event.venue}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-white/40">
                schedule
              </span>
              <span className="font-sans text-xs text-white/60">
                {event.startTime
                  ? new Date(event.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "TBD"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
