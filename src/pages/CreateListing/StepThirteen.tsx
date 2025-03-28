import PageMeta from "../../components/common/PageMeta";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import GuestPaymentOption from "../../components/GuestPaymentOption";

const StepThirteen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <CreateListingPageLayout>
        <div className="bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 13
            </h3>
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
          <div className="flex flex-col w-2/3">
            <span className="text-lg pb-1 text-gray-500 dark:text-gray-400">
              Final Steps
            </span>

            <span className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              We are in the last mile, you just need to setup payments and
              invoicing before you finally are open for bookings
            </span>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col mb-3">
              <span className=" text-base font-semibold text-gray-800 dark:text-white/90">
                Guest payment options
              </span>
            </div>
            <div className=" gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <GuestPaymentOption />
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </CreateListingPageLayout>
    </>
  );
};

export default StepThirteen;
