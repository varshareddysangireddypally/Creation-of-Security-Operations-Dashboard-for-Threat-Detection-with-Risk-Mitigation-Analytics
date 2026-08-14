import { useEffect, useState } from "react";

import {
  ShieldCheck,
  BrainCircuit,
  Activity,
} from "lucide-react";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  protectedAssets: number;
  accuracy: number;
  threatsDetected: number;
  criticalAlerts: number;
};

function Hero() {

  const [dashboard, setDashboard] =
    useState<DashboardData>({
      protectedAssets: 0,
      accuracy: 0,
      threatsDetected: 0,
      criticalAlerts: 0,
    });

  useEffect(() => {

    const unsubscribe =
      listenDashboardData((data) => {

        setDashboard(data);

      });

    return () => unsubscribe();

  }, []);

  const threatScore = Math.min(
    100,
    Math.round(
      (dashboard.criticalAlerts /
        Math.max(dashboard.threatsDetected, 1)) *
        100 +
        80
    )
  );

  return (
        <section className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-[#0F172A]/75 p-10 backdrop-blur-xl">

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 flex items-center justify-between">

        <div className="w-full max-w-full">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/15 p-3">

              <ShieldCheck
                size={24}
                className="text-cyan-400"
              />

            </div>

            <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm font-medium text-green-400">

              ● Live Security Monitoring

            </span>

          </div>

          <h1 className="text-5xl font-bold leading-tight text-white break-words">

            Enterprise

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">

              {" "}Threat Analytics

            </span>

          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">

            Monitor attack trends, investigate security events,
            visualize AI predictions and analyze enterprise cyber
            threats in real time using Gemini AI and Google Cloud.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-5">

              <h3 className="text-sm text-slate-300">

                Protected Assets

              </h3>

              <h2 className="mt-2 text-3xl font-bold text-white">

                {dashboard.protectedAssets}

              </h2>

              <p className="mt-1 text-sm text-cyan-400">

                Live Firebase Data

              </p>

            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-6 py-5">

              <div className="mb-3">

                <BrainCircuit
                  size={24}
                  className="text-violet-400"
                />

              </div>

              <h3 className="text-sm text-slate-300">

                AI Detection Accuracy

              </h3>

              <h2 className="mt-2 text-3xl font-bold text-white">

                {dashboard.accuracy}%

              </h2>

              <p className="mt-1 text-sm text-violet-400">

                Gemini AI Powered

              </p>

            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-5">

              <div className="mb-3">

                <Activity
                  size={24}
                  className="text-green-400"
                />

              </div>

              <h3 className="text-sm text-slate-300">

                Threat Response

              </h3>

              <h2 className="mt-2 text-3xl font-bold text-white">

                0.42s

              </h2>

              <p className="mt-1 text-sm text-green-400">

                Average Detection Time

              </p>

            </div>

          </div>

        </div>

        <div className="w-[380px] rounded-3xl border border-cyan-500/20 bg-[#131D33]/80 p-8 shadow-2xl backdrop-blur-xl">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/15 p-3">

              <BrainCircuit
                size={24}
                className="text-cyan-400"
              />

            </div>

            <h3 className="text-xl font-semibold text-white">

              AI Security Intelligence

            </h3>

          </div>

          <div className="space-y-5">

            <div className="rounded-2xl bg-[#1A2743] p-5">

              <p className="text-sm text-slate-400">

                Threat Score

              </p>

              <h2 className="mt-2 text-4xl font-bold text-cyan-400">

                {threatScore}%

              </h2>

            </div>

            <div className="rounded-2xl bg-[#1A2743] p-5">

              <p className="text-sm text-slate-400">

                AI Recommendation

              </p>

              <p className="mt-3 text-sm leading-7 text-slate-300">

                Live enterprise threat intelligence is being analysed continuously.
                The AI engine recommends monitoring phishing campaigns,
                suspicious login attempts, malicious URLs and abnormal
                network behaviour. Dashboard statistics are updated
                automatically from Firebase every few seconds.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;