import {
  ImageIcon,
  FileImage,
  Calendar,
  HardDrive,
  CheckCircle2,
} from "lucide-react";

type Props = {
  image: string;
};

function PreviewCard({ image }: Props) {
  return (
    <section className="rounded-[30px] border border-[#26324A] bg-[#101827]/85 p-7 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Image Preview
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Uploaded image preview and file information
          </p>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2">

          <span className="text-sm font-medium text-cyan-400">
            Preview Ready
          </span>

        </div>

      </div>

      {/* Image */}

      <div className="overflow-hidden rounded-3xl border border-cyan-500/20">

        {image ? (
          <img
            src={image}
            alt="Preview"
            className="h-[320px] w-full object-cover"
          />
        ) : (
          <div className="flex h-[320px] items-center justify-center bg-[#0F172A] text-slate-500 text-lg">
            No Image Uploaded
          </div>
        )}

      </div>

      {/* File Information */}

      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-2xl bg-[#162033] p-5">

          <div className="flex items-center gap-3">

            <FileImage
              size={22}
              className="text-cyan-400"
            />

            <h3 className="font-semibold text-white">
              File
            </h3>

          </div>

          <p className="mt-3 text-slate-300">
            {image ? "Uploaded Successfully" : "No Image"}
          </p>

        </div>

        <div className="rounded-2xl bg-[#162033] p-5">

          <div className="flex items-center gap-3">

            <HardDrive
              size={22}
              className="text-violet-400"
            />

            <h3 className="font-semibold text-white">
              AI Status
            </h3>

          </div>

          <p className="mt-3 text-cyan-400">
            {image ? "Ready for AI Analysis" : "Waiting"}
          </p>

        </div>

        <div className="rounded-2xl bg-[#162033] p-5">

          <div className="flex items-center gap-3">

            <Calendar
              size={22}
              className="text-green-400"
            />

            <h3 className="font-semibold text-white">
              Uploaded
            </h3>

          </div>

          <p className="mt-3 text-slate-300">
            {new Date().toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl bg-[#162033] p-5">

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={22}
              className="text-cyan-400"
            />

            <h3 className="font-semibold text-white">
              Status
            </h3>

          </div>

          <p className="mt-3 font-medium text-green-400">
            {image ? "AI Ready" : "Waiting"}
          </p>

        </div>

      </div>

      {/* AI Summary */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <div className="flex items-center gap-3">

          <ImageIcon
            size={22}
            className="text-cyan-400"
          />

          <h3 className="text-lg font-semibold text-white">
            AI Preview Summary
          </h3>

        </div>

        <p className="mt-4 text-sm leading-7 text-slate-300">

          {image
            ? "Image uploaded successfully. AI Vision is ready to inspect phishing pages, malware screenshots, suspicious websites, QR codes, metadata and other cybersecurity threats."
            : "Upload an image to begin AI-powered security analysis."}

        </p>

      </div>

    </section>
  );
}

export default PreviewCard;