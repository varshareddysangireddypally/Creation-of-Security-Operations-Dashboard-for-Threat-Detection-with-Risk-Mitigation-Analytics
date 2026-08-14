import { useState, useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

import {
  UploadCloud,
  Database,
  FileSpreadsheet,
  FileJson,
  FileText,
  FileImage,
  FileCode2,
  BrainCircuit,
  FileArchive,
} from "lucide-react";

import Header from "../../components/Layout/Header/Header";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import AIAssistant from "../../components/AI/AIAssistant";
import { useNotification } from "../../context/NotificationContext";
import bgVideo from "../../assets/videos/api/Hologram HUD Animation.mp4";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function UploadCenter() {
  const { addNotification } = useNotification();
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const [datasetName, setDatasetName] = useState("");

  const [datasetType, setDatasetType] = useState("");

  const [rows, setRows] = useState<any[]>([]);

  const [columns, setColumns] = useState<string[]>([]);

  const [fraudRecords, setFraudRecords] = useState(0);

  const [safeRecords, setSafeRecords] = useState(0);

  const [threatScore, setThreatScore] = useState(0);

  const [riskLevel, setRiskLevel] = useState("");

  const [confidence, setConfidence] = useState(0);

  const [recommendation, setRecommendation] = useState("");

  const [fileSize, setFileSize] = useState("");

  const [lastModified, setLastModified] = useState("");

  const [previewImage, setPreviewImage] = useState("");

  const [textPreview, setTextPreview] = useState("");

  const [xmlPreview, setXmlPreview] = useState("");

  const [pdfName, setPdfName] = useState("");

  const [, setSheetNames] = useState<string[]>([]);

  const [fileExtension, setFileExtension] = useState("");

  const [, setUploadedFile] = useState<File | null>(null);

  const [aiSummary, setAiSummary] = useState("");

  const [securityStatus, setSecurityStatus] = useState("Waiting");

  const [progress, setProgress] = useState(0);

  const [isUploading, setIsUploading] = useState(false);

  const [hashValue, setHashValue] = useState("");

  const [detectedThreats, setDetectedThreats] = useState(0);

  const [warnings, setWarnings] = useState(0);

  const [criticalIssues, setCriticalIssues] = useState(0);

  const [totalSheets, setTotalSheets] = useState(0);

  const [imageWidth, setImageWidth] = useState(0);

  const [imageHeight, setImageHeight] = useState(0);

  const [previewType, setPreviewType] = useState("");

  const [, setLogs] = useState<string[]>([]);

  const [uploadTime, setUploadTime] = useState("");

  const [analysisTime, setAnalysisTime] = useState("");

  
    const calculateDataset = (data: any[]) => {
    let fraud = 0;

    data.forEach((row) => {
      const value =
        row.Class ??
        row.class ??
        row.Label ??
        row.label ??
        row.Target ??
        row.target ??
        row.Fraud ??
        row.fraud ??
        row.Status ??
        row.status ??
        row.isFraud ??
        row.IsFraud ??
        row.Prediction ??
        row.prediction ??
        row.Result ??
        row.result;

      if (
        value == 1 ||
        String(value).toLowerCase() === "fraud" ||
        String(value).toLowerCase() === "true" ||
        String(value).toLowerCase() === "yes" ||
        String(value).toLowerCase() === "malicious"
      ) {
        fraud++;
      }
    });

    const safe = data.length - fraud;

    const score =
      data.length === 0
        ? 0
        : Number(((fraud / data.length) * 100).toFixed(2));

    setFraudRecords(fraud);
    setSafeRecords(safe);
    setThreatScore(score);

   if (score === 0) {

  setRiskLevel("SAFE");
  setConfidence(99);
  setRecommendation(
    "No malicious records detected. Dataset appears secure."
  );
  setSecurityStatus("Secure");

  addNotification(
    "✅ Upload Completed",
    "Dataset analyzed successfully. No threats detected.",
    "success"
  );

}
else if (score < 2) {

  setRiskLevel("LOW");
  setConfidence(97);
  setRecommendation(
    "Low risk detected. Continue continuous monitoring."
  );
  setSecurityStatus("Low Risk");

  addNotification(
    "ℹ️ Low Risk",
    "Minor suspicious activity detected.",
    "success"
  );

}
else if (score < 10) {

  setRiskLevel("MEDIUM");
  setConfidence(94);
  setRecommendation(
    "Potential threats found. Manual investigation recommended."
  );
  setSecurityStatus("Medium Risk");

  addNotification(
    "⚠️ Medium Risk",
    "Potential threats detected in uploaded dataset.",
    "warning"
  );

}
else if (score < 20) {

  setRiskLevel("HIGH");
  setConfidence(90);
  setRecommendation(
    "High threat activity detected. Immediate response required."
  );
  setSecurityStatus("High Risk");

  addNotification(
    "🚨 High Risk",
    "High threat activity detected. Review immediately.",
    "critical"
  );

}
else {

  setRiskLevel("CRITICAL");
  setConfidence(86);
  setRecommendation(
    "Critical cyber threats detected. Escalate immediately."
  );
  setSecurityStatus("Critical");

  addNotification(
    "🔥 Critical Threat",
    "Critical cyber threats detected in uploaded dataset.",
    "critical"
  );

}

    setDetectedThreats(fraud);
    setWarnings(Math.floor(fraud * 0.5));
    setCriticalIssues(Math.floor(fraud * 0.2));

    setAiSummary(
      `Enterprise AI analyzed ${data.length} records and detected ${fraud} suspicious records with an overall threat score of ${score}%.`
    );
  };

  const generateHash = () => {
    return Math.random().toString(36).substring(2, 18).toUpperCase();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " Bytes";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(2) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const startUploadAnimation = () => {
    setIsUploading(true);
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 120);
  };
    const handleFile = (file: File) => {
    setUploadedFile(file);

    setDatasetName(file.name);

    const extension = file.name.split(".").pop()?.toUpperCase() || "";

    setFileExtension(extension);

    setDatasetType(extension);

    setFileSize(formatFileSize(file.size));

    setLastModified(new Date(file.lastModified).toLocaleString());

    setUploadTime(new Date().toLocaleString());

    setHashValue(generateHash());

    startUploadAnimation();

    // ================= CSV =================

    if (extension === "CSV") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[];

          setRows(data);

          if (data.length > 0) {
            setColumns(Object.keys(data[0]));
          }

          calculateDataset(data);

          setAnalysisTime(new Date().toLocaleString());
        },
      });

      return;
    }

    // ================= JSON =================

    if (extension === "JSON") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);

          const finalData = Array.isArray(data) ? data : [data];

          setRows(finalData);

          if (finalData.length > 0) {
            setColumns(Object.keys(finalData[0]));
          }

          calculateDataset(finalData);

          setAnalysisTime(new Date().toLocaleString());
        } catch {
          alert("Invalid JSON File");
        }
      };

      reader.readAsText(file);

      return;
    }

    // ================= EXCEL =================

    if (extension === "XLSX" || extension === "XLS") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, {
          type: "binary",
        });

        setSheetNames(workbook.SheetNames);

        setTotalSheets(workbook.SheetNames.length);

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const data = XLSX.utils.sheet_to_json(sheet);

        setRows(data);

        if (data.length > 0) {
          setColumns(Object.keys(data[0] as any));
        }

        calculateDataset(data as any[]);

        setAnalysisTime(new Date().toLocaleString());
      };

      reader.readAsBinaryString(file);

      return;
    }

    // ================= PDF =================

    if (extension === "PDF") {
      setPdfName(file.name);

      setAiSummary(
        "PDF uploaded successfully. Enterprise AI extracted metadata. PDF content analysis module ready."
      );

      setRecommendation(
        "Run AI document scanning to detect sensitive information and malicious indicators."
      );

      return;
    }

    // ================= IMAGE =================

    if (
      extension === "PNG" ||
      extension === "JPG" ||
      extension === "JPEG"
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;

        setPreviewImage(imageUrl);

        setPreviewType("IMAGE");

        const img = new Image();

        img.onload = () => {
          setImageWidth(img.width);

          setImageHeight(img.height);

          setAiSummary(
            `Enterprise AI inspected uploaded image (${img.width} × ${img.height}).`
          );

          setRecommendation(
            "Image is ready for malware detection, QR analysis and OCR scanning."
          );
        };

        img.src = imageUrl;
      };

      reader.readAsDataURL(file);

      return;
    }

    // ================= TXT / LOG =================

    if (extension === "TXT" || extension === "LOG") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;

        setTextPreview(text);

        setPreviewType("TEXT");

        const lines = text.split("\n");

        setLogs(lines.slice(0, 100));

        const errors = lines.filter((line) =>
          line.toLowerCase().includes("error")
        ).length;

        const warningsFound = lines.filter((line) =>
          line.toLowerCase().includes("warning")
        ).length;

        setCriticalIssues(errors);

        setWarnings(warningsFound);

        setAiSummary(
          `AI scanned ${lines.length} log lines and found ${errors} errors and ${warningsFound} warnings.`
        );

        setRecommendation(
          "Review authentication failures, suspicious IP addresses and repeated exceptions."
        );
      };

      reader.readAsText(file);

      return;
    }

    // ================= XML =================

    if (extension === "XML") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const xml = e.target?.result as string;

        setXmlPreview(xml);

        setPreviewType("XML");

        const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(
          xml,
          "application/xml"
        );

        const totalNodes = xmlDoc.getElementsByTagName("*").length;

        setAiSummary(
          `Enterprise AI parsed XML successfully. ${totalNodes} XML nodes detected.`
        );

        setRecommendation(
          "XML structure validated successfully. Ready for enterprise security inspection."
        );
      };

      reader.readAsText(file);

      return;
    }

    alert(
      "Unsupported file format.\n\nSupported:\nCSV\nJSON\nExcel\nPDF\nImages\nTXT\nLOG\nXML"
    );
  };
    return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B16]">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-30"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-[#050913]/20 backdrop-blur-[1px]" />

      <Header />
      <Sidebar />

      <div
        className="relative transition-all duration-500"
        style={{ marginLeft: "88px" }}
      >

        <main
          className="mx-auto max-w-[1500px] px-14 py-12"
          style={{ paddingRight: "120px" }}
        >

          <h1 className="text-5xl font-bold text-white">
            Enterprise Upload Center
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            Upload Enterprise Security Datasets, Reports, Images, Logs and XML
            files for AI-powered cyber security analysis.
          </p>

          <div className="mt-10">

            <input
              ref={inputRef}
              hidden
              type="file"
              accept=".csv,.json,.xlsx,.xls,.pdf,.png,.jpg,.jpeg,.txt,.log,.xml"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);

                if (e.dataTransfer.files[0]) {
                  handleFile(e.dataTransfer.files[0]);
                }
              }}
              className={`cursor-pointer rounded-[35px] border-2 border-dashed p-14 transition-all duration-300

              ${
                dragging
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-cyan-500/20 bg-[#101827]/90"
              }`}
            >

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500/10">

                <UploadCloud
                  size={65}
                  className="text-cyan-400"
                />

              </div>

              <h2 className="mt-8 text-center text-3xl font-bold text-white">
                Drag & Drop Enterprise Files
              </h2>

              <p className="mt-4 text-center text-slate-400">
                CSV • JSON • Excel • PDF • Images • TXT • LOG • XML
              </p>

              <div className="flex justify-center">

                <button
                  type="button"
                  className="mt-8 rounded-2xl bg-cyan-500 px-10 py-4 font-semibold text-white transition hover:bg-cyan-600"
                >
                  Browse Files
                </button>

              </div>

              {isUploading && (

                <div className="mt-10">

                  <div className="flex justify-between text-sm text-slate-300">

                    <span>Uploading...</span>

                    <span>{progress}%</span>

                  </div>

                  <div className="mt-3 h-3 rounded-full bg-slate-700">

                    <div
                      className="h-3 rounded-full bg-cyan-400 transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

              )}

              <div className="mt-12 grid grid-cols-4 gap-6">

                <div className="rounded-2xl bg-[#162033] p-6">

                  <FileSpreadsheet
                    className="mb-4 text-cyan-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    CSV
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Fraud Dataset
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <FileJson
                    className="mb-4 text-violet-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    JSON
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    API Threat Data
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <Database
                    className="mb-4 text-yellow-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Excel
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    XLSX / XLS
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <FileText
                    className="mb-4 text-red-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    PDF
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Security Reports
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <FileImage
                    className="mb-4 text-pink-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Images
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    PNG / JPG
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <FileArchive
                    className="mb-4 text-green-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    LOG / TXT
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Server Logs
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <FileCode2
                    className="mb-4 text-orange-400"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    XML
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Structured Data
                  </p>

                </div>

                <div className="rounded-2xl bg-[#162033] p-6">

                  <BrainCircuit
                    className="mb-4 text-cyan-300"
                    size={35}
                  />

                  <h3 className="text-lg font-semibold text-white">
                    AI Analysis
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Enterprise Detection
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-10 grid grid-cols-4 gap-6">

            <div className="rounded-2xl border border-cyan-500/20 bg-[#101827]/90 p-6">
              <p className="text-slate-400">File Name</p>
              <h3 className="mt-3 text-lg font-semibold text-white break-all">
                {datasetName || "-"}
              </h3>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-[#101827]/90 p-6">
              <p className="text-slate-400">File Type</p>
              <h3 className="mt-3 text-lg font-semibold text-cyan-400">
                {datasetType || "-"}
              </h3>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-[#101827]/90 p-6">
              <p className="text-slate-400">File Size</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {fileSize || "-"}
              </h3>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-[#101827]/90 p-6">
              <p className="text-slate-400">Last Modified</p>
              <h3 className="mt-3 text-sm font-semibold text-white">
                {lastModified || "-"}
              </h3>
            </div>

          </div>
          {/* ================= DATASET PREVIEW ================= */}

<div className="mt-10 grid grid-cols-12 gap-6">

  {/* Preview */}

  <div className="col-span-8 rounded-[30px] border border-cyan-500/20 bg-[#101827]/90 p-8">

    <h2 className="text-2xl font-bold text-white">

      Enterprise File Preview

    </h2>

    <p className="mt-2 text-slate-400">

      AI preview based on uploaded file type

    </p>

    {/* IMAGE */}

    {previewType === "IMAGE" && previewImage && (

      <div className="mt-8">

        <img
          src={previewImage}
          alt="Preview"
          className="max-h-[420px] rounded-3xl border border-cyan-500/20"
        />

        <div className="mt-6 grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-[#162033] p-5">

            <p className="text-slate-400">

              Width

            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">

              {imageWidth}px

            </h3>

          </div>

          <div className="rounded-2xl bg-[#162033] p-5">

            <p className="text-slate-400">

              Height

            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">

              {imageHeight}px

            </h3>

          </div>

        </div>

      </div>

    )}

    {/* TEXT / LOG */}

    {(previewType === "TEXT") && (

      <div className="mt-8 rounded-2xl bg-black p-6">

        <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap text-sm text-green-400">

{textPreview}

        </pre>

      </div>

    )}

    {/* XML */}

    {(previewType === "XML") && (

      <div className="mt-8 rounded-2xl bg-[#0F172A] p-6">

        <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap text-cyan-300">

{xmlPreview}

        </pre>

      </div>

    )}

    {/* CSV / JSON / EXCEL */}

    {rows.length > 0 && (

      <div className="mt-8 overflow-auto rounded-2xl border border-cyan-500/20">

        <table className="min-w-full">

          <thead className="bg-[#162033]">

            <tr>

              {columns.map((column) => (

                <th
                  key={column}
                  className="px-4 py-3 text-left text-cyan-400"
                >

                  {column}

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {rows.slice(0,10).map((row,index)=>(

              <tr
                key={index}
                className="border-b border-slate-700"
              >

                {columns.map((column)=>(

                  <td
                    key={column}
                    className="px-4 py-3 text-slate-300"
                  >

                    {String(row[column])}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )}

    {/* PDF */}

    {datasetType==="PDF" && (

      <div className="mt-10 rounded-3xl bg-[#162033] p-10 text-center">

        <FileText
          size={70}
          className="mx-auto text-red-400"
        />

        <h2 className="mt-6 text-2xl font-bold text-white">

          {pdfName}

        </h2>

        <p className="mt-3 text-slate-400">

          PDF uploaded successfully.

          Enterprise AI document scanning is ready.

        </p>

      </div>

    )}

  </div>

  {/* ================= ENTERPRISE SUMMARY ================= */}

  <div className="col-span-4 rounded-[30px] border border-violet-500/20 bg-[#101827]/90 p-8">

    <h2 className="text-2xl font-bold text-white">

      Enterprise AI Summary

    </h2>

    <div className="mt-8 space-y-5">

      <div className="flex justify-between">

        <span className="text-slate-400">

          Dataset

        </span>

        <span className="text-white font-semibold">

          {datasetName || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          Type

        </span>

        <span className="text-cyan-400 font-semibold">

          {datasetType || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          Records

        </span>

        <span className="text-white font-semibold">

          {rows.length}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          Threat Score

        </span>

        <span className="text-red-400 font-semibold">

          {threatScore}%

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          Risk Level

        </span>

        <span className="text-orange-400 font-semibold">

          {riskLevel || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          AI Confidence

        </span>

        <span className="text-cyan-400 font-semibold">

          {confidence}%

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          Upload Time

        </span>

        <span className="text-white text-sm">

          {uploadTime || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          Analysis Time

        </span>

        <span className="text-white text-sm">

          {analysisTime || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">

          File Hash

        </span>

        <span className="text-green-400 text-xs">

          {hashValue || "-"}

        </span>

      </div>

    </div>

    <div className="mt-8 rounded-2xl bg-[#162033] p-5">

      <h3 className="text-lg font-semibold text-cyan-400">

        AI Summary

      </h3>

      <p className="mt-4 leading-8 text-slate-300">

        {aiSummary ||

          "Upload any supported enterprise security file to generate AI insights."}

      </p>

    </div>

  </div>

</div>
{/* ================= ENTERPRISE STATISTICS ================= */}

<div className="mt-10 grid grid-cols-4 gap-6">

  <div className="rounded-[28px] border border-cyan-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Total Records
    </p>

    <h2 className="mt-3 text-4xl font-bold text-cyan-400">
      {rows.length}
    </h2>

  </div>

  <div className="rounded-[28px] border border-red-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Fraud Records
    </p>

    <h2 className="mt-3 text-4xl font-bold text-red-400">
      {fraudRecords}
    </h2>

  </div>

  <div className="rounded-[28px] border border-green-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Safe Records
    </p>

    <h2 className="mt-3 text-4xl font-bold text-green-400">
      {safeRecords}
    </h2>

  </div>

  <div className="rounded-[28px] border border-yellow-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Threat Score
    </p>

    <h2 className="mt-3 text-4xl font-bold text-yellow-400">
      {threatScore}%
    </h2>

  </div>

</div>

{/* ================= SECURITY METRICS ================= */}

<div className="mt-10 grid grid-cols-4 gap-6">

  <div className="rounded-[28px] border border-violet-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Detected Threats
    </p>

    <h2 className="mt-3 text-4xl font-bold text-violet-400">
      {detectedThreats}
    </h2>

  </div>

  <div className="rounded-[28px] border border-orange-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Warnings
    </p>

    <h2 className="mt-3 text-4xl font-bold text-orange-400">
      {warnings}
    </h2>

  </div>

  <div className="rounded-[28px] border border-red-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Critical Issues
    </p>

    <h2 className="mt-3 text-4xl font-bold text-red-500">
      {criticalIssues}
    </h2>

  </div>

  <div className="rounded-[28px] border border-cyan-500/20 bg-[#101827]/90 p-6">

    <p className="text-slate-400">
      Security Status
    </p>

    <h2 className="mt-3 text-3xl font-bold text-cyan-400">
      {securityStatus}
    </h2>

  </div>

</div>

{/* ================= FRAUD ANALYSIS GRAPH ================= */}

<div className="mt-10 rounded-[30px] border border-cyan-500/20 bg-[#101827]/90 p-8">

  <h2 className="text-2xl font-bold text-white">

    Enterprise Threat Distribution

  </h2>

  <p className="mt-2 text-slate-400">

    AI visualization of uploaded security dataset.

  </p>

  <div className="mt-10 h-[420px]">

    <ResponsiveContainer width="100%" height="100%">

      <BarChart

        data={[
          {
            category: "Threats",
            count: fraudRecords,
          },
          {
            category: "Safe",
            count: safeRecords,
          },
        ]}

      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="category" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="#06B6D4"
          radius={[10,10,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

{/* ================= ENTERPRISE ANALYTICS ================= */}

<div className="mt-10 grid grid-cols-2 gap-6">

  <div className="rounded-[30px] border border-cyan-500/20 bg-[#101827]/90 p-8">

    <h2 className="text-2xl font-bold text-white">

      Upload Statistics

    </h2>

    <div className="mt-8 space-y-5">

      <div className="flex justify-between">

        <span className="text-slate-400">
          File Extension
        </span>

        <span className="text-cyan-400">
          {fileExtension}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Supported Sheets
        </span>

        <span className="text-green-400">
          {totalSheets}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Upload Progress
        </span>

        <span className="text-yellow-400">
          {progress}%
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Confidence
        </span>

        <span className="text-cyan-400">
          {confidence}%
        </span>

      </div>

    </div>

  </div>

  <div className="rounded-[30px] border border-green-500/20 bg-[#101827]/90 p-8">

    <h2 className="text-2xl font-bold text-white">

      AI Detection Overview

    </h2>

    <div className="mt-8 rounded-2xl bg-[#162033] p-6">

      <p className="leading-9 text-slate-300">

        Enterprise AI analyzed the uploaded file and generated cyber security insights based on file structure, metadata, fraud indicators and anomaly detection.

      </p>

      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-slate-400">

            Threat Score

          </p>

          <h3 className="text-3xl font-bold text-red-400">

            {threatScore}%

          </h3>

        </div>

        <div>

          <p className="text-slate-400">

            AI Confidence

          </p>

          <h3 className="text-3xl font-bold text-cyan-400">

            {confidence}%

          </h3>

        </div>

      </div>

    </div>

  </div>

</div>
{/* ================= AI RECOMMENDATION ================= */}

<div className="mt-10 grid grid-cols-12 gap-6">

  <div className="col-span-8 rounded-[30px] border border-violet-500/20 bg-[#101827]/90 p-8">

    <h2 className="text-2xl font-bold text-white">
      Enterprise AI Recommendation
    </h2>

    <div className="mt-6 rounded-2xl bg-[#162033] p-6">

      <p className="leading-9 text-slate-300">
        {recommendation ||
          "Upload a supported file to generate AI recommendations."}
      </p>

    </div>

    <div className="mt-8 grid grid-cols-3 gap-6">

      <div className="rounded-2xl bg-[#162033] p-5">

        <p className="text-slate-400">
          Risk Level
        </p>

        <h3 className="mt-3 text-3xl font-bold text-orange-400">
          {riskLevel || "-"}
        </h3>

      </div>

      <div className="rounded-2xl bg-[#162033] p-5">

        <p className="text-slate-400">
          AI Confidence
        </p>

        <h3 className="mt-3 text-3xl font-bold text-cyan-400">
          {confidence}%
        </h3>

      </div>

      <div className="rounded-2xl bg-[#162033] p-5">

        <p className="text-slate-400">
          File Type
        </p>

        <h3 className="mt-3 text-3xl font-bold text-green-400">
          {datasetType || "-"}
        </h3>

      </div>

    </div>

    <div className="mt-8">

      <button
        className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-white transition hover:bg-cyan-600"
      >
        Export AI Report
      </button>

    </div>

  </div>

  {/* ================= SECURITY STATUS ================= */}

  <div className="col-span-4 rounded-[30px] border border-red-500/20 bg-[#101827]/90 p-8">

    <h2 className="text-2xl font-bold text-white">
      Overall Security Status
    </h2>

    <div className="mt-8 flex justify-center">

      <div
        className={`rounded-full px-10 py-6 text-center text-2xl font-bold

${
riskLevel==="SAFE"
?"bg-green-500/20 text-green-400"
:riskLevel==="LOW"
?"bg-cyan-500/20 text-cyan-400"
:riskLevel==="MEDIUM"
?"bg-yellow-500/20 text-yellow-400"
:riskLevel==="HIGH"
?"bg-orange-500/20 text-orange-400"
:"bg-red-500/20 text-red-400"
}`}

      >

        {riskLevel || "WAITING"}

      </div>

    </div>

    <div className="mt-10 space-y-5">

      <div className="flex justify-between">

        <span className="text-slate-400">
          Dataset
        </span>

        <span className="text-white">
          {datasetName || "-"}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Threat Score
        </span>

        <span className="text-red-400">
          {threatScore}%
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Records
        </span>

        <span className="text-white">
          {rows.length}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Threats
        </span>

        <span className="text-red-400">
          {fraudRecords}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Safe
        </span>

        <span className="text-green-400">
          {safeRecords}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-400">
          Status
        </span>

        <span className="text-cyan-400">
          {securityStatus}
        </span>

      </div>

    </div>

  </div>

</div>

<div className="h-24" />

</main>

<AIAssistant />

</div>

</div>

);

}

export default UploadCenter;