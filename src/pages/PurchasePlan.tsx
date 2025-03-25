import React from "react";
import Button from "../components/ui/button/Button";
import { Link, useNavigate } from "react-router";
import { CheckCircleIcon } from "../icons";

// Subscription details component
const SubscriptionDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5">
      <div className="flex justify-between">
        <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
          Subscription & Billing Details
        </h3>
        <Button size="sm" variant="outline" onClick={() => navigate("/")}>
          Exit
        </Button>
      </div>
      <div className="mt-2 w-1/3 bg-gray-100 p-4 rounded-lg shadow">
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Your Subscription </p>
          <span className="font-normal text-md">Free for next 3 days</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Your Organisation </p>
          <span className="font-normal text-md">John Hospitality Services</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Manage your subscription </p>

          <a href="#" className=" font-normal text-md underline">
            Go to Stripe
          </a>
        </div>
      </div>
      <small className="text-gray-400 text-xs">
        For more details regarding subscriptions, please refer to our{" "}
        <Link to="/" className="text-xs text-gray-700 underline">
          Terms of Use
        </Link>
      </small>
    </div>
  );
};

// Pricing card component
interface PricingCardProps {
  title: string;
  subtitle: string;
  features: string[];
  isPremium?: boolean;
  isCurrent?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  features,
  isPremium,
  isCurrent,
}) => {
  return (
    <div
      className={`p-6 px-8 rounded-lg  ${
        isPremium ? "bg-black/70 text-white grow" : "bg-white"
      }`}
    >
      <div className="flex gap-4 items-start justify-between w-full">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <span className="text-xs text-gray-400 mt-5 font-normal">
            {" "}
            {subtitle}
          </span>
        </div>
        {isPremium && <Button variant="outline">Recommended</Button>}
      </div>
      <ul
        className={`mt-4 grid ${
          features.length > 3 ? "grid-cols-2 gap-x-6" : "grid-cols-1"
        } gap-y-4`}
      >
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            ✓ {feature}
          </li>
        ))}
      </ul>
      {isPremium && (
        <Button
          variant="primary"
          className="mt-4 bg-black text-white py-2 px-4 rounded"
        >
          Upgrade to Premium
        </Button>
      )}
      {isCurrent && (
        <Button className="mt-4" variant="outline">
          Current Plan
        </Button>
      )}
    </div>
  );
};

// Pricing comparison table
const PricingComparison: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="mt-4  rounded-lg shadow-md p-6">
        <div className="grid grid-cols-3 gap-4 text-center font-bold">
          <span></span>
          <span>Free</span>
          <span>Premium</span>
        </div>
        {["Feature 1", "Feature 2", "Feature 3", "Feature 4"].map(
          (feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-4 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-200"
              } my-2 rounded-lg`}
            >
              <span className="text-sm text-gray-700">{feature}</span>
              <span className="flex justify-center">
                <CheckCircleIcon fill="black" />
              </span>
              <span className="flex justify-center">
                <CheckCircleIcon />
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

// Main page
const PurchasePlan: React.FC = () => {
  return (
    <>
      <SubscriptionDetails />
      <hr className="border-gray-200 my-5" />
      <h1 className="text-2xl font-bold text-center my-5">
        Transparent Pricing
      </h1>
      <div className="flex justify-center gap-12 w-2/3 m-auto">
        <PricingCard
          title="Free"
          subtitle="Try it as long as yo"
          features={["Feature 1", "Feature 2", "Feature 3"]}
          isCurrent
        />
        <PricingCard
          title="Premium"
          subtitle="Limtless possibilite"
          features={[
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4",
            "Feature 5",
            // "Feature 6",
          ]}
          isPremium
        />
      </div>
      <PricingComparison />
    </>
  );
};

export default PurchasePlan;
