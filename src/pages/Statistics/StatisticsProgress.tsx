import { useEffect, useState } from "react";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  accuracy: number;
  threatsDetected: number;
  blockedThreats: number;
  protectedAssets: number;
  criticalAlerts: number;
};

function StatisticsProgress() {

  const [dashboard, setDashboard] =
    useState<DashboardData>({
      accuracy: 0,
      threatsDetected: 0,
      blockedThreats: 0,
      protectedAssets: 0,
      criticalAlerts: 0,
    });

  useEffect(() => {

    const unsubscribe =
      listenDashboardData((data) => {

        setDashboard(data);

      });

    return () => unsubscribe();

  }, []);

  const progress = [

    {
      title: "AI Detection Accuracy",
      value: dashboard.accuracy,
      color: "bg-cyan-500",
      suffix: "%",
    },

    {
      title: "Threat Detection",
      value: Math.min(
        100,
        Math.round(
          dashboard.threatsDetected / 20
        )
      ),
      color: "bg-red-500",
      suffix: "%",
    },

    {
      title: "Blocked Threats",
      value: Math.min(
        100,
        Math.round(
          dashboard.blockedThreats / 20
        )
      ),
      color: "bg-green-500",
      suffix: "%",
    },

    {
      title: "Protected Assets",
      value: Math.min(
        100,
        Math.round(
          dashboard.protectedAssets / 10
        )
      ),
      color: "bg-violet-500",
      suffix: "%",
    },

    {
      title: "Critical Alerts",
      value: Math.min(
        100,
        dashboard.criticalAlerts
      ),
      color: "bg-orange-500",
      suffix: "%",
    },

  ];

  return (

    <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-8 shadow-xl">

      <h2 className="text-2xl font-bold text-white">

        Live Security Progress

      </h2>

      <p className="mt-2 text-slate-400">

        Enterprise Cyber Security Health

      </p>

      <div className="mt-8 space-y-6">

        {progress.map((item) => (

          <div
            key={item.title}
          >

            <div className="mb-2 flex items-center justify-between">

              <span className="text-slate-300">

                {item.title}

              </span>

              <span className="font-bold text-white">

                {item.value}
                {item.suffix}

              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-700">

              <div
                className={`h-3 rounded-full transition-all duration-700 ${item.color}`}
                style={{
                  width: `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default StatisticsProgress;