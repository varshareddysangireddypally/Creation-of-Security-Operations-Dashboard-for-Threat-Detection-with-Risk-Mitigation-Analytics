import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  blockedThreats: number;
  criticalAlerts: number;
  protectedAssets: number;
  accuracy: number;
};

function StatisticsPieRadar() {

  const [pieData, setPieData] = useState([
    {
      name: "Threats",
      value: 0,
    },
    {
      name: "Blocked",
      value: 0,
    },
    {
      name: "Critical",
      value: 0,
    },
  ]);

  const [radarData, setRadarData] = useState([
    {
      subject: "Threats",
      value: 0,
    },
    {
      subject: "Blocked",
      value: 0,
    },
    {
      subject: "Critical",
      value: 0,
    },
    {
      subject: "Assets",
      value: 0,
    },
    {
      subject: "AI",
      value: 0,
    },
  ]);

  useEffect(() => {

    const unsubscribe =
      listenDashboardData((data: DashboardData) => {

        setPieData([
          {
            name: "Threats",
            value: data.threatsDetected,
          },
          {
            name: "Blocked",
            value: data.blockedThreats,
          },
          {
            name: "Critical",
            value: data.criticalAlerts,
          },
        ]);

        setRadarData([
          {
            subject: "Threats",
            value: data.threatsDetected / 20,
          },
          {
            subject: "Blocked",
            value: data.blockedThreats / 20,
          },
          {
            subject: "Critical",
            value: data.criticalAlerts,
          },
          {
            subject: "Assets",
            value: data.protectedAssets / 10,
          },
          {
            subject: "AI",
            value: data.accuracy,
          },
        ]);

      });

    return () => unsubscribe();

  }, []);

  const COLORS = [
    "#22D3EE",
    "#10B981",
    "#EF4444",
  ];

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* PIE CHART */}

      <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-white">

          Threat Distribution

        </h2>

        <p className="mt-2 text-slate-400">

          Live Firebase Data

        </p>

        <div className="mt-6 h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {pieData.map((_, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #2B3550",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>
            {/* ================= RADAR CHART ================= */}

      <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-white">

          AI Security Radar

        </h2>

        <p className="mt-2 text-slate-400">

          Live Enterprise Security Metrics

        </p>

        <div className="mt-6 h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <RadarChart
              data={radarData}
            >

              <PolarGrid
                stroke="#334155"
              />

              <PolarAngleAxis
                dataKey="subject"
                stroke="#CBD5E1"
              />

              <PolarRadiusAxis
                stroke="#64748B"
              />

              <Radar
                name="Security"
                dataKey="value"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.45}
                strokeWidth={3}
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #2B3550",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

            </RadarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

export default StatisticsPieRadar;