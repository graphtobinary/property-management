import PageMeta from "../../components/common/PageMeta";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import UploadPropertyPhotos from "../../components/UploadPropertyPhotos";

const StepEleven: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <CreateListingPageLayout>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 11
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
              In this step, you'll add some of the amenities your place offers,
              plus 5 or more photos. Then you'll create a title and description.
            </span>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col mb-3">
              <span className=" text-base font-semibold text-gray-800 dark:text-white/90">
                Add some photos of your property
              </span>
              <small className="text-gray-400">
                You'll need 5 photos to get started. You can add upto 15 more or
                make changes later.
              </small>
            </div>
            <div className=" gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <UploadPropertyPhotos />
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-3">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>

            <Link
              to="/create-listing-step-twelve"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primaryDark"
            >
              Next
            </Link>
          </div>
        </div>
      </CreateListingPageLayout>
    </>
  );
};

export default StepEleven;
