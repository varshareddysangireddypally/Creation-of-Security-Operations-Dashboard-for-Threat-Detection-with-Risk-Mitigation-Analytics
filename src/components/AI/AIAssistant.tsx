import {
  useState,
  useRef,
  useEffect,
} from "react";

import { askGemini } from "../../services/gemini";

import {
  Bot,
  Minus,
  Maximize2,
  Send,
  Sparkles,
  Mic,
} from "lucide-react";

import aiVideo from "../../assets/videos/ai/ai-assistant.mp4";

import { useUser } from "../../context/UserContext";

function AIAssistant() {

  const { userName } = useUser();

  const [isOpen, setIsOpen] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  const [started, setStarted] = useState(false);

  const [message, setMessage] = useState("");

  const [listening, setListening] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hello ${userName} 👋 Welcome to Enterprise AI Security Copilot.`,
    },
  ]);

  /* ================= DRAG ================= */

  const [position, setPosition] = useState({
    x: window.innerWidth - 440,
    y: 150,
  });

  const dragging = useRef(false);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  const startDrag = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    dragging.current = true;

    dragOffset.current = {

      x: e.clientX - position.x,

      y: e.clientY - position.y,

    };

  };

  useEffect(() => {

    const move = (e: MouseEvent) => {

      if (!dragging.current) return;

      const width = isExpanded ? 520 : 410;

      const height = isExpanded ? 760 : 640;

      setPosition({

        x: Math.max(
          0,
          Math.min(
            window.innerWidth - width,
            e.clientX - dragOffset.current.x
          )
        ),

        y: Math.max(
          0,
          Math.min(
            window.innerHeight - height,
            e.clientY - dragOffset.current.y
          )
        ),

      });

    };

    const stop = () => {

      dragging.current = false;

    };

    window.addEventListener("mousemove", move);

    window.addEventListener("mouseup", stop);

    return () => {

      window.removeEventListener("mousemove", move);

      window.removeEventListener("mouseup", stop);

    };

  }, [isExpanded]);

  /* ================= VOICE ================= */

  const startListening = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition is not supported in this browser.");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    setListening(true);

    recognition.onresult = (event: any) => {

      const transcript = event.results[0][0].transcript;

      setMessage(transcript);

      setListening(false);

    };

    recognition.onerror = () => {

      setListening(false);

    };

    recognition.onend = () => {

      setListening(false);

    };

  };

  const handleSend = async () => {

    if (!message.trim()) return;

    const userMessage = message;

    setStarted(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {

      const aiReply = await askGemini(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiReply,
        },
      ]);

    } catch {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't generate a response.",
        },
      ]);

    }

  };

  if (!isOpen) {

    return (

      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-8 top-24 z-[999] flex items-center gap-3 rounded-2xl bg-violet-600 px-5 py-3 text-white shadow-xl hover:bg-violet-500"
      >

        <Bot size={20} />

        <span>AI Copilot</span>

      </button>

    );

  }
    return (

    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      className={`fixed z-[999] overflow-hidden rounded-[32px]
      border border-[#26324A]
      bg-[#111827]/95
      shadow-2xl
      backdrop-blur-2xl
      transition-all duration-300
      ${
        isExpanded
          ? "w-[520px] h-[82vh]"
          : "w-[410px] h-[640px]"
      }`}
    >

      {/* ================= HEADER ================= */}

      <div
        onMouseDown={startDrag}
        className="flex h-16 cursor-move items-center justify-between border-b border-[#293247] bg-[#151E33] px-6 select-none"
      >

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600">

            <Bot
              size={20}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-[17px] font-semibold text-white">

              AI Security Copilot

            </h2>

            <p className="text-xs text-slate-400">

              Powered by Enterprise AI

            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-2 hover:bg-[#2A3652]"
          >

            <Maximize2
              size={18}
              className="text-slate-300"
            />

          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 hover:bg-[#2A3652]"
          >

            <Minus
              size={18}
              className="text-slate-300"
            />

          </button>

        </div>

      </div>

      {/* ================= WELCOME ================= */}

      {!started && (

        <div className="flex h-[calc(100%-64px)] flex-col items-center justify-center px-8">

          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-52 w-full rounded-3xl object-cover"
          >

            <source
              src={aiVideo}
              type="video/mp4"
            />

          </video>

          <h2 className="mt-8 text-3xl font-semibold text-white">

            Hello,

            <span className="ml-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">

              {userName}

            </span>

            👋

          </h2>

          <p className="mt-4 text-center text-[15px] leading-7 text-slate-400">

            Welcome to Enterprise AI Security Copilot.

            Ask anything about cyber threats,

            malware, cloud security,

            SIEM logs and reports.

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <button className="rounded-full bg-violet-600/15 px-5 py-2 text-sm text-violet-300 hover:bg-violet-600/25">

              Today's Threats

            </button>

            <button className="rounded-full bg-cyan-500/15 px-5 py-2 text-sm text-cyan-300 hover:bg-cyan-500/25">

              Analyze Logs

            </button>

            <button className="rounded-full bg-green-500/15 px-5 py-2 text-sm text-green-300 hover:bg-green-500/25">

              Generate Report

            </button>

            <button className="rounded-full bg-orange-500/15 px-5 py-2 text-sm text-orange-300 hover:bg-orange-500/25">

              Explain Malware

            </button>

          </div>

          <div className="mt-10 w-full">

            <div className="flex items-center gap-3 rounded-2xl border border-[#2B3550] bg-[#1B233A] p-3">

              <Sparkles
                size={20}
                className="text-cyan-400"
              />

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask AI Security Copilot..."
                className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
              />

              <button
                onClick={startListening}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                  listening
                    ? "bg-red-500 animate-pulse"
                    : "bg-violet-600 hover:bg-violet-500"
                }`}
              >

                <Mic
                  size={18}
                  className="text-white"
                />

              </button>

              <button
                onClick={handleSend}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 transition hover:bg-cyan-400"
              >

                <Send
                  size={18}
                  className="text-white"
                />

              </button>

            </div>

          </div>

        </div>

      )}
            {/* ================= CHAT SCREEN ================= */}

      {started && (

        <div className="flex h-[calc(100%-64px)] flex-col">

          {/* Messages */}

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[82%] rounded-2xl px-5 py-4 text-[15px] leading-7 shadow-lg ${
                    msg.role === "assistant"
                      ? "bg-[#1B233A] text-slate-200"
                      : "bg-cyan-500 text-white"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            ))}

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="border-t border-[#293247] px-6 py-5">

            <div className="mb-4 flex flex-wrap gap-3">

              <button
                className="rounded-full bg-violet-600/15 px-4 py-2 text-sm text-violet-300 hover:bg-violet-600/25"
              >
                Summarize Threats
              </button>

              <button
                className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-500/25"
              >
                Explain Malware
              </button>

              <button
                className="rounded-full bg-green-500/15 px-4 py-2 text-sm text-green-300 hover:bg-green-500/25"
              >
                Generate Report
              </button>

            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#2B3550] bg-[#1B233A] p-3">

              <Sparkles
                size={20}
                className="text-cyan-400"
              />

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask AI Security Copilot..."
                className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
              />

              <button
                onClick={startListening}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                  listening
                    ? "bg-red-500 animate-pulse"
                    : "bg-violet-600 hover:bg-violet-500"
                }`}
              >

                <Mic
                  size={18}
                  className="text-white"
                />

              </button>

              <button
                onClick={handleSend}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 transition hover:bg-cyan-400"
              >

                <Send
                  size={18}
                  className="text-white"
                />

              </button>

            </div>

          </div>

        </div>

      )}
          </div>

  );

}

export default AIAssistant;