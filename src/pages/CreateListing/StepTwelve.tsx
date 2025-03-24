import PageMeta from "../../components/common/PageMeta";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import GuestPaymentOption from "../../components/GuestPaymentOption";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import { CheckLineIcon } from "../../icons";

const StepTwelve: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

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
              Step 12
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
        <div className="flex justify-end mb-3">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>

            <Button
              onClick={openModal}
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primaryDark"
            >
              Complete Registration
            </Button>
          </div>
        </div>
      </CreateListingPageLayout>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        {/* <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {"Add Event"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Plan your next big moment: schedule or edit an event to stay on
              track
            </p>
          </div>
          <div className="mt-8">
            <div>
              <div></div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Color
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5"></div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter Start Date
              </label>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter End Date
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
          </div>
        </div> */}
        <div className="flex flex-col items-center justify-center  p-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-400">
            {/* <Check size={32} strokeWidth={2} className="text-black" /> */}
            <CheckLineIcon width={50} height={50} />
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Property Listed
          </h2>

          {/* Description */}
          <p className="mt-2 text-center text-gray-500 text-sm max-w-sm">
            Congratulations! Your property has been listed. It can be found in
            the manage properties panel for final publishing.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Done for Now
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/create-listing-step-one")}
            >
              <span className="text-lg">+</span> Add Another
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StepTwelve;
