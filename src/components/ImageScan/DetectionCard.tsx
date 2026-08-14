import {
  ShieldAlert,
  BrainCircuit,
  ShieldCheck,
  Activity,
} from "lucide-react";

type Props = {
  result: string;
};

function DetectionCard({ result }: Props) {
  return (
    <section className="rounded-[30px] border border-[#26324A] bg-[#101827]/85 p-7 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            AI Threat Detection
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            OpenRouter Vision Analysis
          </p>

        </div>

        <div className="rounded-full bg-violet-500/15 px-4 py-2">

          <span className="text-sm font-medium text-violet-300">
            AI Active
          </span>

        </div>

      </div>

      {/* Status */}

      <div className="mt-8 flex justify-center">

        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[12px] border-cyan-500 bg-[#162033] shadow-xl">

          <div className="text-center">

            <h2 className="text-3xl font-bold text-cyan-400">
              AI
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Analysis
            </p>

          </div>

        </div>

      </div>

      {/* Status Cards */}

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <ShieldAlert
              size={22}
              className="text-red-400"
            />

            <span className="text-slate-300">
              AI Engine
            </span>

          </div>

          <span className="font-semibold text-cyan-400">
            OpenRouter Vision
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <BrainCircuit
              size={22}
              className="text-violet-400"
            />

            <span className="text-slate-300">
              Model
            </span>

          </div>

          <span className="font-semibold text-violet-300">
            Qwen2.5 VL
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <Activity
              size={22}
              className="text-orange-400"
            />

            <span className="text-slate-300">
              Status
            </span>

          </div>

          <span className="font-semibold text-green-400">
            Ready
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={22}
              className="text-green-400"
            />

            <span className="text-slate-300">
              Result
            </span>

          </div>

          <span className="font-semibold text-cyan-400">
            Completed
          </span>

        </div>

      </div>

      {/* AI Result */}

      <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

        <h3 className="text-lg font-semibold text-white">
          AI Vision Analysis
        </h3>

        <div className="mt-4 whitespace-pre-wrap text-sm leading-8 text-slate-300">

          {result
            ? result
            : "Upload an image to start AI Vision analysis."}

        </div>

      </div>

    </section>
  );
}

export default DetectionCard;