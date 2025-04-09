import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "../../icons";
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
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] bg-black/60 flex justify-end">
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`bg-white h-screen shadow-xl p-6 relative`}
              style={{ width }}
            >
              {/* Close Button */}
              <div
                onClick={onClose}
                className="absolute -left-4 top-2 z-[100000] bg-gray-300 p-2 rounded-full flex justify-center items-center cursor-pointer shadow-md"
              >
                <ChevronLeftIcon />
              </div>

              {/* Scrollable Content */}
              <div className="h-full overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedSidebar;
