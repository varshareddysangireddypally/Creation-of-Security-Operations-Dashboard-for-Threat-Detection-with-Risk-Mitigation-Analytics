import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ChartColumn,
  Upload,
  Bot,
  FileText,
  User,
  Image,
  Link2,
  Globe,
  Mail,
  QrCode,
  LineChart,
  Settings,
  Network,
  ShieldCheck,
  Radar
} from "lucide-react";

function Sidebar() {

  const menus = [

    {
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      path: "/analytics",
      icon: ChartColumn,
    },

    {
      path: "/upload",
      icon: Upload,
    },

    {
      path: "/agent",
      icon: Bot,
    },

    {
      path: "/reports",
      icon: FileText,
    },

    {
      path: "/profile",
      icon: User,
    },

    {
      path: "/imagescan",
      icon: Image,
    },

    {
      path: "/urlscan",
      icon: Link2,
    },

    {
      path: "/ipscan",
      icon: Globe,
    },

    {
      path: "/emailscan",
      icon: Mail,
    },

    {
      path: "/qrscan",
      icon: QrCode,
    },

    {
      path: "/nmapscan",
      icon: Network,
    },

    {
      path: "/pentest",
      icon: ShieldCheck,
    },

    {
      path: "/wireshark",
      icon: Radar,
    },

    {
      path: "/statistics",
      icon: LineChart,
    },

  ];

  return (
        <aside className="fixed left-0 top-[126px] z-40 flex h-[calc(100vh-126px)] w-20 flex-col border-r border-[#2B3550] bg-[#0C1120]">

      {/* ================= MENU ================= */}

      <div className="flex flex-1 flex-col items-center gap-4 overflow-y-auto py-6">

        {menus.map((item, index) => {

          const Icon = item.icon;

          return (

            <>

              {/* Divider after Profile */}

              {index === 6 && (

                <div className="my-2 h-px w-10 bg-[#2B3550]" />

              )}

              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-xl"
                      : "text-slate-400 hover:bg-[#1C2440] hover:text-white"
                  }`
                }
              >

                <Icon size={23} />

              </NavLink>

            </>

          );

        })}
              </div>

      {/* ================= SETTINGS ================= */}

      <div className="mb-6 mt-2 flex flex-col items-center">

        <div className="mb-4 h-px w-10 bg-[#2B3550]" />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-violet-600 text-white shadow-xl"
                : "text-slate-400 hover:bg-[#1C2440] hover:text-white"
            }`
          }
        >

          <Settings size={23} />

        </NavLink>

      </div>

    </aside>

  );

}

export default Sidebar;