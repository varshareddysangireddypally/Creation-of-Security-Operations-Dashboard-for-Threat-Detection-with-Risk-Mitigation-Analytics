import Header from "../../components/Layout/Header/Header";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import DashboardCards from "../../components/Dashboard/DashboardCards/DashboardCards";
import ThreatChart from "../../components/Dashboard/ThreatChart/ThreatChart";
import AIAssistant from "../../components/AI/AIAssistant";
import { useUser } from "../../context/UserContext";

import dashboardVideo from "../../assets/videos/upload/Futuristic Blue Particles.mp4";
import { useEffect } from "react";
import { updateLiveData } from "../../services/liveData";

function Dashboard() {

  const { userName } = useUser();
  useEffect(() => {

  updateLiveData();

  const timer = setInterval(() => {

    updateLiveData();

  }, 5000);

  return () => clearInterval(timer);

}, []);

  return (
        <div className="min-h-screen overflow-x-hidden bg-[#080D18]">

      {/* ================= BACKGROUND ================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-40"
      >

        <source
          src={dashboardVideo}
          type="video/mp4"
        />

      </video>

      <div className="fixed inset-0 bg-gradient-to-b from-[#080D18]/25 via-[#080D18]/15 to-[#080D18]/35" />

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN ================= */}

      <div
        className="relative transition-all duration-500"
        style={{
          marginLeft: "88px",
        }}
      >

        <Header />

        <main
          className="relative mx-auto max-w-[1500px] px-14 py-12"
          style={{
            paddingRight: "120px",
          }}
        >

          {/* ================= HERO ================= */}

          <section className="rounded-[34px] border border-[#26324A] bg-[#111827]/75 px-12 py-12 backdrop-blur-2xl">

            <p className="text-[13px] font-semibold uppercase tracking-[9px] text-cyan-400">

              Enterprise AI Security Platform

            </p>

            <h1 className="mt-7 text-[56px] font-semibold leading-none text-white">

              Welcome,

              <span className="ml-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">

                {userName}

              </span>

            </h1>

            <p className="mt-8 max-w-5xl text-[21px] leading-10 text-slate-300">

              Monitor cyber threats, investigate incidents,
              detect anomalies, receive intelligent AI recommendations,
              manage cloud security and analyze enterprise
              infrastructure with Gemini AI.

            </p>

          </section>

          {/* ================= KPI ================= */}

          <div className="mt-14">

            <DashboardCards />

          </div>

          {/* ================= GAP ================= */}

          <div className="h-28" />
                    {/* ================= THREAT ANALYTICS ================= */}

          <section className="mb-16">

            <div className="mb-8 flex items-end justify-between">

              <div>

                <p className="text-sm uppercase tracking-[6px] text-cyan-400">

                  Analytics

                </p>

                <h2 className="mt-3 text-[34px] font-semibold text-white">

                  Threat Analytics

                </h2>

                <p className="mt-2 text-[16px] text-slate-400">

                  Live enterprise security monitoring powered by AI.

                </p>

              </div>

              <button className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20">

                View Full Report

              </button>

            </div>

            <div className="rounded-[30px] border border-[#26324A] bg-[#111827]/75 p-8 backdrop-blur-xl">

              <ThreatChart />

            </div>

          </section>

          {/* ================= BOTTOM ================= */}

          <section className="grid grid-cols-12 gap-10">

            {/* Alerts */}

            <div className="col-span-8 rounded-[30px] border border-[#26324A] bg-[#111827]/75 p-9 backdrop-blur-xl">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <p className="text-sm uppercase tracking-[5px] text-red-400">

                    Live Feed

                  </p>

                  <h2 className="mt-2 text-[30px] font-semibold text-white">

                    Recent Threat Alerts

                  </h2>

                </div>

                <span className="rounded-full bg-red-500/15 px-5 py-2 text-sm font-medium text-red-400">

                  LIVE

                </span>

              </div>

              <div className="space-y-6">
                                {/* Alert 1 */}

                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 transition hover:border-red-400">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-[20px] font-semibold text-white">

                        Suspicious Login Attempt

                      </h3>

                      <p className="mt-2 text-[15px] text-slate-400">

                        Linux Server • Hyderabad • 192.168.10.24

                      </p>

                    </div>

                    <span className="rounded-full bg-red-500/20 px-5 py-2 text-red-400">

                      Critical

                    </span>

                  </div>

                </div>

                {/* Alert 2 */}

                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 transition hover:border-orange-400">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-[20px] font-semibold text-white">

                        Malware Activity Detected

                      </h3>

                      <p className="mt-2 text-[15px] text-slate-400">

                        Trojan.Win32 detected on endpoint

                      </p>

                    </div>

                    <span className="rounded-full bg-orange-500/20 px-5 py-2 text-orange-400">

                      High

                    </span>

                  </div>

                </div>

                {/* Alert 3 */}

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition hover:border-cyan-400">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-[20px] font-semibold text-white">

                        AI Threat Prediction

                      </h3>

                      <p className="mt-2 text-[15px] text-slate-400">

                        Possible phishing campaign detected

                      </p>

                    </div>

                    <span className="rounded-full bg-cyan-500/20 px-5 py-2 text-cyan-400">

                      Medium

                    </span>

                  </div>

                </div>

                {/* Alert 4 */}

                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 transition hover:border-green-400">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-[20px] font-semibold text-white">

                        Firewall Updated

                      </h3>

                      <p className="mt-2 text-[15px] text-slate-400">

                        Google Cloud Security Center

                      </p>

                    </div>

                    <span className="rounded-full bg-green-500/20 px-5 py-2 text-green-400">

                      Protected

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="col-span-4">

              <div className="rounded-[30px] border border-[#26324A] bg-[#111827]/75 p-9 backdrop-blur-xl">

                <p className="text-sm uppercase tracking-[6px] text-violet-400">

                  AI Summary

                </p>

                <h2 className="mt-3 text-[30px] font-semibold text-white">

                  Threat Overview

                </h2>

                <div className="mt-10 space-y-8">

                  <div>

                    <p className="text-slate-400">

                      Total Threats

                    </p>

                    <h2 className="mt-2 text-4xl font-semibold text-red-400">

                      1,254

                    </h2>

                  </div>

                  <div>

                    <p className="text-slate-400">

                      Critical Alerts

                    </p>

                    <h2 className="mt-2 text-4xl font-semibold text-orange-400">

                      86

                    </h2>

                  </div>

                  <div>

                    <p className="text-slate-400">

                      Protected Assets

                    </p>

                    <h2 className="mt-2 text-4xl font-semibold text-green-400">

                      542

                    </h2>

                  </div>

                  <div className="rounded-2xl bg-violet-600/10 p-6">

                    <h3 className="text-lg font-semibold text-violet-300">

                      AI Recommendation

                    </h3>

                    <p className="mt-4 text-[15px] leading-8 text-slate-300">

                      Enable MFA, isolate suspicious endpoints,
                      investigate failed logins and review
                      firewall activity for unusual behavior.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          <div className="h-32" />

          <AIAssistant />

        </main>

      </div>

    </div>

  );

}

export default Dashboard;