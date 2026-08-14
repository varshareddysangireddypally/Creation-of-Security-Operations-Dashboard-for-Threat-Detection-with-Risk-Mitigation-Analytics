import {
  ShieldAlert,
  ShieldCheck,
  Bot,
  Clock,
} from "lucide-react";

const events = [

  {
    time: "09:15 AM",
    title: "Phishing Email Detected",
    status: "Blocked",
    color: "red",
    icon: ShieldAlert,
  },

  {
    time: "09:42 AM",
    title: "Suspicious Login Attempt",
    status: "Investigating",
    color: "yellow",
    icon: Clock,
  },

  {
    time: "10:05 AM",
    title: "Gemini AI Recommended Firewall Rule",
    status: "Applied",
    color: "cyan",
    icon: Bot,
  },

  {
    time: "10:30 AM",
    title: "Malware Quarantined",
    status: "Resolved",
    color: "green",
    icon: ShieldCheck,
  },

];

function ThreatTimeline() {

  return (
        <div className="rounded-[28px] border border-[#26324A] bg-[#101827]/85 p-6 shadow-2xl backdrop-blur-xl">

      {/* ================= HEADER ================= */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Threat Timeline

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Live Security Operations Center Event Feed

          </p>

        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">

          ● Live

        </div>

      </div>

      {/* ================= EVENTS ================= */}

      <div className="space-y-6">

        {events.map((event, index) => {

          const Icon = event.icon;

          return (

            <div
              key={index}
              className="flex gap-5"
            >

              {/* Timeline */}

              <div className="flex flex-col items-center">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full
                  ${
                    event.color === "red"
                      ? "bg-red-500/15 text-red-400"
                      : event.color === "yellow"
                      ? "bg-yellow-500/15 text-yellow-400"
                      : event.color === "cyan"
                      ? "bg-cyan-500/15 text-cyan-400"
                      : "bg-green-500/15 text-green-400"
                  }`}
                >

                  <Icon size={22} />

                </div>

                {index !== events.length - 1 && (

                  <div className="mt-2 h-16 w-[2px] bg-[#2B3550]" />

                )}

              </div>

              {/* Event Card */}

              <div className="flex-1 rounded-2xl border border-[#25314A] bg-[#182235] p-5">

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold text-white">

                    {event.title}

                  </h3>

                  <span className="text-sm text-slate-400">

                    {event.time}

                  </span>

                </div>

                <p className="mt-3 text-sm leading-7 text-slate-300">

                  AI Security Engine analyzed this event and automatically
                  generated the recommended response based on enterprise
                  security policies.

                </p>

                <div className="mt-4">
                                      <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-medium
                    ${
                      event.color === "red"
                        ? "bg-red-500/15 text-red-400"
                        : event.color === "yellow"
                        ? "bg-yellow-500/15 text-yellow-400"
                        : event.color === "cyan"
                        ? "bg-cyan-500/15 text-cyan-400"
                        : "bg-green-500/15 text-green-400"
                    }`}
                  >

                    {event.status}

                  </span>

                </div>

              </div>

            </div>

          );

        })}

      </div>

      {/* ================= AI RECOMMENDATION ================= */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <h3 className="text-lg font-semibold text-white">

          Gemini AI Recommendation

        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">

          The recent security events indicate increased phishing activity
          and suspicious authentication attempts. AI recommends enabling
          adaptive MFA, reviewing firewall rules, isolating compromised
          endpoints, and continuously monitoring network traffic to
          minimize enterprise risk.

        </p>

      </div>

    </div>

  );

}

export default ThreatTimeline;