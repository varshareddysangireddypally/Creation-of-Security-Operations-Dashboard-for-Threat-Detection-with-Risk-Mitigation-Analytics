import Header from "../../components/Layout/Header/Header";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import AIAssistant from "../../components/AI/AIAssistant";

import Hero from "../../components/Analytics/Hero";
import AnalyticsCards from "../../components/Analytics/AnalyticsCards";
import ThreatTrendChart from "../../components/Analytics/ThreatTrendChart";
import AttackSources from "../../components/Analytics/AttackSources";
import SeverityChart from "../../components/Analytics/SeverityChart";
import ThreatTimeline from "../../components/Analytics/ThreatTimeline";
import AIInsights from "../../components/Analytics/AIInsights";
import WorldMap from "../../components/Analytics/WorldMap";

import bgVideo from "../../assets/videos/api/Hologram HUD Animation.mp4";

function Analytics() {

  return (
        <div className="relative min-h-screen overflow-hidden bg-[#070B16]">

      {/* ================= BACKGROUND VIDEO ================= */}

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source
          src={bgVideo}
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-[#050913]/10" />

      {/* ================= HEADER ================= */}

      <Header />

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= CONTENT ================= */}

      <div
        className="relative transition-all duration-500"
        style={{
          marginLeft: "88px",
        }}
      >

      <main
        className="relative mx-auto max-w-[1500px] px-14 py-12"
        style={{
          paddingRight: "120px",
        }}
      >

        {/* Hero */}

        <Hero />

        {/* KPI Cards */}

        <div className="mt-8">

          <AnalyticsCards />

        </div>

        {/* Charts */}

        <div className="mt-8 grid grid-cols-12 gap-6">
                    {/* ================= THREAT TREND ================= */}

          <div className="col-span-8">

            <ThreatTrendChart />

          </div>

          {/* ================= WORLD MAP ================= */}

          <div className="col-span-4">

            <WorldMap />

          </div>

          {/* ================= ATTACK SOURCES ================= */}

          <div className="col-span-5">

            <AttackSources />

          </div>

          {/* ================= SEVERITY ================= */}

          <div className="col-span-7">

            <SeverityChart />

          </div>

        </div>

        {/* ================= TIMELINE & AI ================= */}

        <div className="mt-8 grid grid-cols-12 gap-6">
                    {/* ================= THREAT TIMELINE ================= */}

          <div className="col-span-7">

            <ThreatTimeline />

          </div>

          {/* ================= AI INSIGHTS ================= */}

          <div className="col-span-5">

            <AIInsights />

          </div>

        </div>

        {/* ================= AI COPILOT ================= */}

                <AIAssistant />

      </main>

    </div>

  </div>

  );

}

export default Analytics;