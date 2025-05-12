import GridShape from "../../components/common/GridShape";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/button/Button";
import { FailedIcon, PendingIcon, SuccessIcon } from "../../icons";
import { useNavigate } from "react-router";
type PurchaseStatusProps = {
  status: "pending" | "success" | "failure";
  setPurchaseStatus?: (
    status: "pending" | "success" | "failure" | null
  ) => void;
};

export default function PurchaseStatus({ status }: PurchaseStatusProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);
  const duration = 6000; // 2s loop for full circle

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    const newProgress = (elapsed % duration) / duration;
    setProgress(newProgress * 100);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (status === "pending") {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        startTimeRef.current = null;
      };
    }
  }, [status]);

  const getStatusIcon = () => {
    const baseCircle =
      "relative w-48 h-48 rounded-full border-4 flex items-center justify-center";

    if (status === "pending") {
      return (
        <div className={`${baseCircle} border-none`}>
          <svg className="absolute w-full h-full rotate-[-90deg]">
            <circle
              className="text-yellow-300"
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeOpacity="0.2"
            />
            <circle
              className="text-yellow-500"
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (progress / 100) * 283}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <PendingIcon className="w-24 h-24 text-yellow-500" />
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className={`${baseCircle} border-green-500`}>
          <SuccessIcon className="w-24  h-24 text-green-500" />
        </div>
      );
    }

    if (status === "failure") {
      return (
        <div className={`${baseCircle} border-red-500`}>
          <FailedIcon className="w-24 h-24 text-red-500" />
        </div>
      );
    }

    return null;
  };

  const getMessage = () => {
    switch (status) {
      case "pending":
        return "Your transaction is being processed.";
      case "success":
        return "Your purchase was successful!";
      case "failure":
        return "Your transaction failed.";
    }
  };

  return (
    <>
      <div className="h-screen w-screen absolute top-0 left-0 z-99999 flex justify-center items-center">
        <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">
          <GridShape />
          <div className="mx-auto w-full max-w-[320px] text-center sm:max-w-[472px]">
            <div className="mb-6 flex items-center justify-center">
              {getStatusIcon()}
            </div>

            <p className="text-base text-gray-700 dark:text-gray-400 sm:text-3xl font-bold">
              {getMessage()}
            </p>
            {status === "failure" && (
              <Button
                onClick={() => {
                  navigate("/purchase-plan");
                }}
                className="mt-6"
                variant="outline"
              >
                Go Back
              </Button>
            )}
            {status === "success" && (
              <Button
                onClick={() => {
                  navigate("/manage-subscription");
                }}
                className="mt-6"
                variant="outline"
              >
                Manage Subscription
              </Button>
            )}
          </div>

          <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
            &copy; {new Date().getFullYear()} - Manzil
          </p>
        </div>
      </div>
    </>
  );
}
