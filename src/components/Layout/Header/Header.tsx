import { NavLink } from "react-router-dom";
import NotificationBell from "../../Notification/NotificationBell";
import {
  Search,
  ChevronDown,
} from "lucide-react";

import { useUser } from "../../../context/UserContext";

function Header() {

  const { userName } = useUser();

  const menus = [

    {
      title: "Dashboard",
      path: "/dashboard",
    },

    {
      title: "Analytics",
      path: "/analytics",
    },

    {
      title: "Upload Center",
      path: "/upload",
    },

    {
      title: "AI Agent",
      path: "/agent",
    },

    {
      title: "Reports",
      path: "/reports",
    },

    {
      title: "Profile",
      path: "/profile",
    },


    {
      title: "Image Scan",
      path: "/imagescan",
    },

    {
      title: "Statistics",
      path: "/statistics",
    },

  ];

  return (
        <header className="sticky top-0 z-50 w-full border-b border-[#2B3550] bg-[#111827]/95 backdrop-blur-xl">

      {/* ================= TOP HEADER ================= */}

      <div className="flex h-20 items-center justify-between px-10">

        {/* Logo */}

        <div>

          <h1 className="text-[30px] font-bold tracking-tight text-white">

            AI Security

          </h1>

          <p className="mt-1 text-sm text-slate-400">

            Enterprise Threat Detection Platform

          </p>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="flex h-11 w-[340px] items-center rounded-xl border border-[#313B57] bg-[#1B233A] px-4">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="ml-3 w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
            />

          </div>

          {/* Notification */}

          <div className="flex h-11 items-center justify-center">
  <NotificationBell />
</div>

          {/* User */}

          <div className="flex items-center gap-3 rounded-xl bg-[#1B233A] px-4 py-2">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">

              {userName
                ? userName.charAt(0).toUpperCase()
                : "U"}

            </div>

            <div>

              <h3 className="font-semibold text-white">

                {userName || "User"}

              </h3>

              <p className="text-xs text-slate-400">

                Security Analyst

              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-slate-400"
            />

          </div>

        </div>

      </div>

      {/* ================= BOTTOM NAVIGATION ================= */}
            <div className="flex h-14 items-center justify-between border-t border-[#2B3550] bg-gradient-to-r from-violet-700 via-purple-600 to-violet-700 px-8">

        <div className="flex items-center gap-6">

          {menus.map((item) => (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `relative pb-1 text-[15px] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-violet-100 hover:text-white"
                }`
              }
            >

              {({ isActive }) => (

                <>

                  {item.title}

                  {isActive && (

                    <span className="absolute -bottom-[18px] left-0 h-1 w-full rounded-full bg-white" />

                  )}

                </>

              )}

            </NavLink>

          ))}

        </div>

        {/* AI Copilot */}

        

      </div>
          </header>

  );

}

export default Header;