import { useEffect, useState } from "react";

import worldMap from "../../assets/backgrounds/world-map.jpg";

import {
  Globe,
  MapPin,
} from "lucide-react";

import { listenDashboardData } from "../../services/dashboardService";

type DashboardData = {
  worldMap: {
    usa: number;
    india: number;
    germany: number;
    uk: number;
    japan: number;
  };
};

function WorldMap() {

  const [countries, setCountries] = useState([
    {
      country: "United States",
      attacks: 324,
    },
    {
      country: "India",
      attacks: 281,
    },
    {
      country: "Germany",
      attacks: 146,
    },
    {
      country: "United Kingdom",
      attacks: 122,
    },
    {
      country: "Japan",
      attacks: 108,
    },
  ]);

  useEffect(() => {

    const unsubscribe = listenDashboardData((data: DashboardData) => {

      if (!data.worldMap) return;

      setCountries([
        {
          country: "United States",
          attacks: data.worldMap.usa,
        },
        {
          country: "India",
          attacks: data.worldMap.india,
        },
        {
          country: "Germany",
          attacks: data.worldMap.germany,
        },
        {
          country: "United Kingdom",
          attacks: data.worldMap.uk,
        },
        {
          country: "Japan",
          attacks: data.worldMap.japan,
        },
      ]);

    });

    return () => unsubscribe();

  }, []);

  return (

    <div className="rounded-[28px] border border-[#26324A] bg-[#101827]/85 p-6 shadow-2xl backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Global Threat Map

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Live cyber attack distribution across regions

          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2">

          <Globe
            size={18}
            className="text-cyan-400"
          />

          <span className="text-sm font-medium text-cyan-400">

            Global Monitoring

          </span>

        </div>

      </div>

      <div className="relative h-[300px] overflow-hidden rounded-2xl border border-[#26324A] bg-[#0F172A]">

        <img
          src={worldMap}
          alt="World Map"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />

        <div className="absolute left-[23%] top-[32%]">

          <span className="flex h-4 w-4 animate-ping rounded-full bg-red-500" />

          <MapPin
            size={18}
            className="absolute -left-1 -top-1 text-red-500"
          />

        </div>

        <div className="absolute left-[48%] top-[38%]">

          <span className="flex h-4 w-4 animate-ping rounded-full bg-yellow-400" />

          <MapPin
            size={18}
            className="absolute -left-1 -top-1 text-yellow-400"
          />

        </div>

        <div className="absolute left-[73%] top-[42%]">

          <span className="flex h-4 w-4 animate-ping rounded-full bg-cyan-400" />

          <MapPin
            size={18}
            className="absolute -left-1 -top-1 text-cyan-400"
          />

        </div>

      </div>

      <div className="mt-6 space-y-3">

        {countries.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-[#26324A] bg-[#182235] px-4 py-3 transition hover:border-cyan-500/30"
          >

            <div className="flex items-center gap-3">

              <MapPin
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm font-medium text-slate-200">

                {item.country}

              </span>

            </div>

            <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400">

              {item.attacks} Attacks

            </span>

          </div>

        ))}

      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <h3 className="text-lg font-semibold text-white">

          🌍 Global AI Summary

        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">

          Gemini AI detected increased phishing and malware campaigns across
          North America and Asia-Pacific. India and the United States recorded
          the highest number of suspicious events during the last 24 hours.
          AI recommends enabling continuous monitoring, enforcing Multi-Factor
          Authentication (MFA), and strengthening endpoint protection across
          all regions.

        </p>

      </div>

    </div>

  );

}

export default WorldMap;