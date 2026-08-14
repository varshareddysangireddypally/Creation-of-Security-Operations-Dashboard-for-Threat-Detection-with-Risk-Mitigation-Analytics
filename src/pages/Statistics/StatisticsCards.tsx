import { useEffect, useState } from "react";

import {
  ShieldAlert,
  ShieldCheck,
  Bug,
  Activity,
  TrendingUp,
} from "lucide-react";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  protectedAssets: number;
  blockedThreats: number;
  criticalAlerts: number;
  accuracy: number;
};

function StatisticsCards() {

  const [dashboard, setDashboard] =
    useState<DashboardData>({
      threatsDetected: 0,
      protectedAssets: 0,
      blockedThreats: 0,
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
      title: "Threats",
      value: dashboard.threatsDetected,
      color: "text-red-400",
      bg: "bg-red-500/10",
      icon: ShieldAlert,
    },

    {
      title: "Blocked",
      value: dashboard.blockedThreats,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      icon: Bug,
    },

    {
      title: "Assets",
      value: dashboard.protectedAssets,
      color: "text-green-400",
      bg: "bg-green-500/10",
      icon: ShieldCheck,
    },

    {
      title: "AI Accuracy",
      value: `${dashboard.accuracy}%`,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
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
            className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-6 shadow-xl backdrop-blur-xl"
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

                <div className="mt-3 flex items-center gap-2">

                  <TrendingUp
                    size={15}
                    className="text-green-400"
                  />

                  <span className="text-sm text-green-400">

                    Live

                  </span>

                </div>

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

            <div className="mt-6 h-2 rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${Math.min(
                    Number(card.value.toString().replace("%", "")),
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default StatisticsCards;