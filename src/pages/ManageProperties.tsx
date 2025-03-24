import { Link } from "react-router";
import PageMeta from "../components/common/PageMeta";
import PropertyList from "../components/PropertyList/PropertyList";
import { Plus } from "../icons";

const ManageProperties: React.FC = () => {
  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2
          className="text-xl font-myriad font-bold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Manage Properties
        </h2>
        <div className="flex justify-end mb-3">
          <div className="flex">
            <Link
              to="/create-listing-step-one"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
            >
              <Plus stroke="#fff" /> <span className="pl-1"> Add Property</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-4">
        <PropertyList />
      </div>
    </>
  );
};

export default ManageProperties;
