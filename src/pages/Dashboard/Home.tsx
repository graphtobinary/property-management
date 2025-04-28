import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import { Plus } from "../../icons";
import { lazy, useEffect } from "react";
import useUserStore from "../../store/user.store";
import { useListingStore } from "../../store/listing.store";
import Button from "../../components/ui/button/Button";
import { getPropertyTempId } from "../../api/Listing.api";

const EcommerceMetrics = lazy(
  () => import("../../components/ecommerce/EcommerceMetrics")
);
const StatisticsChart = lazy(
  () => import("../../components/ecommerce/StatisticsChart")
);
const DonutChart = lazy(() => import("../../components/ecommerce/DonutChart"));

export default function Home() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.tenant?.tenantBusinessType) navigate("tell-us-about-you");
  }, [user]);

  const { listingFormData, setListingFormData, clearListingStore } =
    useListingStore();

  const handlePropertyTempId = async () => {
    try {
      clearListingStore();
      const { propertyId } = (await getPropertyTempId()) as {
        propertyId: string;
      };

      setListingFormData({
        ...listingFormData,
        propertyTempId: propertyId,
      });
      navigate("/create-listing-step-one");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2
          className="text-xl font-myriad font-bold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Dashboard
        </h2>
        <div className="flex justify-end mb-3">
          <div className="flex">
            <Button
              onClick={handlePropertyTempId}
              size="sm"
              variant="primary"
              startIcon={<Plus className="size-5" />}
            >
              Create Listing
            </Button>
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
