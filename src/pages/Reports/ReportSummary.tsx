import { useEffect, useState } from "react";
import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  blockedThreats: number;
  protectedAssets: number;
  criticalAlerts: number;
  accuracy: number;
  lastUpdated: string;
};

function ReportSummary() {

  const [report, setReport] = useState<DashboardData>({
    threatsDetected: 0,
    blockedThreats: 0,
    protectedAssets: 0,
    criticalAlerts: 0,
    accuracy: 0,
    lastUpdated: "",
  });

  useEffect(() => {

    const unsubscribe = listenDashboardData((data: DashboardData) => {

      setReport(data);

    });

    return () => unsubscribe();

  }, []);

  return (

    <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-8 shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Executive Security Report

          </h2>

          <p className="mt-2 text-slate-400">

            AI Generated Enterprise Threat Summary

          </p>

        </div>

        <div className="rounded-xl bg-cyan-500/10 px-5 py-3">

          <p className="text-xs text-slate-400">

            Report ID

          </p>

          <h3 className="mt-1 text-lg font-bold text-cyan-400">

            REP-2026-001

          </h3>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div className="rounded-2xl bg-[#182235] p-5">

          <p className="text-slate-400">

            Threats Detected

          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-400">

            {report.threatsDetected}

          </h2>

        </div>

        <div className="rounded-2xl bg-[#182235] p-5">

          <p className="text-slate-400">

            Blocked Threats

          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-400">

            {report.blockedThreats}

          </h2>

        </div>

        <div className="rounded-2xl bg-[#182235] p-5">

          <p className="text-slate-400">

            Protected Assets

          </p>

          <h2 className="mt-2 text-4xl font-bold text-cyan-400">

            {report.protectedAssets}

          </h2>

        </div>

        <div className="rounded-2xl bg-[#182235] p-5">

          <p className="text-slate-400">

            AI Detection Accuracy

          </p>

          <h2 className="mt-2 text-4xl font-bold text-violet-400">

            {report.accuracy}%

          </h2>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">

        <h3 className="text-xl font-semibold text-white">

          Executive Summary

        </h3>

        <p className="mt-4 leading-8 text-slate-300">

          During the latest monitoring session, the AI Security Engine detected{" "}

          <span className="font-semibold text-red-400">

            {report.threatsDetected}

          </span>{" "}

          cyber threats across the enterprise environment.

          <br />
          <br />

          The platform successfully blocked{" "}

          <span className="font-semibold text-green-400">

            {report.blockedThreats}

          </span>{" "}

          malicious activities while continuously protecting{" "}

          <span className="font-semibold text-cyan-400">

            {report.protectedAssets}

          </span>{" "}

          enterprise assets.

          <br />
          <br />

          Gemini AI achieved an overall detection accuracy of{" "}

          <span className="font-semibold text-violet-400">

            {report.accuracy}%

          </span>{" "}

          with continuous real-time monitoring and intelligent threat analysis.

        </p>

      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#26324A] pt-5">

        <span className="text-slate-400">

          Report Generated

        </span>

        <span className="font-semibold text-cyan-400">

          {report.lastUpdated || "Live"}

        </span>

      </div>

    </div>

  );

}

export default ReportSummary;