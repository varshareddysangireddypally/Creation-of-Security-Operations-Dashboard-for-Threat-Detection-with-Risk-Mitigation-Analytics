import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { listenDashboardData } from "../../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  blockedThreats: number;
  criticalAlerts: number;
  accuracy: number;
  lastUpdated: string;
  weeklyGraph: number[];
};

function ThreatChart() {

  const [dashboard, setDashboard] = useState<DashboardData>({
    threatsDetected: 0,
    blockedThreats: 0,
    criticalAlerts: 0,
    accuracy: 0,
    lastUpdated: "Loading...",
    weeklyGraph: [0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {

    const unsubscribe = listenDashboardData((data) => {

      setDashboard(data);

    });

    return () => unsubscribe();

  }, []);

  const chartData = [
    {
      day: "Mon",
      threats: dashboard.weeklyGraph[0],
      blocked: Math.max(0, dashboard.weeklyGraph[0] - 6),
    },
    {
      day: "Tue",
      threats: dashboard.weeklyGraph[1],
      blocked: Math.max(0, dashboard.weeklyGraph[1] - 8),
    },
    {
      day: "Wed",
      threats: dashboard.weeklyGraph[2],
      blocked: Math.max(0, dashboard.weeklyGraph[2] - 4),
    },
    {
      day: "Thu",
      threats: dashboard.weeklyGraph[3],
      blocked: Math.max(0, dashboard.weeklyGraph[3] - 5),
    },
    {
      day: "Fri",
      threats: dashboard.weeklyGraph[4],
      blocked: Math.max(0, dashboard.weeklyGraph[4] - 3),
    },
    {
      day: "Sat",
      threats: dashboard.weeklyGraph[5],
      blocked: Math.max(0, dashboard.weeklyGraph[5] - 5),
    },
    {
      day: "Sun",
      threats: dashboard.weeklyGraph[6],
      blocked: Math.max(0, dashboard.weeklyGraph[6] - 5),
    },
  ];

  return (
    <div className="rounded-3xl border border-[#2B3550] bg-[#111827]/90 p-8 shadow-xl backdrop-blur-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Threat Analytics
          </h2>

          <p className="mt-2 text-slate-400">
            Weekly AI threat detection overview
          </p>

        </div>

        <div className="flex gap-4">

          <div className="rounded-xl bg-red-500/10 px-5 py-3">

            <p className="text-xs text-slate-400">
              Threats
            </p>

            <h3 className="mt-1 text-xl font-bold text-red-400">
              {dashboard.threatsDetected}
            </h3>

          </div>

          <div className="rounded-xl bg-green-500/10 px-5 py-3">

            <p className="text-xs text-slate-400">
              Blocked
            </p>

            <h3 className="mt-1 text-xl font-bold text-green-400">
              {dashboard.blockedThreats}
            </h3>

          </div>

        </div>

      </div>

      <div className="h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={chartData}>

            <defs>

              <linearGradient
                id="threatGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#8B5CF6"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#8B5CF6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #2B3550",
                borderRadius: "14px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="threats"
              stroke="#8B5CF6"
              strokeWidth={4}
              fill="url(#threatGradient)"
            />

            <Area
              type="monotone"
              dataKey="blocked"
              stroke="#22D3EE"
              strokeWidth={3}
              fill="transparent"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[#2B3550] pt-6">

        <div>

          <p className="text-sm text-slate-400">
            AI Detection Accuracy
          </p>

          <h2 className="mt-1 text-3xl font-bold text-cyan-400">
            {dashboard.accuracy}%
          </h2>

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Last Scan
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            {dashboard.lastUpdated}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default ThreatChart;