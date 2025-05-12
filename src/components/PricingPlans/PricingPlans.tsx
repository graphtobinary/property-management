import React, { useState, useEffect } from "react";
import { getPlanAndPrice } from "../../api/subscription.api";
import { BillingCycle, PlanDetails } from "../../interfaces";
import BenefitCard from "./BenefitCard";
import PaymentCTA from "./PaymentCTA";
const benefits = [
  {
    title: "Benefit 1",
    description:
      "In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then you'll create a title and description.",
  },
  {
    title: "Benefit 2",
    description:
      "In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then you'll create a title and description.",
  },
  {
    title: "Benefit 3",
    description:
      "In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then you'll create a title and description.",
  },
];

const PricingPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails>();
  const [plans, setPlans] = useState<PlanDetails[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await getPlanAndPrice();
      const { planAndPrices } = response as { planAndPrices: PlanDetails[] };
      setSelectedPlan(planAndPrices[0]);
      setPlans(planAndPrices);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="rounded-xl p-6 bg-white">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-6 p-8 bg-gray-50 min-h-[460px]">
        {plans?.map((plan: PlanDetails) => {
          const isSelected = selectedPlan?.billingCycle === plan.billingCycle;
          return (
            <div
              key={plan?.billingCycle}
              onClick={() => setSelectedPlan(plan)}
              className={`flex-1 rounded-xl border ${
                isSelected ? "border-gray-400" : "border-gray-200"
              } bg-white p-6 shadow-sm cursor-pointer transition duration-200 relative`}
            >
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="text-lg font-semibold">{plan?.description}</h3>
                  {plan?.offerText && (
                    <div className="flex items-center bg-orange-100 text-primary text-xs font-semibold px-2 rounded ml-2 h-4">
                      {plan?.offerText}
                    </div>
                  )}
                </div>
                <div className="h-5 w-5 border-2 rounded-full flex items-center justify-center">
                  {isSelected && (
                    <div className="h-2.5 w-2.5 bg-black rounded-full" />
                  )}
                </div>
              </div>

              <div className="mt-4 text-3xl font-bold">
                {plan?.currencyCode}
                {plan?.price}
              </div>
              <div className="text-sm text-gray-500">
                {BillingCycle.YEARLY === plan?.billingCycle
                  ? "Annually"
                  : "Monthly"}
              </div>

              {/* {plan?.details && ( */}
              <div className="mt-6 bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Rate</span>
                  <span>
                    {plan?.currencyCode}
                    {plan?.monthlyPrice?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>0</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {plan?.currencyCode}
                    {plan?.price?.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* )} */}

              {isSelected && (
                <PaymentCTA
                  planId={plan?.planId}
                  planPriceId={plan?.planPriceId}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PricingPlans;
