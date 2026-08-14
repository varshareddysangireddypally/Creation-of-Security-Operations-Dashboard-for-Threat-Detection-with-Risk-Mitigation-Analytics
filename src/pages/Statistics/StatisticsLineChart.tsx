import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  weeklyGraph: number[];
};

function StatisticsLineChart() {

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

    <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-7 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-white">

          Weekly Threat Trend

        </h2>

        <p className="mt-2 text-slate-400">

          Live Firebase Statistics

        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

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

            <Line
              type="monotone"
              dataKey="threats"
              stroke="#22D3EE"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#22D3EE",
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default StatisticsLineChart;