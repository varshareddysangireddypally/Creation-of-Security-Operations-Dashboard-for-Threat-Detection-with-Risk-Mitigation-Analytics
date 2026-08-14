import { useState } from "react";

import {
  ShieldCheck,
  Search,
  AlertTriangle,
  Globe,
  Lock,
  Bug,
  Shield,
} from "lucide-react";

import bgVideo from "../../assets/videos/api/Hologram HUD Animation.mp4";
import { useNotification } from "../../context/NotificationContext";
import { analyzeTarget } from "../../utils/penetrationAnalyzer";

function PenetrationTesting() {
  const { addNotification } = useNotification();

  // ============================
  // STATES
  // ============================

  const [target, setTarget] = useState("");

  const [loading, setLoading] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const [report, setReport] = useState("");

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("");

  const [risk, setRisk] = useState("");

  // ============================
  // START TEST
  // ============================

  const startTest = () => {

    if (!target.trim()) {

      alert("Please enter Target URL or IP Address.");

      return;

    }

    setLoading(true);

    setShowResult(false);

    setTimeout(() => {

      const result = analyzeTarget(target);

      setReport(result.report);

      setScore(result.score);

      setStatus(result.status);

      setRisk(result.risk);
      
addNotification(
  result.notificationTitle,
  result.notificationMessage,
  result.notificationType
);

      setLoading(false);

      setShowResult(true);

    }, 2500);

  };

  return (
        <div className="relative min-h-screen overflow-hidden bg-[#060B18] text-white">

      {/* Background Video */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      >

        <source
          src={bgVideo}
          type="video/mp4"
        />

      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-[#060B18]/75"></div>

      {/* Main Content */}

      <div className="relative z-10 ml-[88px] px-14 py-12">

        <div className="mx-auto max-w-[1550px]">

          {/* Heading */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-red-400">

              AI Penetration Testing

            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-400">

              Enterprise AI-powered penetration testing simulator that performs
              intelligent vulnerability assessment, security analysis,
              risk scoring, and generates professional penetration
              testing reports.

            </p>

          </div>

          {/* Search Box */}

          <div className="rounded-3xl border border-red-500/20 bg-[#111827]/80 p-8 backdrop-blur-xl">

            <label className="mb-4 block text-lg font-semibold">

              Target URL / Domain / IP Address

            </label>

            <div className="flex gap-5">

              <input

                value={target}

                onChange={(e) => setTarget(e.target.value)}

                placeholder="https://example.com   |   192.168.1.1"

                className="flex-1 rounded-xl border border-slate-700 bg-[#0B1220] px-6 py-4 text-lg outline-none transition-all duration-300 focus:border-red-500"

              />

              <button

                onClick={startTest}

                className="flex items-center gap-3 rounded-xl bg-red-600 px-10 py-4 font-semibold transition-all duration-300 hover:bg-red-500"

              >

                <Search size={22} />

                Analyze

              </button>

            </div>

          </div>

          {/* Loading */}

          {loading && (

            <div className="mt-10 rounded-3xl border border-red-500/20 bg-[#111827]/90 p-10">

              <div className="text-center">

                <ShieldCheck
                  size={70}
                  className="mx-auto animate-pulse text-red-400"
                />

                <h2 className="mt-6 text-3xl font-bold">

                  Running Enterprise Penetration Test

                </h2>

                <p className="mt-3 text-slate-400">

                  Initializing AI Security Engine...

                </p>

              </div>

              <div className="mt-10 h-3 overflow-hidden rounded-full bg-slate-800">

                <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>

              </div>

              <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">

                <div className="rounded-2xl bg-[#0B1220] p-5">

                  <Globe
                    size={32}
                    className="mb-3 text-cyan-400"
                  />

                  <h3 className="font-semibold">

                    Target Discovery

                  </h3>

                </div>

                <div className="rounded-2xl bg-[#0B1220] p-5">

                  <Shield
                    size={32}
                    className="mb-3 text-green-400"
                  />

                  <h3 className="font-semibold">

                    Port Enumeration

                  </h3>

                </div>

                <div className="rounded-2xl bg-[#0B1220] p-5">

                  <Bug
                    size={32}
                    className="mb-3 text-red-400"
                  />

                  <h3 className="font-semibold">

                    Vulnerability Detection

                  </h3>

                </div>

                <div className="rounded-2xl bg-[#0B1220] p-5">

                  <Lock
                    size={32}
                    className="mb-3 text-yellow-400"
                  />

                  <h3 className="font-semibold">

                    AI Risk Analysis

                  </h3>

                </div>

              </div>

            </div>

          )}

          {showResult && (
                        <>

              {/* ================= Dashboard Cards ================= */}

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Threat Score */}

                <div className="rounded-3xl border border-red-500/20 bg-[#111827]/90 p-7 shadow-lg">

                  <Bug
                    size={42}
                    className="mb-5 text-red-400"
                  />

                  <p className="text-sm uppercase tracking-widest text-slate-400">

                    Threat Score

                  </p>

                  <h2 className="mt-3 text-5xl font-bold text-red-400">

                    {score}/100

                  </h2>

                  <p className="mt-4 text-slate-500">

                    AI calculated cyber risk score.

                  </p>

                </div>

                {/* Security Status */}

                <div className="rounded-3xl border border-green-500/20 bg-[#111827]/90 p-7 shadow-lg">

                  <Shield
                    size={42}
                    className="mb-5 text-green-400"
                  />

                  <p className="text-sm uppercase tracking-widest text-slate-400">

                    Security Status

                  </p>

                  <h2
                    className={`mt-3 text-5xl font-bold ${
                      status === "SAFE"
                        ? "text-green-400"
                        : status === "LOW"
                        ? "text-yellow-300"
                        : status === "MEDIUM"
                        ? "text-orange-400"
                        : status === "HIGH"
                        ? "text-red-400"
                        : "text-red-600"
                    }`}
                  >

                    {status}

                  </h2>

                  <p className="mt-4 text-slate-500">

                    Final AI security assessment.

                  </p>

                </div>

                {/* Overall Risk */}

                <div className="rounded-3xl border border-cyan-500/20 bg-[#111827]/90 p-7 shadow-lg">

                  <Lock
                    size={42}
                    className="mb-5 text-cyan-400"
                  />

                  <p className="text-sm uppercase tracking-widest text-slate-400">

                    Overall Risk

                  </p>

                  <h2
                    className={`mt-3 text-5xl font-bold ${
                      risk === "MINIMAL"
                        ? "text-green-400"
                        : risk === "LOW"
                        ? "text-yellow-300"
                        : risk === "MEDIUM"
                        ? "text-orange-400"
                        : risk === "HIGH"
                        ? "text-red-400"
                        : "text-red-600"
                    }`}
                  >

                    {risk}

                  </h2>

                  <p className="mt-4 text-slate-500">

                    AI estimated organizational cyber risk.

                  </p>

                </div>

                {/* Target */}

                <div className="rounded-3xl border border-yellow-500/20 bg-[#111827]/90 p-7 shadow-lg">

                  <AlertTriangle
                    size={42}
                    className="mb-5 text-yellow-400"
                  />

                  <p className="text-sm uppercase tracking-widest text-slate-400">

                    Target

                  </p>

                  <h2 className="mt-3 break-all text-xl font-bold text-white">

                    {target}

                  </h2>

                  <p className="mt-4 text-slate-500">

                    Assessment completed successfully.

                  </p>

                </div>

              </div>
                            {/* ================= AI Penetration Report ================= */}

              <div className="mt-10 rounded-3xl border border-red-500/20 bg-[#111827]/90 p-8 shadow-lg">

                <div className="mb-6 flex items-center gap-4">

                  <ShieldCheck
                    size={42}
                    className="text-red-400"
                  />

                  <div>

                    <h2 className="text-3xl font-bold">

                      AI Penetration Testing Report

                    </h2>

                    <p className="text-slate-400">

                      Enterprise AI-generated vulnerability assessment report.

                    </p>

                  </div>

                </div>

                <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0B1220] p-6">

                  <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-green-300">

                    {report}

                  </pre>

                </div>

              </div>

              {/* ================= Executive Summary ================= */}

              <div className="mt-10">

                <h2 className="mb-6 text-3xl font-bold">

                  Executive Summary

                </h2>

                <div className="grid gap-6 lg:grid-cols-3">

                  <div className="rounded-3xl border border-cyan-500/20 bg-[#111827]/90 p-7">

                    <Globe
                      size={38}
                      className="mb-4 text-cyan-400"
                    />

                    <h3 className="text-xl font-semibold">

                      Target Assessment

                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">

                      The submitted target has been analyzed using the AI
                      penetration testing engine. Security posture,
                      configuration quality, exposure level and vulnerability
                      indicators were evaluated to determine overall cyber risk.

                    </p>

                  </div>

                  <div className="rounded-3xl border border-yellow-500/20 bg-[#111827]/90 p-7">

                    <AlertTriangle
                      size={38}
                      className="mb-4 text-yellow-400"
                    />

                    <h3 className="text-xl font-semibold">

                      Risk Analysis

                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">

                      AI calculated a comprehensive threat score by combining
                      vulnerability indicators, simulated penetration testing
                      findings, attack exposure and security configuration
                      analysis.

                    </p>

                  </div>

                  <div className="rounded-3xl border border-green-500/20 bg-[#111827]/90 p-7">

                    <Shield
                      size={38}
                      className="mb-4 text-green-400"
                    />

                    <h3 className="text-xl font-semibold">

                      Security Recommendation

                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">

                      Organizations should continuously monitor exposed assets,
                      patch outdated services, enforce strong authentication,
                      improve endpoint protection and conduct periodic
                      penetration testing to reduce cyber risk.

                    </p>

                  </div>

                </div>

              </div>
                            {/* ================= AI Recommendations ================= */}

              <div className="mt-10 rounded-3xl border border-red-500/20 bg-[#111827]/90 p-8 shadow-lg">

                <div className="mb-6 flex items-center gap-4">

                  <ShieldCheck
                    size={38}
                    className="text-red-400"
                  />

                  <h2 className="text-3xl font-bold">

                    AI Security Recommendations

                  </h2>

                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                  <div className="rounded-2xl bg-[#0B1220] p-6">

                    <h3 className="mb-4 text-xl font-semibold text-green-400">

                      Immediate Actions

                    </h3>

                    <ul className="space-y-3 text-slate-300">

                      <li>✔ Patch all vulnerable software and services.</li>

                      <li>✔ Enable Multi-Factor Authentication (MFA).</li>

                      <li>✔ Restrict unnecessary open ports.</li>

                      <li>✔ Enforce HTTPS with valid TLS certificates.</li>

                      <li>✔ Disable unused network services.</li>

                    </ul>

                  </div>

                  <div className="rounded-2xl bg-[#0B1220] p-6">

                    <h3 className="mb-4 text-xl font-semibold text-cyan-400">

                      Long-Term Improvements

                    </h3>

                    <ul className="space-y-3 text-slate-300">

                      <li>✔ Perform regular penetration testing.</li>

                      <li>✔ Deploy Endpoint Detection & Response (EDR).</li>

                      <li>✔ Continuously monitor security logs.</li>

                      <li>✔ Conduct employee security awareness training.</li>

                      <li>✔ Schedule periodic vulnerability assessments.</li>

                    </ul>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default PenetrationTesting;