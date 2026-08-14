import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [

  {
    level: "Critical",
    threats: 92,
    color: "#EF4444",
  },

  {
    level: "High",
    threats: 68,
    color: "#F97316",
  },

  {
    level: "Medium",
    threats: 43,
    color: "#EAB308",
  },

  {
    level: "Low",
    threats: 18,
    color: "#22C55E",
  },

];

function SeverityChart() {

  return (
        <div className="rounded-[28px] border border-[#26324A] bg-[#101827]/85 p-6 shadow-2xl backdrop-blur-xl">

      {/* ================= HEADER ================= */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Threat Severity Analysis

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Classification of detected threats by severity

          </p>

        </div>

        <div className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">

          AI Classification

        </div>

      </div>

      {/* ================= BAR CHART ================= */}

      <div className="h-[340px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              stroke="#26324A"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="level"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #26324A",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="threats"
              radius={[10, 10, 0, 0]}
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))}
                          </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* ================= AI SUMMARY ================= */}

      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

          <p className="text-sm text-slate-400">

            Critical Threats

          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-400">

            92

          </h3>

          <p className="mt-1 text-xs text-slate-500">

            Immediate Action Required

          </p>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <p className="text-sm text-slate-400">

            AI Risk Level

          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-400">

            Moderate

          </h3>

          <p className="mt-1 text-xs text-slate-500">

            Overall Infrastructure Health

          </p>

        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

        <h3 className="text-lg font-semibold text-white">

          Gemini AI Recommendation

        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">

          The majority of incidents fall into the Critical and High severity
          categories. Prioritize isolating affected systems, enable continuous
          monitoring, enforce Multi-Factor Authentication (MFA), and strengthen
          endpoint protection to reduce the overall cyber risk.

        </p>

      </div>

    </div>

  );

}

export default SeverityChart;