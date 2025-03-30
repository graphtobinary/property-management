import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { lazy } from "react";

const DynamicRoomSelector = lazy(
  () => import("../../components/DynamicRoomSelector")
);

const StepSeven: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 7
            </h3>
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Exit
            </Button>
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
          <div className="flex flex-col ">
            <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
              Add a few basic details of your property
            </span>
            <div className=" gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <DynamicRoomSelector />
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default StepSeven;
