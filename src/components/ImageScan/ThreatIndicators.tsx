import {
  ShieldAlert,
  Bug,
  Skull,
  KeyRound,
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const threats = [
  {
    title: "Phishing",
    value: 96,
    color: "bg-red-500",
    icon: ShieldAlert,
  },
  {
    title: "Malware",
    value: 81,
    color: "bg-orange-500",
    icon: Bug,
  },
  {
    title: "Ransomware",
    value: 32,
    color: "bg-yellow-500",
    icon: Skull,
  },
  {
    title: "Credential Theft",
    value: 92,
    color: "bg-violet-500",
    icon: KeyRound,
  },
];

function ThreatIndicators() {
  return (
    <section className="rounded-[30px] border border-[#26324A] bg-[#101827]/85 p-7 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Threat Indicators
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            AI detected security indicators from the uploaded image
          </p>

        </div>

        <div className="rounded-full bg-red-500/10 px-4 py-2">

          <span className="text-sm font-medium text-red-400">
            High Risk
          </span>

        </div>

      </div>

      {/* Threat List */}

      <div className="mt-8 space-y-6">

        {threats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-2xl bg-[#162033] p-5"
            >

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Icon
                    size={22}
                    className="text-cyan-400"
                  />

                  <span className="font-medium text-white">
                    {item.title}
                  </span>

                </div>

                <span className="font-bold text-white">
                  {item.value}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#0F172A]">

                <div
                  className={`${item.color} h-full rounded-full transition-all duration-700`}
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

            </div>
          );

        })}

      </div>

      {/* Overall Threat */}

      <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

        <div className="flex items-center gap-3">

          <AlertTriangle
            size={22}
            className="text-red-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Overall Threat Level
          </h3>

        </div>

        <h2 className="mt-4 text-4xl font-bold text-red-400">
          Critical
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">

          Multiple phishing and credential harvesting indicators have
          been detected.

          Immediate investigation is recommended before
          opening links or sharing this content.

        </p>

      </div>

      {/* AI Verdict */}

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

        <div className="mb-3 flex items-center gap-3">

          <BrainCircuit
            size={22}
            className="text-violet-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Gemini AI Verdict
          </h3>

        </div>

        <p className="text-sm leading-7 text-slate-300">

          Gemini AI classified this image as a
          <span className="font-semibold text-red-400">
            {" "}High Confidence Phishing Attempt
          </span>.

          The visual structure,
          extracted text,
          fake login elements,
          credential request,
          and suspicious domain strongly match
          enterprise phishing campaigns.

        </p>

      </div>

      {/* Enterprise Risk Score */}

      <div className="mt-6 grid grid-cols-2 gap-5">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <TrendingUp
            size={24}
            className="mb-3 text-cyan-400"
          />

          <p className="text-sm text-slate-400">
            Enterprise Risk Score
          </p>

          <h2 className="mt-2 text-4xl font-bold text-cyan-400">
            94%
          </h2>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <ShieldCheck
            size={24}
            className="mb-3 text-green-400"
          />

          <p className="text-sm text-slate-400">
            AI Confidence
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-400">
            99.3%
          </h2>

        </div>

      </div>

    </section>
  );
}

export default ThreatIndicators;