import { useSearchParams } from "react-router";
import PurchaseStatus from "../components/PurchaseStatus/PurchaseSatus";
import { useEffect, useState } from "react";
import { getCurrentPaymentStatus } from "../api/subscription.api";
import useUser from "../hooks/useUser";
import { SubscriptionTxnStatus } from "../interfaces";
export default function OrderStatus() {
  const [serachParams] = useSearchParams();
  const orderId = serachParams.get("orderId");
  const [status, setStatus] = useState<
    "pending" | "success" | "failure" | null
  >("pending");
  const { getUserData } = useUser();

  // write a polling function to check the status of the payment, max 10 times
  const checkPaymentStatus = async () => {
    if (!orderId) return;

    let attempts = 0;
    const maxAttempts = 10;
    const pollInterval = 5000; // 2 seconds between attempts

    const poll = async () => {
      try {
        const { txnStatus } = (await getCurrentPaymentStatus({
          paymentId: orderId,
        })) as { txnStatus: SubscriptionTxnStatus };

        if (txnStatus === SubscriptionTxnStatus.COMPLETED) {
          getUserData().then(() => {
            setStatus("success");
          });
          return;
        } else if (txnStatus === SubscriptionTxnStatus.FAILED) {
          setStatus("failure");
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, pollInterval);
        } else {
          setStatus("failure");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setStatus("failure");
      }
    };

    poll();
  };

  useEffect(() => {
    if (orderId) {
      setStatus("pending");
      checkPaymentStatus();
    } else {
      setStatus("failure");
    }
  }, [orderId]);

  if (status === null) return null;
  return (
    <>
      <PurchaseStatus status={status} />
    </>
  );
}
