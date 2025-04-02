import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router";
import { EmptyBlocksIcon, Plus } from "../../icons";
import React, { lazy } from "react";
import { PropertyEmptyStateProps } from "../../interfaces";

const EcommerceMetrics = lazy(
  () => import("../../components/ecommerce/EcommerceMetrics")
);
const StatisticsChart = lazy(
  () => import("../../components/ecommerce/StatisticsChart")
);
const DonutChart = lazy(() => import("../../components/ecommerce/DonutChart"));

const EmptyState: React.FC<PropertyEmptyStateProps> = ({
  title = "Nothing to see here",
  description = "You need to add at least 2-3 properties to be able to view data on dashboard.",
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center py-10 px-4">
      <EmptyBlocksIcon width={70} height={73} />
      <h2 className="text-lg font-semibold text-gray-900 mt-2">{title}</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-sm">{description}</p>
      <div className="flex mt-3">
        <Link
          to="/create-listing-step-one"
          className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
        >
          <Plus stroke="#fff" /> <span className="pl-1"> Create Listing</span>
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  // eslint-disable-next-line no-constant-condition
  if (false) return <EmptyState />;
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2
          className="text-xl font-myriad font-bold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Dashboard
        </h2>
        <div className="flex justify-end mb-3">
          <div className="flex">
            <Link
              to="/create-listing-step-one"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
            >
              <Plus stroke="#fff" />{" "}
              <span className="pl-1"> Create Listing</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-12 ">
          <EcommerceMetrics />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <DonutChart />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>
      </div>
    </>
  );
}
