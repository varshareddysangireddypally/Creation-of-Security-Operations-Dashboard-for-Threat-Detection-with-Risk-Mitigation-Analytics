import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Phishing",
    value: 35,
  },
  {
    name: "Malware",
    value: 25,
  },
  {
    name: "DDoS",
    value: 18,
  },
  {
    name: "Ransomware",
    value: 12,
  },
  {
    name: "Insider",
    value: 10,
  },
];

const COLORS = [
  "#06B6D4",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

function AttackSources() {

  return (
        <div className="rounded-[28px] border border-[#26324A] bg-[#101827]/85 p-6 shadow-2xl backdrop-blur-xl">

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">

            Attack Sources

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Distribution of detected cyber attacks

          </p>

        </div>

        <div className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">

          Live Feed

        </div>

      </div>

      {/* ================= PIE CHART ================= */}

      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={4}
              dataKey="value"
            >

              {data.map((_, index) => (

  <Cell
    key={`cell-${index}`}
    fill={COLORS[index % COLORS.length]}
  />

))}

            </Pie>

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #26324A",
                borderRadius: "16px",
                color: "#fff",
              }}
            />
                      </PieChart>

        </ResponsiveContainer>

      </div>

      {/* ================= LEGEND ================= */}

      <div className="mt-6 space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-[#182235] px-4 py-3"
          >

            <div className="flex items-center gap-3">

              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-sm text-slate-300">

                {item.name}

              </span>

            </div>

            <span className="font-semibold text-white">

              {item.value}%

            </span>

          </div>

        ))}

      </div>

      {/* ================= AI SUMMARY ================= */}

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

        <p className="text-sm text-cyan-300">

          AI Insight

        </p>

        <p className="mt-2 text-sm leading-7 text-slate-300">

          Phishing attacks account for the largest share of detected threats.
          AI recommends strengthening email filtering, enforcing MFA, and
          increasing user awareness training to reduce organizational risk.

        </p>

      </div>

    </div>

  );

}

export default AttackSources;