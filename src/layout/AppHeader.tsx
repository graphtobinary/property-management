import { useEffect, useRef } from "react";

import { Link } from "react-router";

const AppHeader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Dashboard
          </h2>
          <Link to="/" className="lg:hidden">
            <img
              className="dark:hidden w-24"
              src="./images/logo/manzil-logo.svg"
              alt="Logo"
            />
            <img
              className="hidden dark:block"
              src="./images/logo/manzil-logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
