import { useState } from "react";

import Header from "../../components/Layout/Header/Header";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import AIAssistant from "../../components/AI/AIAssistant";
import { useNotification } from "../../context/NotificationContext";
import bgVideo from "../../assets/videos/upload/Futuristic Blue Particles.mp4";

import { analyzeText } from "../../services/textAnalyzer";

function EmailScan() {
  const { addNotification } = useNotification();

  const [message, setMessage] = useState("");

  const [result, setResult] = useState("");

  const analyze = () => {

  if (!message.trim()) {

    alert("Please paste an email or message.");
    return;

  }

  const output = analyzeText(message);

  if (output.includes("PHISHING")) {

    addNotification(
      "🚨 Phishing Email Detected",
      "The email appears to be a phishing attempt.",
      "critical"
    );

  }
  else if (output.includes("SCAM")) {

    addNotification(
      "⚠️ Scam Message",
      "The message contains scam indicators.",
      "critical"
    );

  }
  else if (output.includes("SUSPICIOUS")) {

    addNotification(
      "🟡 Suspicious Email",
      "The message appears suspicious.",
      "warning"
    );

  }
  else {

    addNotification(
      "✅ Safe Message",
      "No major threats were detected.",
      "success"
    );

  }

  setResult(output);


  };

  return (

<div className="relative min-h-screen overflow-hidden bg-[#070B16]">

<video
autoPlay
muted
loop
playsInline
className="fixed inset-0 h-full w-full object-cover opacity-35"
>

<source
src={bgVideo}
type="video/mp4"
/>

</video>

<div className="fixed inset-0 bg-[#050913]/20 backdrop-blur-[1px]" />

<Header />

<Sidebar />

<div
className="relative transition-all duration-500"
style={{ marginLeft: "88px" }}
>

<main className="mx-auto max-w-[1500px] px-14 py-12">

<h1 className="text-5xl font-bold text-white">

Enterprise Email & Text Threat Analyzer

</h1>

<p className="mt-3 text-slate-300 text-lg">

Analyze Emails, SMS, WhatsApp, Telegram and other messages for phishing and scam attempts.

</p>
<div className="mt-10 rounded-[30px] border border-cyan-500/20 bg-[#101827]/90 p-8 shadow-2xl">

  <h2 className="mb-6 text-2xl font-bold text-white">

    Paste Email / SMS / Message

  </h2>

  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder={`Paste any Email, SMS, WhatsApp or Telegram message here...

Example:

Dear Customer,

Your account has been suspended.

Click here to verify your account immediately.

https://secure-bank-login.xyz`}
    className="h-[320px] w-full rounded-2xl border border-cyan-500/20 bg-[#0F172A] p-6 text-white outline-none placeholder:text-slate-500"
  />

  <button
    onClick={analyze}
    className="mt-8 rounded-2xl bg-cyan-500 px-10 py-4 font-semibold text-white transition hover:bg-cyan-600"
  >

    Analyze Threat

  </button>

</div>
<div className="mt-10 rounded-[30px] border border-red-500/20 bg-[#101827]/90 p-8 shadow-2xl">

  <h2 className="mb-6 text-2xl font-bold text-white">

    Enterprise AI Analysis

  </h2>

  <div className="rounded-2xl bg-[#0F172A] p-6">

    <pre className="whitespace-pre-wrap leading-8 text-slate-300">

{result ||

`Waiting for analysis...

Paste an Email, SMS, WhatsApp or Telegram message.

The AI Engine will detect:

• Phishing Emails
• Scam Messages
• Fake Banking Alerts
• Credential Theft
• Social Engineering
• OTP Fraud
• Suspicious Links
• Urgency Attacks`

}

    </pre>

  </div>

</div>

<div className="h-24" />

</main>

<AIAssistant />

</div>

</div>

);

}

export default EmailScan;