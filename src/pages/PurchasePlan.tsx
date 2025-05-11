import PageMeta from "../components/common/PageMeta";
import { PricingPlans } from "../components/PricingPlans";

const PurchasePremium: React.FC = () => {
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      <div className="flex flex-col justify-between gap-3 mb-6">
        <h2
          className="text-xl font-myriad font-bold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Purchase Premium Plan
        </h2>
        <PricingPlans />
      </div>
    </>
  );
};

export default PurchasePremium;
