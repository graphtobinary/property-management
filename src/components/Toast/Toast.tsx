import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CrossIcon } from "../../icons";

type ToastProps = {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
};

const bgColors = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={
          "fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-md px-6 py-3 text-white shadow-lg " +
          bgColors[type]
        }
      >
        {message}
        <button
          onClick={onClose}
          className="ml-4 rounded-md p-1 transition hover:bg-white/20"
        >
          <CrossIcon />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
