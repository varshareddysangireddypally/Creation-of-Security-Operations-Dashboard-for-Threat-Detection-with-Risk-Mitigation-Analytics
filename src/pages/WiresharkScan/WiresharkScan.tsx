import { useState } from "react";
import { Upload, ShieldCheck, Network } from "lucide-react";
import bgVideo from "../../assets/videos/loading/Server Room Animation.mp4"; // <-- mee existing video path
import { useNotification } from "../../context/NotificationContext";
const WiresharkScan = () => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { addNotification } = useNotification();
  const [threatLevel, setThreatLevel] = useState("Medium");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setShowResult(false);

    setTimeout(() => {
      setThreatLevel("Medium");

  setLoading(false);
  setShowResult(true);

  

  if (threatLevel === "Critical") {

    addNotification(
      "🚨 Critical Threat",
      "Critical malicious network activity detected in the uploaded PCAP.",
      "critical"
    );

  } else if (threatLevel === "High") {

    addNotification(
      "🔴 High Threat",
      "High-risk malicious traffic detected.",
      "critical"
    );

  } else if (threatLevel === "Medium") {

    addNotification(
      "⚠️ Medium Threat",
      "Suspicious DNS activity and abnormal network behavior detected.",
      "warning"
    );

  } else if (threatLevel === "Low") {

    addNotification(
      "🟡 Low Threat",
      "Minor suspicious activity detected.",
      "warning"
    );

  } else {

    addNotification(
      "✅ Network Safe",
      "No malicious network activity was detected.",
      "success"
    );

  }

}, 3000);
  };

  return (
    <>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="ml-[88px] max-w-[1500px] mx-auto px-14 py-12">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
          <Network size={36} />
          Wireshark Packet Analyzer
        </h1>

        {/* Upload Card */}
        <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl border border-cyan-500/20 p-8">

          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-cyan-500 rounded-xl py-12 hover:bg-cyan-500/10 transition">

            <Upload className="text-cyan-400" size={45} />

            <p className="text-white mt-4 text-lg">
              Upload PCAP / PCAPNG File
            </p>

            <p className="text-gray-400 text-sm">
              Supported: .pcap, .pcapng
            </p>

            <input
              type="file"
              accept=".pcap,.pcapng"
              className="hidden"
              onChange={handleFile}
            />
          </label>

          {fileName && (
            <p className="mt-4 text-green-400">
              Uploaded: {fileName}
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 bg-slate-900/70 rounded-xl p-6 text-center">

            <div className="animate-spin h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>

            <p className="text-cyan-300">
              Analyzing Packet Capture...
            </p>

          </div>
        )}

        {/* Result */}
        {showResult && (

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-slate-900/70 rounded-xl p-6">
              <h3 className="text-gray-400">Packets</h3>
              <p className="text-3xl font-bold text-cyan-400">15,284</p>
            </div>

            <div className="bg-slate-900/70 rounded-xl p-6">
              <h3 className="text-gray-400">TCP</h3>
              <p className="text-3xl font-bold text-green-400">8,912</p>
            </div>

            <div className="bg-slate-900/70 rounded-xl p-6">
              <h3 className="text-gray-400">UDP</h3>
              <p className="text-3xl font-bold text-yellow-400">2,341</p>
            </div>

            <div className="bg-slate-900/70 rounded-xl p-6">
              <h3 className="text-gray-400">Threat Level</h3>

              <p className="text-3xl font-bold text-red-400">
               {threatLevel}
              </p>

            </div>

            <div className="col-span-full bg-slate-900/70 rounded-xl p-8">

              <div className="flex items-center gap-3 mb-4">

                <ShieldCheck className="text-cyan-400" />

                <h2 className="text-2xl font-bold text-white">
                  AI Summary
                </h2>

              </div>

              <ul className="space-y-2 text-gray-300">

                <li>• Suspicious DNS activity detected.</li>

                <li>• Multiple TCP retries observed.</li>

                <li>• No malware communication identified.</li>

              </ul>

              <h2 className="text-xl font-bold text-cyan-400 mt-6 mb-3">
                Recommendations
              </h2>

              <ul className="space-y-2 text-gray-300">

                <li>✔ Monitor Source IPs</li>

                <li>✔ Enable IDS Monitoring</li>

                <li>✔ Review DNS Requests</li>

                <li>✔ Block Suspicious Traffic</li>

              </ul>

            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default WiresharkScan;