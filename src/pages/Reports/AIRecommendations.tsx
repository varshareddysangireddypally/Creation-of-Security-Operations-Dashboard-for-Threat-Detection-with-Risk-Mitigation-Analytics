import { useEffect, useState } from "react";
import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  blockedThreats: number;
  criticalAlerts: number;
  accuracy: number;
};

function AIRecommendations() {

  const [data, setData] = useState<DashboardData>({
    threatsDetected: 0,
    blockedThreats: 0,
    criticalAlerts: 0,
    accuracy: 0,
  });

  useEffect(() => {

    const unsubscribe = listenDashboardData((dashboard: DashboardData) => {

      setData(dashboard);

    });

    return () => unsubscribe();

  }, []);

  const riskLevel =
    data.criticalAlerts >= 100
      ? "HIGH"
      : data.criticalAlerts >= 70
      ? "MEDIUM"
      : "LOW";

  const riskColor =
    riskLevel === "HIGH"
      ? "text-red-400"
      : riskLevel === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  return (

    <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-8 shadow-xl">

      <h2 className="text-2xl font-bold text-white">

        AI Recommendations

      </h2>

      <p className="mt-2 text-slate-400">

        Gemini AI Security Advisor

      </p>

      <div className="mt-8 space-y-4">

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          ✅ Enable Multi-Factor Authentication (MFA) for all users.

        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

          🚫 Block suspicious IP addresses identified during monitoring.

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          🛡 Update firewall rules and endpoint protection policies.

        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

          📧 Strengthen phishing email protection and spam filtering.

        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">

          🔄 Schedule automatic vulnerability scans every 24 hours.

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">

        <h3 className="text-xl font-semibold text-white">

          Enterprise Security Assessment

        </h3>

        <div className="mt-5 space-y-3">

          <div className="flex justify-between">

            <span className="text-slate-300">

              Threats Detected

            </span>

            <span className="font-bold text-red-400">

              {data.threatsDetected}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-300">

              Blocked Threats

            </span>

            <span className="font-bold text-green-400">

              {data.blockedThreats}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-300">

              AI Detection Accuracy

            </span>

            <span className="font-bold text-cyan-400">

              {data.accuracy}%

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-300">

              Risk Level

            </span>

            <span className={`font-bold ${riskColor}`}>

              {riskLevel}

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIRecommendations;