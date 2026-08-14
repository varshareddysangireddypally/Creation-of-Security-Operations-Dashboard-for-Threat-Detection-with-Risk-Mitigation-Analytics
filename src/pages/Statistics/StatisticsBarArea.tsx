import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  weeklyGraph: number[];
};

function StatisticsBarArea() {

  const [data, setData] = useState([
    { day: "Mon", threats: 0 },
    { day: "Tue", threats: 0 },
    { day: "Wed", threats: 0 },
    { day: "Thu", threats: 0 },
    { day: "Fri", threats: 0 },
    { day: "Sat", threats: 0 },
    { day: "Sun", threats: 0 },
  ]);

  useEffect(() => {

    const unsubscribe =
      listenDashboardData((dashboard: DashboardData) => {

        if (!dashboard.weeklyGraph) return;

        const days = [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ];

        const graph =
          dashboard.weeklyGraph.map((value, index) => ({
            day: days[index],
            threats: value,
          }));

        setData(graph);

      });

    return () => unsubscribe();

  }, []);

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* ================= BAR CHART ================= */}

      <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-white">

          Threat Frequency

        </h2>

        <p className="mt-2 text-slate-400">

          Weekly Threat Distribution

        </p>

        <div className="mt-6 h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={data}>

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
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="threats"
                fill="#8B5CF6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
            {/* ================= AREA CHART ================= */}

      <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-white">

          Threat Area Analysis

        </h2>

        <p className="mt-2 text-slate-400">

          Live Firebase Threat Monitoring

        </p>

        <div className="mt-6 h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="areaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#22D3EE"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor="#22D3EE"
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
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="threats"
                stroke="#22D3EE"
                strokeWidth={4}
                fill="url(#areaGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

export default StatisticsBarArea;