import { Link, useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
import useUserStore from "../store/user.store";
import { getRemainingDays } from "../utils/utils";
import { Modal } from "../components/ui/modal";
import Button from "../components/ui/button/Button";
import { useModal } from "../hooks/useModal";
import { cancelSubscription } from "../api/subscription.api";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
const ManageSubscription: React.FC = () => {
  const { subscription } = useUserStore();

  const { isOpen, openModal, closeModal } = useModal();
  const { getUserData } = useUser();
  const {
    isOpen: isOpenConfirmation,
    openModal: openModalConfirmation,
    closeModal: closeModalConfirmation,
  } = useModal();

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription({
        subscriptionId: subscription?.subscriptionId || 0,
        reason: "Test",
      });
      getUserData().then(() => {
        closeModal();
        openModalConfirmation();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (subscription?.isExpired) {
      navigate("/");
    }
  }, [subscription?.isExpired]);

  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      <div className="flex flex-col justify-between gap-3 mb-6">
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-6 bg-white shadow-sm ">
          <div>
            <p className="text-lg font-semibold text-gray-800">
              You are currently in{" "}
              <span className="text-orange-500">{subscription?.plan.name}</span>
              !
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Your next billing cycle is in{" "}
              {subscription?.subscriptionEndDate
                ? getRemainingDays(subscription.subscriptionEndDate)
                : 0}{" "}
              days.
            </p>
          </div>
          <Button
            onClick={openModal}
            variant="outline"
            size="sm"
            disabled={subscription?.isSubscriptionCanceled}
          >
            Cancel Subscription
          </Button>
        </div>
        <TransactionsTable />
        <div className="flex justify-between flex-col gap-5">
          <p className="text-xs text-gray-500 mt-4">
            For more details regarding subscriptions, please refer to our{" "}
            <Link
              to="/terms-condition"
              target="_blank"
              className="underline font-medium text-gray-600"
            >
              Terms of Use
            </Link>
            .
          </p>
          {/* <div>
            <Button
              //   onClick={handlePropertyTempId}
              size="sm"
              variant="primary"
            >
              Download Invoice
            </Button>
          </div> */}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[400px] p-6 lg:p-10"
      >
        <div className="flex flex-col items-center justify-center  p-6">
          {/* Success Icon */}

          {/* Heading */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Are you sure?
          </h2>

          {/* Description */}
          <p className="mt-2 text-center text-gray-500 text-sm max-w-sm">
            Do you want to cancel your subscription?
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelSubscription}
            >
              {"Yes, Cancel"}
            </Button>
            <Button size="sm" variant="primary" onClick={closeModal}>
              Not right now
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenConfirmation}
        onClose={closeModalConfirmation}
        className="max-w-[400px] p-6 lg:p-10"
      >
        <div className="flex flex-col items-center justify-center  p-6">
          {/* Success Icon */}

          {/* Heading */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Subscription Cancelled
          </h2>

          {/* Description */}
          <p className="mt-2 text-center text-gray-500 text-sm max-w-sm">
            Your subscription has been cancelled. You’ll keep access until the
            end of your billing cycle. You can reactivate anytime from your
            account settings.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              size="sm"
              variant="outline"
              onClick={closeModalConfirmation}
            >
              {"Ok"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageSubscription;
