import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";

interface Overview {
  athletes: number;
  events: number;
  activeSports: number;
  totalParticipations: number;
  totalPoints: number;
  goldMedals: number;
  liveEvent: {
    title: string;
    eventName: string;
    status: string;
  } | null;
}

interface ChartData {
  month: string;
  points: number;
}

interface ParticipationData {
  month: string;
  count: number;
}

interface MedalData {
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
}

interface DimensionData {
  [key: string]: number;
}

interface AnalyticsData {
  overview: Overview;
  charts: {
    pointsByMonth: ChartData[];
    participationByMonth: ParticipationData[];
    medalsBySport: MedalData[];
    participationByGender: DimensionData[];
    participationBySchool: DimensionData[];
    participationByHouse: DimensionData[];
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/admin/login");
    },
  });
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <AdminLayout title="Command Center | Sports OS">
        <div className="flex items-center justify-center py-20 text-white/50">
          Loading analytics...
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout title="Command Center | Sports OS">
        <div className="flex items-center justify-center py-20 text-white/50">
          Failed to load analytics.
        </div>
      </AdminLayout>
    );
  }

  const { overview, charts } = analytics;

  return (
    <AdminLayout title="Command Center | Sports OS">
      <div className="flex flex-col gap-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="font-display text-4xl font-black uppercase text-white tracking-wide mb-2">
              Sports Command Center
            </h1>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40">
              Real-time analytics and operational overview
            </p>
          </div>
          <button
            onClick={fetchAnalytics}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh Data
          </button>
        </div>

        {/* Live Event Banner */}
        {overview.liveEvent && (
          <motion.div
            className="rounded-2xl border border-[#ef4444]/30 bg-[#ef4444]/10 p-6 flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-[#ef4444]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]"></span>
                </span>
                LIVE
              </span>
              <span className="font-display text-xl font-bold text-white">
                {overview.liveEvent.title}
              </span>
              <span className="font-sans text-sm text-white/50">
                {overview.liveEvent.eventName}
              </span>
            </div>
            <Link
              href="/broadcast"
              className="px-4 py-2 bg-[#D4AF37] text-black font-sans text-xs font-bold uppercase rounded-xl hover:bg-[#D4AF37]/80 transition-colors"
            >
              View Broadcast
            </Link>
          </motion.div>
        )}

        {/* Overview Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon="group"
            label="Athletes"
            value={overview.athletes}
            color="#3B82F6"
          />
          <StatCard
            icon="event"
            label="Events"
            value={overview.events}
            color="#8B5CF6"
          />
          <StatCard
            icon="sports_soccer"
            label="Active Sports"
            value={overview.activeSports}
            color="#10B981"
          />
          <StatCard
            icon="person"
            label="Total Participations"
            value={overview.totalParticipations}
            color="#F59E0B"
          />
          <StatCard
            icon="pin"
            label="Total Points"
            value={overview.totalPoints}
            color="#D4AF37"
          />
          <StatCard
            icon="emoji_events"
            label="Gold Medals"
            value={overview.goldMedals}
            color="#D4AF37"
          />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Points by Month */}
          <div className="rounded-2xl border border-white/10 bg-[#111]/60 p-8 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold uppercase text-white/40 mb-6 tracking-widest">
              Points by Month
            </h3>
            <BarChart data={charts.pointsByMonth} dataKey="points" color="#D4AF37" />
          </div>

          {/* Participation by Month */}
          <div className="rounded-2xl border border-white/10 bg-[#111]/60 p-8 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold uppercase text-white/40 mb-6 tracking-widest">
              Participation by Month
            </h3>
            <BarChart data={charts.participationByMonth} dataKey="count" color="#3B82F6" />
          </div>

          {/* Medals by Sport */}
          <div className="rounded-2xl border border-white/10 bg-[#111]/60 p-8 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold uppercase text-white/40 mb-6 tracking-widest">
              Medals by Sport
            </h3>
            <MedalChart data={charts.medalsBySport} />
          </div>

          {/* Participation by Gender */}
          <div className="rounded-2xl border border-white/10 bg-[#111]/60 p-8 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold uppercase text-white/40 mb-6 tracking-widest">
              Participation by Gender
            </h3>
            <PieChart data={charts.participationByGender} />
          </div>

          {/* Participation by School */}
          <div className="rounded-2xl border border-white/10 bg-[#111]/60 p-8 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold uppercase text-white/40 mb-6 tracking-widest">
              Participation by School
            </h3>
            <HorizontalBar data={charts.participationBySchool} color="#10B981" />
          </div>

          {/* Participation by House */}
          <div className="rounded-2xl border border-white/10 bg-[#111]/60 p-8 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold uppercase text-white/40 mb-6 tracking-widest">
              Participation by House
            </h3>
            <HorizontalBar data={charts.participationByHouse} color="#F59E0B" />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#111]/80 p-6 group hover:border-white/10 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors">
        <span className="material-symbols-outlined !text-[6rem]">{icon}</span>
      </div>
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 relative z-10">
        {label}
      </p>
      <div className="flex items-center gap-3 relative z-10">
        <h3
          className="font-display text-4xl font-bold"
          style={{ color }}
        >
          {value.toLocaleString()}
        </h3>
      </div>
    </motion.div>
  );
}

function BarChart({
  data,
  dataKey,
  color,
}: {
  data: Array<{ month: string; [key: string]: any }>;
  dataKey: string;
  color: string;
}) {
  const maxValue = Math.max(...data.map((d) => d[dataKey]), 1);

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((d) => (
          <div key={d.month} className="flex flex-col items-center flex-1">
            <motion.div
              className="w-full rounded-t-sm relative group"
              style={{
                height: `${(d[dataKey] / maxValue) * 100}%`,
                background: `linear-gradient(180deg, ${color}, ${color}40)`,
                minHeight: "4px",
              }}
              initial={{ height: 0 }}
              animate={{ height: `${(d[dataKey] / maxValue) * 100}%` }}
              transition={{ duration: 0.8 }}
            >
              <span
                className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color }}
              >
                {d[dataKey]}
              </span>
            </motion.div>
            <span className="font-sans text-[10px] text-white/40 mt-2 rotate-[-45deg] origin-top-left">
              {d.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedalChart({ data }: { data: MedalData[] }) {
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.gold, d.silver, d.bronze]),
    1
  );

  return (
    <div className="h-64">
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.sport} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-white/50 w-24 truncate">
                {d.sport}
              </span>
              <div className="flex-1 flex items-center gap-1">
                <div className="flex-1 h-4 rounded bg-white/[0.05] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#D4AF37] rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.gold / maxValue) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="font-display text-xs font-bold text-[#D4AF37] w-8">
                  {d.gold}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-white/50 w-24"></span>
              <div className="flex-1 h-4 rounded bg-white/[0.05] overflow-hidden">
                <motion.div
                  className="h-full bg-[#C0C0C0] rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.silver / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              </div>
              <span className="font-display text-xs font-bold text-[#C0C0C0] w-8">
                {d.silver}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-white/50 w-24"></span>
              <div className="flex-1 h-4 rounded bg-white/[0.05] overflow-hidden">
                <motion.div
                  className="h-full bg-[#CD7F32] rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.bronze / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <span className="font-display text-xs font-bold text-[#CD7F32] w-8">
                {d.bronze}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PieChart({ data }: { data: DimensionData[] }) {
  const total = data.reduce((sum, d) => sum + Object.values(d)[1], 0);
  const colors = ["#3B82F6", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"];

  if (total === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-white/30">
        No data available
      </div>
    );
  }

  let cumulative = 0;
  const slices = data.map((d, i) => {
    const value = Object.values(d)[1] as number;
    const start = cumulative;
    cumulative += value;
    const end = cumulative;
    const largeArc = end - start > 0.5 ? 1 : 0;

    const x1 = 50 + 40 * Math.cos(2 * Math.PI * start / total);
    const y1 = 50 + 40 * Math.sin(2 * Math.PI * start / total);
    const x2 = 50 + 40 * Math.cos(2 * Math.PI * end / total);
    const y2 = 50 + 40 * Math.sin(2 * Math.PI * end / total);

    return {
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: colors[i % colors.length],
      label: Object.keys(d)[0],
      value,
    };
  });

  return (
    <div className="h-64 flex items-center gap-8">
      <svg width="120" height="120" viewBox="0 0 100 100">
        {slices.map((s, i) => (
          <motion.path
            key={s.label}
            d={s.path}
            fill={s.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </svg>
      <div className="flex flex-col gap-2">
        {slices.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="font-sans text-xs text-white/70">
              {s.label}: {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBar({
  data,
  color,
}: {
  data: DimensionData[];
  color: string;
}) {
  const maxValue = Math.max(...data.map((d) => Object.values(d)[1] as number), 1);

  return (
    <div className="h-64">
      <div className="space-y-3">
        {data.map((d) => {
          const key = Object.keys(d)[0];
          const value = Object.values(d)[1] as number;
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="font-sans text-xs text-white/50 w-24 truncate">
                {key}
              </span>
              <div className="flex-1 h-6 rounded bg-white/[0.05] overflow-hidden">
                <motion.div
                  className="h-full rounded flex items-center justify-end px-2"
                  style={{
                    width: `${(value / maxValue) * 100}%`,
                    background: `linear-gradient(90deg, ${color}40, ${color})`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / maxValue) * 100}%` }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="font-display text-xs font-bold text-white">
                    {value}
                  </span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
