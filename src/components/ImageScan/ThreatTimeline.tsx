import {
  Clock3,
  Upload,
  ScanSearch,
  ScanText,
  BrainCircuit,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

const timeline = [
  {
    time: "11:42:08",
    title: "Image Uploaded",
    description: "Image successfully received by the AI Security Platform.",
    icon: Upload,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    time: "11:42:12",
    title: "Image Processing",
    description: "Gemini AI started preprocessing and enhancement.",
    icon: ScanSearch,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    time: "11:42:18",
    title: "OCR Extraction",
    description: "Visible text extracted from uploaded image.",
    icon: ScanText,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    time: "11:42:24",
    title: "Threat Analysis",
    description: "Phishing indicators and malicious patterns detected.",
    icon: ShieldAlert,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    time: "11:42:30",
    title: "Gemini AI Analysis",
    description: "Enterprise AI generated recommendations.",
    icon: BrainCircuit,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    time: "11:42:36",
    title: "Scan Completed",
    description: "Full security report successfully generated.",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

function ThreatTimeline() {
  return (
    <section className="rounded-[30px] border border-[#26324A] bg-[#101827]/85 p-7 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Scan Timeline
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Enterprise AI security workflow
          </p>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2">

          <span className="text-sm font-medium text-cyan-400">
            Live Timeline
          </span>

        </div>

      </div>

      {/* Timeline */}

      <div className="mt-10 relative border-l-2 border-cyan-500/30 ml-6 space-y-8">

        {timeline.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="relative pl-12"
            >

              <div
                className={`absolute -left-[18px] top-1 flex h-9 w-9 items-center justify-center rounded-full ${item.bg}`}
              >

                <Icon
                  size={18}
                  className={item.color}
                />

              </div>

              <div className="rounded-2xl bg-[#162033] p-5">

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={16}
                      className="text-slate-400"
                    />

                    <span className="text-sm text-slate-400">
                      {item.time}
                    </span>

                  </div>

                </div>

                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>

              </div>

            </div>

          );

        })}

      </div>

      {/* AI Summary */}

      <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <div className="flex items-center gap-3">

          <BrainCircuit
            size={22}
            className="text-cyan-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Gemini AI Workflow Summary
          </h3>

        </div>

        <p className="mt-4 text-sm leading-8 text-slate-300">

          The uploaded image successfully completed every stage of the
          enterprise security pipeline including preprocessing,
          OCR extraction,
          phishing detection,
          metadata inspection,
          malware analysis,
          AI reasoning,
          and report generation.

          The entire scan completed in under
          <span className="font-semibold text-cyan-400">
            {" "}30 seconds
          </span>
          with an overall AI confidence of
          <span className="font-semibold text-green-400">
            {" "}99.3%
          </span>.

        </p>

      </div>

    </section>
  );
}

export default ThreatTimeline;