import { useSearchParams } from "react-router";
import PurchaseStatus from "../components/PurchaseStatus/PurchaseSatus";
import { useEffect, useState } from "react";
export default function OrderStatus() {
  const [serachParams] = useSearchParams();
  const orderId = serachParams.get("orderId");
  const [status, setStatus] = useState<
    "pending" | "success" | "failure" | null
  >(null);

  useEffect(() => {
    if (orderId) {
      setStatus("pending");
      setTimeout(() => {
        setStatus("success");
      }, 10000);
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
