// src/components/ui/toast/ToastProvider.tsx
import React, { createContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

type ToastType = "success" | "error" | "warning";

interface ToastMessage {
  type: ToastType;
  message: string;
}

interface ToastContextProps {
  showToast: (toast: ToastMessage) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((toastData: ToastMessage) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 3000); // hide after 3s
  }, []);

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </ToastContext.Provider>
  );
};
