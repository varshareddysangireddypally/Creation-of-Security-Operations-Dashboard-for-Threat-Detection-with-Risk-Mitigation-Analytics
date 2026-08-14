import {
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

function AIInsights() {

  return (
        <div className="rounded-[28px] border border-[#26324A] bg-[#101827]/85 p-6 shadow-2xl backdrop-blur-xl">

      {/* ================= HEADER ================= */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            AI Security Insights

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Enterprise intelligence powered by Gemini AI

          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-sm font-medium text-green-400">

            Gemini Online

          </span>

        </div>

      </div>

      {/* ================= AI SCORE ================= */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/15 p-4">

            <BrainCircuit
              size={34}
              className="text-cyan-400"
            />

          </div>

          <div>

            <p className="text-sm text-slate-400">

              AI Threat Confidence

            </p>

            <h2 className="mt-2 text-5xl font-bold text-cyan-400">

              98.7%

            </h2>

          </div>

        </div>

      </div>

      {/* ================= QUICK INSIGHTS ================= */}

      <div className="mt-8 space-y-5">
                {/* ================= RECOMMENDATION ================= */}

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

          <div className="flex items-center gap-3">

            <Sparkles
              size={22}
              className="text-violet-400"
            />

            <h3 className="text-lg font-semibold text-white">

              AI Recommendation

            </h3>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">

            Gemini AI has detected an increase in phishing campaigns and
            credential-based attacks. Strengthen email filtering, enforce
            Multi-Factor Authentication (MFA), and review firewall policies
            to reduce organizational risk.

          </p>

        </div>

        {/* ================= TREND ================= */}

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <div className="flex items-center gap-3">

            <TrendingUp
              size={22}
              className="text-green-400"
            />

            <h3 className="text-lg font-semibold text-white">

              Threat Prediction

            </h3>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">

            Based on the last seven days of telemetry, AI predicts a
            moderate increase in phishing and malicious URL activity over
            the next 24 hours. Continuous monitoring is recommended.

          </p>

        </div>

        {/* ================= SECURITY STATUS ================= */}

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={22}
              className="text-cyan-400"
            />

            <h3 className="text-lg font-semibold text-white">

              Security Posture

            </h3>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">

            Overall enterprise security posture is stable. Endpoint
            protection, firewall rules, and AI-assisted monitoring are
            functioning normally with no critical infrastructure failures.

          </p>

        </div>

      </div>

    </div>

  );

}

export default AIInsights;