import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Header from "../../components/Layout/Header/Header";

import StatisticsCards from "./StatisticsCards";
import StatisticsLineChart from "./StatisticsLineChart";
import StatisticsBarArea from "./StatisticsBarArea";
import StatisticsPieRadar from "./StatisticsPieRadar";
import StatisticsProgress from "./StatisticsProgress";

function Statistics() {

  return (

    <div className="min-h-screen overflow-x-hidden bg-[#080D18]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div
        className="relative transition-all duration-500"
        style={{
          marginLeft: "88px",
        }}
      >

        {/* Header */}
        <Header />

        {/* Content */}
        <main
          className="relative mx-auto max-w-[1500px] px-14 py-12"
          style={{
            paddingRight: "120px",
          }}
        >

          {/* Page Title */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-white">

              Enterprise Security Statistics

            </h1>

            <p className="mt-3 text-lg text-slate-400">

              Live cybersecurity analytics powered by Firebase and Gemini AI.

            </p>

          </div>

          {/* Cards */}

          <StatisticsCards />

          {/* Charts */}

          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">

            <StatisticsLineChart />

            <StatisticsBarArea />

          </div>

          {/* Bottom */}

          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">

            <StatisticsPieRadar />

            <StatisticsProgress />

          </div>

        </main>

      </div>

    </div>

  );

}

export default Statistics;