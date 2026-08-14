import {
  ShieldCheck,
  Image,
  ScanSearch,
  BrainCircuit,
} from "lucide-react";

import cyberImage from "../../assets/illustrations/cyber-security.png";

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-[#101827]/85 p-10 shadow-2xl backdrop-blur-xl">

      {/* Glow Effects */}

      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative grid grid-cols-12 gap-10">

        {/* LEFT */}

        <div className="col-span-8">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/15 p-3">

              <ShieldCheck
                size={22}
                className="text-cyan-400"
              />

            </div>

            <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm font-medium text-green-400">

              ● AI Malware Detection Enabled

            </span>

          </div>

          <h1 className="text-5xl font-bold leading-tight text-white">

            Enterprise

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">

              {" "}Image Scanner

            </span>

          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-9 text-slate-300">

            Upload suspicious screenshots, malware images, phishing
            content, fake login pages and cyber evidence.

            Gemini AI automatically analyzes image contents,
            extracts hidden text,
            detects malware indicators,
            identifies phishing attempts,
            and generates intelligent security recommendations.

          </p>

          {/* Stats */}

          <div className="mt-10 flex flex-wrap gap-5">

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-5">

              <Image
                size={24}
                className="mb-3 text-cyan-400"
              />

              <h3 className="text-sm text-slate-300">

                Images Scanned

              </h3>

              <h2 className="mt-2 text-3xl font-bold text-white">

                12,845

              </h2>

            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-6 py-5">

              <ScanSearch
                size={24}
                className="mb-3 text-violet-400"
              />

              <h3 className="text-sm text-slate-300">

                Threats Detected

              </h3>

              <h2 className="mt-2 text-3xl font-bold text-white">

                428

              </h2>

            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-5">

              <BrainCircuit
                size={24}
                className="mb-3 text-green-400"
              />

              <h3 className="text-sm text-slate-300">

                AI Accuracy

              </h3>

              <h2 className="mt-2 text-3xl font-bold text-white">

                99.2%

              </h2>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-span-4">

          <div className="rounded-3xl border border-cyan-500/20 bg-[#151E33]/80 p-6 shadow-xl">

            <img
              src={cyberImage}
              alt="Cyber Security"
              className="mx-auto h-64 object-contain"
            />

            <h2 className="mt-6 text-center text-2xl font-bold text-white">

              AI Image Intelligence

            </h2>

            <p className="mt-4 text-center text-sm leading-7 text-slate-300">

              Detect phishing screenshots,
              malware evidence,
              suspicious QR codes,
              leaked credentials,
              fake websites,
              ransomware notes,
              and hidden threats using Gemini AI.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;