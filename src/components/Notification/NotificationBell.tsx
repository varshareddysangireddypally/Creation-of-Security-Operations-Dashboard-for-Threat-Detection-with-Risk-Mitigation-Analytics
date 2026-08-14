import { useState } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import NotificationPanel from "./NotificationPanel";

export default function NotificationBell() {
  const { notifications } = useNotification();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-700 transition"
      >
        <Bell size={24} className="text-white" />

        {notifications.length > 0 && (
          <span
            className="
            absolute
            -top-1
            -right-1
            bg-red-600
            text-white
            text-xs
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
            font-bold
            "
          >
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <NotificationPanel
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
}