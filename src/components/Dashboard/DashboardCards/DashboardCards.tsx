import { useEffect, useState } from "react";

import {
  Shield,
  ShieldCheck,
  TriangleAlert,
  Activity,
} from "lucide-react";

import { listenDashboardData } from "../../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  protectedAssets: number;
  criticalAlerts: number;
  accuracy: number;
};

function DashboardCards() {

  const [dashboard, setDashboard] =
    useState<DashboardData>({
      threatsDetected: 0,
      protectedAssets: 0,
      criticalAlerts: 0,
      accuracy: 0,
    });

  useEffect(() => {

    const unsubscribe =
      listenDashboardData((data) => {

        setDashboard(data);

      });

    return () => unsubscribe();

  }, []);

  const cards = [

    {
      title: "Threats Detected",
      value: dashboard.threatsDetected,
      change: "+18%",
      color: "text-red-400",
      bg: "bg-red-500/10",
      icon: Shield,
    },

    {
      title: "Protected Assets",
      value: dashboard.protectedAssets,
      change: "+6%",
      color: "text-green-400",
      bg: "bg-green-500/10",
      icon: ShieldCheck,
    },

    {
      title: "Critical Alerts",
      value: dashboard.criticalAlerts,
      change: "-12%",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      icon: TriangleAlert,
    },

    {
      title: "AI Accuracy",
      value: `${dashboard.accuracy}%`,
      change: "+2%",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      icon: Activity,
    },

  ];

  return (

    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-3xl border border-[#2B3550] bg-[#111827]/90 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">

                  {card.title}

                </p>

                <h2
                  className={`mt-3 text-4xl font-bold ${card.color}`}
                >

                  {card.value}

                </h2>

                <p className="mt-3 text-sm text-green-400">

                  {card.change} Today

                </p>

              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg}`}
              >

                <Icon
                  size={30}
                  className={card.color}
                />

              </div>

            </div>

            <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: "78%" }}
              />

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default DashboardCards;