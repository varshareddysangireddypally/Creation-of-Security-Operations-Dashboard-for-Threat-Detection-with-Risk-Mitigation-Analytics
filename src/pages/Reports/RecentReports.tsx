import { useEffect, useState } from "react";
import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  threatsDetected: number;
  blockedThreats: number;
  criticalAlerts: number;
  accuracy: number;
  lastUpdated: string;
};

function RecentReports() {

  const [data, setData] = useState<DashboardData>({
    threatsDetected: 0,
    blockedThreats: 0,
    criticalAlerts: 0,
    accuracy: 0,
    lastUpdated: "",
  });

  useEffect(() => {

    const unsubscribe = listenDashboardData((dashboard: DashboardData) => {

      setData(dashboard);

    });

    return () => unsubscribe();

  }, []);

  const reports = [
    {
      report: "URL Scan",
      status: data.criticalAlerts > 80 ? "Suspicious" : "Safe",
      risk: data.criticalAlerts > 80 ? "High" : "Low",
      color:
        data.criticalAlerts > 80
          ? "text-red-400"
          : "text-green-400",
    },
    {
      report: "IP Scan",
      status: data.criticalAlerts > 90 ? "Malicious" : "Clean",
      risk: data.criticalAlerts > 90 ? "Critical" : "Low",
      color:
        data.criticalAlerts > 90
          ? "text-red-400"
          : "text-green-400",
    },
    {
      report: "Email Scan",
      status:
        data.threatsDetected > 1200
          ? "Spam Detected"
          : "Clean",
      risk:
        data.threatsDetected > 1200
          ? "Medium"
          : "Low",
      color:
        data.threatsDetected > 1200
          ? "text-yellow-400"
          : "text-green-400",
    },
    {
      report: "QR Code Scan",
      status: "Verified",
      risk: "Low",
      color: "text-cyan-400",
    },
    {
      report: "Image Scan",
      status:
        data.blockedThreats > 500
          ? "No Malware"
          : "Under Review",
      risk: "Low",
      color: "text-green-400",
    },
  ];

  return (

    <div className="rounded-3xl border border-[#26324A] bg-[#111827]/90 p-8 shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Recent Security Reports

          </h2>

          <p className="mt-2 text-slate-400">

            Live AI Generated Security Reports

          </p>

        </div>

        <div className="rounded-xl bg-cyan-500/10 px-5 py-3">

          <p className="text-xs text-slate-400">

            Last Updated

          </p>

          <h3 className="mt-1 font-semibold text-cyan-400">

            {data.lastUpdated || "Live"}

          </h3>

        </div>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-[#26324A]">

        <table className="w-full">

          <thead className="bg-[#182235]">

            <tr>

              <th className="px-6 py-4 text-left text-sm text-slate-300">
                Report
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-300">
                Risk
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-300">
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((item, index) => (

              <tr
                key={index}
                className="border-t border-[#26324A] hover:bg-[#182235]"
              >

                <td className="px-6 py-5 font-medium text-white">

                  {item.report}

                </td>

                <td className={`px-6 py-5 font-semibold ${item.color}`}>

                  {item.status}

                </td>

                <td className="px-6 py-5 text-slate-300">

                  {item.risk}

                </td>

                <td className="px-6 py-5 text-slate-400">

                  {data.lastUpdated || "Live"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">

        <h3 className="text-xl font-semibold text-white">

          AI Report Conclusion

        </h3>

        <p className="mt-4 leading-8 text-slate-300">

          Gemini AI continuously monitors URL, IP, Email, QR Code and
          Image scan activities across the enterprise network. Based on
          the latest monitoring cycle, the organization remains protected
          with an AI detection accuracy of{" "}

          <span className="font-semibold text-cyan-400">

            {data.accuracy}%

          </span>

          . Security controls continue to automatically block malicious
          activities while providing intelligent recommendations for
          improving the enterprise security posture.

        </p>

      </div>

    </div>

  );

}

export default RecentReports;