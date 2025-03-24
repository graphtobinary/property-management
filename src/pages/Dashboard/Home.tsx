import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import DonutChart from "../../components/ecommerce/DonutChart";
import { Link } from "react-router";
import { Plus } from "../../icons";

export default function Home() {
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
          {/* <MonthlyTarget /> */}
          <DonutChart />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
