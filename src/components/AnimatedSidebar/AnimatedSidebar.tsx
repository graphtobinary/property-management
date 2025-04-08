// components/ui/Sidebar.tsx
import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CrossIcon } from "../../icons";
import useOutsideClick from "../../hooks/useOutsideClick";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}

const AnimatedSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  width = "40%",
  children,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  useOutsideClick(sidebarRef, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/60 flex justify-end">
          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`bg-white h-screen overflow-y-auto shadow-xl p-6 relative`}
            style={{ width }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black z-10"
            >
              <CrossIcon />
            </button>

            {/* Content */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedSidebar;
