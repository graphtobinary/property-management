import React from "react";
import { Outlet } from "react-router";

export default function CreateListingPageLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-6 min-h-screen">
      <div className="relative flex flex-col w-full dark:bg-gray-900 sm:p-0">
        {children}
        <Outlet />
      </div>
    </div>
  );
}
