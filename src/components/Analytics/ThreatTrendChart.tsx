import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  weeklyGraph: number[];
  accuracy: number;
};

function ThreatTrendChart() {

  const [chartData, setChartData] = useState([
    { day: "Mon", threats: 24 },
    { day: "Tue", threats: 38 },
    { day: "Wed", threats: 31 },
    { day: "Thu", threats: 56 },
    { day: "Fri", threats: 42 },
    { day: "Sat", threats: 61 },
    { day: "Sun", threats: 48 },
  ]);

  const [highest, setHighest] = useState(61);
  const [average, setAverage] = useState(43);
  const [accuracy, setAccuracy] = useState(98.7);

  useEffect(() => {

    const unsubscribe = listenDashboardData((data: DashboardData) => {

      if (!data.weeklyGraph) return;

      const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ];

      const graph = data.weeklyGraph.map((value, index) => ({
        day: days[index],
        threats: value,
      }));

      setChartData(graph);

      setHighest(Math.max(...data.weeklyGraph));

      const avg =
        data.weeklyGraph.reduce((a, b) => a + b, 0) /
        data.weeklyGraph.length;

      setAverage(Math.round(avg));

      setAccuracy(data.accuracy);

    });

    return () => unsubscribe();

  }, []);

  return (

    <div className="rounded-[28px] border border-[#26324A] bg-[#101827]/85 p-6 shadow-2xl backdrop-blur-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Threat Trend Analysis
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            AI-powered cyber threat monitoring for the last 7 days
          </p>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
          Live Data
        </div>

      </div>

      <div className="h-[360px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              stroke="#26324A"
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
                border: "1px solid #26324A",
                borderRadius: "16px",
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

      <div className="mt-8 grid grid-cols-3 gap-5">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <p className="text-sm text-slate-400">
            Highest Threats
          </p>

          <h3 className="mt-2 text-3xl font-bold text-cyan-400">
            {highest}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Live Data
          </p>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <p className="text-sm text-slate-400">
            Average / Day
          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-400">
            {average}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Last 7 Days
          </p>

        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

          <p className="text-sm text-slate-400">
            AI Confidence
          </p>

          <h3 className="mt-2 text-3xl font-bold text-violet-400">
            {accuracy}%
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Gemini AI
          </p>

        </div>

      </div>

    </div>

  );

}

export default ThreatTrendChart;