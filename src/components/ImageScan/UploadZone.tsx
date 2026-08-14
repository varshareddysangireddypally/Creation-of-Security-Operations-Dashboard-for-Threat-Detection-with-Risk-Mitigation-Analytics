import { useRef } from "react";

import {
  UploadCloud,
  ImageIcon,
  FileImage,
  ShieldCheck,
} from "lucide-react";

import Tesseract from "tesseract.js";

import { analyzeImage } from "../../services/imageVision";

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setAiResult: React.Dispatch<React.SetStateAction<string>>;
  setOcrText: React.Dispatch<React.SetStateAction<string>>;
};

function UploadZone({
  setImage,
  setAiResult,
  setOcrText,
}: Props) {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {

    const reader = new FileReader();

    reader.onloadend = async () => {

      try {

        const base64 = reader.result as string;

        setImage(base64);

        setAiResult("🔍 Extracting text from image...");
                const {
          data: { text },
        } = await Tesseract.recognize(
          base64,
          "eng"
        );

        setOcrText(text);

        setAiResult("🤖 AI analyzing extracted text...");

        const result = await analyzeImage(text);

        setAiResult(result);

      }

      catch (error) {

        console.error(error);

        setOcrText("");

        setAiResult(`

🔴 IMAGE ANALYSIS FAILED

Threat Score : 0%

Status : Failed

Reason:
Unable to extract readable text from this image.

Recommendation:
• Upload a high-quality image
• Use PNG or JPG
• Ensure text is clearly visible
• Avoid blurred screenshots

`);

      }

    };

    reader.readAsDataURL(file);

  };
  return (

<section className="rounded-[30px] border border-cyan-500/20 bg-[#101827]/85 p-8 shadow-2xl backdrop-blur-xl">

<div className="mb-8 flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold text-white">

Upload Image

</h2>

<p className="mt-2 text-sm text-slate-400">

Upload screenshots, phishing pages, fake login pages,
malware images or cyber evidence.

</p>

</div>

<div className="rounded-full bg-cyan-500/10 px-4 py-2">

<span className="text-sm font-medium text-cyan-400">

Enterprise AI Ready

</span>

</div>

</div>

<input
ref={inputRef}
hidden
type="file"
accept="image/*"
onChange={(e) => {

if (e.target.files?.[0]) {

handleFile(e.target.files[0]);

}

}}
/>

<div
onClick={() => inputRef.current?.click()}
onDragOver={(e) => e.preventDefault()}
onDrop={(e) => {

e.preventDefault();

if (e.dataTransfer.files[0]) {

handleFile(e.dataTransfer.files[0]);

}

}}
className="cursor-pointer rounded-3xl border-2 border-dashed border-cyan-500/30 bg-[#0F172A]/80 p-14 text-center transition hover:border-cyan-400 hover:bg-cyan-500/5"
>

<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">

<UploadCloud
size={50}
className="text-cyan-400"
/>

</div>

<h3 className="mt-6 text-2xl font-bold text-white">

Drag & Drop Image Here

</h3>

<p className="mt-3 text-slate-400">

PNG • JPG • JPEG • WEBP

</p>

<button
type="button"
className="mt-8 rounded-2xl bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600"
>

Browse Files

</button>

</div>

<div className="mt-8 grid grid-cols-3 gap-6">

<div className="rounded-2xl border border-cyan-500/20 bg-[#162033] p-6">

<ImageIcon
size={30}
className="mb-4 text-cyan-400"
/>

<h4 className="text-lg font-semibold text-white">

OCR Text Extraction

</h4>

<p className="mt-2 text-sm text-slate-400">

Extracts readable text from uploaded images.

</p>

</div>

<div className="rounded-2xl border border-violet-500/20 bg-[#162033] p-6">

<FileImage
size={30}
className="mb-4 text-violet-400"
/>

<h4 className="text-lg font-semibold text-white">

Threat Analysis

</h4>

<p className="mt-2 text-sm text-slate-400">

Analyzes extracted text for phishing and scam indicators.

</p>

</div>

<div className="rounded-2xl border border-green-500/20 bg-[#162033] p-6">

<ShieldCheck
size={30}
className="mb-4 text-green-400"
/>

<h4 className="text-lg font-semibold text-white">

Enterprise Report

</h4>

<p className="mt-2 text-sm text-slate-400">

Generates threat score and security recommendations.

</p>

</div>

</div>

</section>

);

}

export default UploadZone;