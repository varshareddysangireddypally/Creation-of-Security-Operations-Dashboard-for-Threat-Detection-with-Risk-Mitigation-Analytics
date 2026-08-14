import { X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

interface Props {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: Props) {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      className="
      absolute
      right-0
      top-14
      w-96
      max-h-[500px]
      overflow-y-auto
      rounded-2xl
      bg-slate-900
      border
      border-slate-700
      shadow-2xl
      z-50
      p-4
      "
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">
          Security Notifications
        </h2>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400"
        >
          <X size={20} />
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No notifications available
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`
                rounded-xl
                p-3
                border-l-4
                ${
                  item.type === "critical"
                    ? "border-red-500 bg-red-500/10"
                    : item.type === "warning"
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-green-500 bg-green-500/10"
                }
              `}
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm mt-1">
                    {item.message}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {item.time}
                  </p>

                </div>

                <button
                  onClick={() => removeNotification(item.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={18} />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}