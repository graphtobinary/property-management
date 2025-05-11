import PageMeta from "../../components/common/PageMeta";
import { lazy, useEffect } from "react";
import ExitButton from "../../components/ExitButton";
import { useNavigate } from "react-router";
import useUserStore from "../../store/user.store";
const DynamicRoomSelector = lazy(
  () => import("../../components/DynamicRoomSelector")
);

const StepSeven: React.FC = () => {
  const navigate = useNavigate();
  const { subscription } = useUserStore();
  useEffect(() => {
    if (subscription?.isExpired) {
      navigate("/");
    }
  }, [subscription?.isExpired]);
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      <>
        <div className="flex flex-col bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 7
            </h3>
            <ExitButton isListingPage />
          </div>
          <div className="flex flex-col w-2/3">
            <span className="text-lg pb-1 text-gray-500 dark:text-gray-400">
              Tell us about your place
            </span>

            <span className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              In this step, you’ll add some of the amenities your place offers,
              plus 5 or more photos. Then you’ll create a title and description.
            </span>
          </div>
          <DynamicRoomSelector />
        </div>
      </>
    </>
  );
};

export default StepSeven;
