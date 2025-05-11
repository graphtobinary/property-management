import { createPaymentSession } from "../../api/subscription.api";
import Button from "../ui/button/Button";
import {
  loadCheckoutWebComponents,
  PaymentSessionResponse,
} from "@checkout.com/checkout-web-components";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";

export default function PaymentCTA({
  planId,
  planPriceId,
  setLoading,
}: {
  planId: number;
  planPriceId: number;
  setLoading: (loading: boolean) => void;
}) {
  const { getUserData } = useUser();

  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const handlePayment = async () => {
    console.log(planId, planPriceId);
    const formData = {
      planId,
      planPriceId,
    };
    try {
      const response = await createPaymentSession(formData);
      const { checkoutData } = response as { checkoutData: string };

      if (checkoutData) {
        openModal();
        const checkout = await loadCheckoutWebComponents({
          publicKey: import.meta.env.VITE_CHECKOUT_SANDBOX_PUBLIC_KEY,
          environment: "sandbox",
          locale: "en-GB",
          paymentSession: JSON.parse(checkoutData) as PaymentSessionResponse,
          onReady: () => {
            console.log("onReady");
          },
          onPaymentCompleted: (_component, paymentResponse) => {
            console.log("Create Payment with PaymentId: ", paymentResponse.id);
            handlePaymentSuccess();
          },
          onChange: () => {},
          onError: (component, error) => {
            console.log("onError", error, "Component", component.type);
            toast.error(error?.message);
            closeModal();
          },
        });
        const flowComponent = checkout.create("flow");

        flowComponent.mount(
          document.getElementById("flow-container") as HTMLElement
        );
      }
    } catch (error) {
      console.error("Error creating payment session", error);
    }
  };

  const handlePaymentSuccess = () => {
    setLoading(true);
    closeModal();
    setTimeout(() => {
      getUserData().then(() => {
        navigate("/manage-subscription");
      });
    }, 10000);
  };

  return (
    <>
      <Button
        className="mt-6"
        size="sm"
        variant="primary"
        onClick={handlePayment}
        // onClick={openModal}
      >
        Proceed To Payment
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[400px] p-6 lg:p-10"
      >
        <div
          className="min-h-12 justify-center items-center flex"
          id="flow-container"
        >
          <Loader />
        </div>
      </Modal>
    </>
  );
}
