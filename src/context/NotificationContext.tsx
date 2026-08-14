import { createContext, useContext, useState } from "react";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "critical";
  time: string;
}

interface ContextType {
  notifications: NotificationItem[];
  addNotification: (
    title: string,
    message: string,
    type: "success" | "warning" | "critical"
  ) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<ContextType | null>(null);

export const NotificationProvider = ({ children }: any) => {

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (
    title: string,
    message: string,
    type: "success" | "warning" | "critical"
  ) => {

    const id = Date.now();

    setNotifications(prev => [
      {
        id,
        title,
        message,
        type,
        time: new Date().toLocaleTimeString()
      },
      ...prev
    ]);

    setTimeout(() => {
      removeNotification(id);
    }, 30000);

  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );

};

export const useNotification = () => {

  const context = useContext(NotificationContext);

  if (!context)
    throw new Error("NotificationProvider Missing");

  return context;

};