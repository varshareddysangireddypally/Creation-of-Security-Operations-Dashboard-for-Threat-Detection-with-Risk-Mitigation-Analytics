import { useEffect, useState } from "react";

import {
  ShieldAlert,
  Bug,
  ShieldCheck,
  Activity,
  TrendingUp,
} from "lucide-react";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  protectedAssets: number;
  criticalAlerts: number;
  blockedThreats: number;
  accuracy: number;
};

function AnalyticsCards() {

  const [dashboard, setDashboard] = useState<DashboardData>({
    threatsDetected: 0,
    protectedAssets: 0,
    criticalAlerts: 0,
    blockedThreats: 0,
    accuracy: 0,
  });

  useEffect(() => {

    const unsubscribe = listenDashboardData((data) => {

      setDashboard(data);

    });

    return () => unsubscribe();

  }, []);

  const cards = [

    {
      title: "Threats Detected",
      value: dashboard.threatsDetected,
      change: "+18%",
      color: "cyan",
      icon: ShieldAlert,
    },

    {
      title: "Malware Blocked",
      value: dashboard.blockedThreats,
      change: "+12%",
      color: "red",
      icon: Bug,
    },

    {
      title: "Protected Assets",
      value: dashboard.protectedAssets,
      change: "99.8%",
      color: "green",
      icon: ShieldCheck,
    },

    {
      title: "AI Detection",
      value: `${dashboard.accuracy}%`,
      change: "+2.4%",
      color: "violet",
      icon: Activity,
    },

  ];

  return (

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => {

        const Icon = card.icon;

        const colorClasses = {
          cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
          red: "border-red-500/20 bg-red-500/10 text-red-400",
          green: "border-green-500/20 bg-green-500/10 text-green-400",
          violet: "border-violet-500/20 bg-violet-500/10 text-violet-400",
        };

        const color =
          colorClasses[card.color as keyof typeof colorClasses];

        return (

          <div
            key={index}
            className="group rounded-3xl border border-[#26324A] bg-[#121B2E]/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">

                  {card.title}

                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">

                  {card.value}

                </h2>

                <div className="mt-4 flex items-center gap-2">

                  <TrendingUp
                    size={16}
                    className="text-green-400"
                  />

                  <span className="text-sm font-medium text-green-400">

                    {card.change}

                  </span>

                  <span className="text-sm text-slate-500">

                    vs last week

                  </span>

                </div>

              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${color}`}
              >

                <Icon size={30} />

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#25314A] pt-4">

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs text-slate-400">

                  Live Monitoring

                </span>

              </div>

              <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">

                AI Prediction

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default AnalyticsCards;