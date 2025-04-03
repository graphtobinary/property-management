import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

const Analytics: React.FC = () => {
  return (
    <>
     <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />
      <PageBreadcrumb pageTitle="Analytics" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Analytics Content
        </h3>
      </div>
    </>
  );
};

export default Analytics;
