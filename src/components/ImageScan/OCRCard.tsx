import {
  FileText,
  ScanText,
  BrainCircuit,
  BadgeCheck,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

type Props = {
  ocrText: string;
};

function OCRCard({
  ocrText,
}: Props) {

  const words =
    ocrText.trim() === ""
      ? 0
      : ocrText.trim().split(/\s+/).length;

  const suspiciousWords = [
    "login",
    "verify",
    "password",
    "otp",
    "bank",
    "paypal",
    "account",
    "click",
    "urgent",
    "suspended",
    "credential",
    "security",
  ];

  const detected = suspiciousWords.filter((word) =>
    ocrText.toLowerCase().includes(word)
  );

  return (

<section className="rounded-[30px] border border-[#26324A] bg-[#101827]/85 p-7 shadow-2xl backdrop-blur-xl">

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold text-white">

OCR Text Extraction

</h2>

<p className="mt-2 text-sm text-slate-400">

Extracted text from uploaded image

</p>

</div>

<div className="rounded-full bg-cyan-500/10 px-4 py-2">

<span className="text-sm font-medium text-cyan-400">

OCR Complete

</span>

</div>

</div>
      {/* OCR OUTPUT */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#162033] p-6">

        <div className="mb-5 flex items-center gap-3">

          <ScanText
            size={22}
            className="text-cyan-400"
          />

          <h3 className="text-lg font-semibold text-white">

            Extracted Text

          </h3>

        </div>

        <div className="rounded-2xl bg-[#0F172A] p-5">

          <pre className="whitespace-pre-wrap break-words leading-8 text-slate-300">

{ocrText || `No text extracted yet.

Upload an image to begin OCR scanning.`}

          </pre>

        </div>

      </div>

      {/* OCR Statistics */}

      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-2xl bg-[#162033] p-5">

          <div className="flex items-center gap-3">

            <FileText
              size={22}
              className="text-violet-400"
            />

            <div>

              <p className="text-sm text-slate-400">

                Words Extracted

              </p>

              <h2 className="mt-1 text-3xl font-bold text-white">

                {words}

              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-[#162033] p-5">

          <div className="flex items-center gap-3">

            <BadgeCheck
              size={22}
              className="text-green-400"
            />

            <div>

              <p className="text-sm text-slate-400">

                OCR Status

              </p>

              <h2 className="mt-1 text-3xl font-bold text-green-400">

                {ocrText ? "100%" : "0%"}

              </h2>

            </div>

          </div>

        </div>

      </div>
            {/* Suspicious Keywords */}

      <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

        <div className="mb-4 flex items-center gap-3">

          <ShieldAlert
            size={22}
            className="text-red-400"
          />

          <h3 className="text-lg font-semibold text-white">

            Suspicious Keywords

          </h3>

        </div>

        <div className="flex flex-wrap gap-3">

          {detected.length > 0 ? (

            detected.map((item) => (

              <span
                key={item}
                className="rounded-full bg-red-500/20 px-4 py-2 text-red-400"
              >
                {item}
              </span>

            ))

          ) : (

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">

              No suspicious keywords detected

            </span>

          )}

        </div>

      </div>

      {/* AI Interpretation */}

      <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

        <div className="mb-4 flex items-center gap-3">

          <BrainCircuit
            size={22}
            className="text-violet-400"
          />

          <h3 className="text-lg font-semibold text-white">

            AI Interpretation

          </h3>

        </div>

        <p className="text-sm leading-8 text-slate-300">

          {ocrText
            ? "OCR successfully extracted text from the uploaded image. The local AI engine analyzed the extracted content for phishing indicators, credential theft patterns, suspicious keywords, urgency language and security risks."
            : "Upload an image to begin OCR extraction and security analysis."}

        </p>

      </div>

      {/* Status */}

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#162033] p-5">

        <div className="flex items-center gap-3">

          <AlertTriangle
            size={22}
            className="text-orange-400"
          />

          <span className="text-slate-300">

            OCR Security Status

          </span>

        </div>

        <span
          className={`rounded-full px-4 py-2 font-semibold ${
            detected.length
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {detected.length ? "Suspicious" : "Safe"}
        </span>

      </div>

    </section>

  );

}

export default OCRCard;