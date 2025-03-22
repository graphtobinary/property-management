import React from "react";

export default function CreateListingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-6">
      <div className="relative flex-row justify-center w-full lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
      </div>
    </div>
  );
}
