import {
  FileImage,
  HardDrive,
  ImageIcon,
  Hash,
  Calendar,
  BrainCircuit,
  Camera,
  ShieldCheck,
} from "lucide-react";

function MetadataCard() {
  return (
    <section className="rounded-[30px] border border-[#26324A] bg-[#101827]/85 p-7 shadow-2xl backdrop-blur-xl">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Image Metadata
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Technical information extracted from the uploaded image
          </p>

        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2">

          <span className="text-sm font-medium text-green-400">
            Metadata Ready
          </span>

        </div>

      </div>

      {/* ================= DETAILS ================= */}

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <FileImage
              size={22}
              className="text-cyan-400"
            />

            <span className="text-slate-300">
              File Name
            </span>

          </div>

          <span className="font-medium text-white">
            phishing-email.png
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <HardDrive
              size={22}
              className="text-violet-400"
            />

            <span className="text-slate-300">
              File Size
            </span>

          </div>

          <span className="font-medium text-white">
            2.46 MB
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <ImageIcon
              size={22}
              className="text-green-400"
            />

            <span className="text-slate-300">
              Resolution
            </span>

          </div>

          <span className="font-medium text-white">
            1920 × 1080
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <Camera
              size={22}
              className="text-cyan-400"
            />

            <span className="text-slate-300">
              Image Format
            </span>

          </div>

          <span className="font-medium text-white">
            PNG
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <Hash
              size={22}
              className="text-orange-400"
            />

            <span className="text-slate-300">
              SHA-256
            </span>

          </div>

          <span className="max-w-[190px] truncate font-medium text-white">
            9af2b7e2a4d65b1ef7d4...
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#162033] p-4">

          <div className="flex items-center gap-3">

            <Calendar
              size={22}
              className="text-cyan-400"
            />

            <span className="text-slate-300">
              Upload Time
            </span>

          </div>

          <span className="font-medium text-white">
            Today • 11:42 AM
          </span>

        </div>

      </div>

      {/* ================= SECURITY STATUS ================= */}

      <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={22}
            className="text-green-400"
          />

          <div>

            <h3 className="text-lg font-semibold text-white">
              File Integrity
            </h3>

            <p className="text-sm text-slate-400">
              Metadata verification completed
            </p>

          </div>

        </div>

        <h2 className="mt-4 text-3xl font-bold text-green-400">
          Verified
        </h2>

      </div>

      {/* ================= AI ANALYSIS ================= */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <div className="mb-4 flex items-center gap-3">

          <BrainCircuit
            size={22}
            className="text-cyan-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Gemini AI Metadata Analysis
          </h3>

        </div>

        <p className="text-sm leading-8 text-slate-300">

          Gemini AI analyzed the image metadata and found no evidence of
          metadata manipulation or hidden payloads.

          However, visual content inspection detected phishing indicators,
          suspicious login elements, and credential harvesting patterns.

          Although the file structure appears authentic,
          the content itself represents a potential cybersecurity threat
          requiring immediate investigation.

        </p>

      </div>

    </section>
  );
}

export default MetadataCard;