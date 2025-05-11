import React, { useEffect, useState } from "react";
import { BillingCycle } from "../../interfaces";
import { getSubscriptions } from "../../api/subscription.api";
import useUser from "../../hooks/useUser";
import useUserStore from "../../store/user.store";
import { useNavigate } from "react-router";
import { ISubscriptionDataProps } from "../../interfaces/user";

const TransactionsTable: React.FC = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<ISubscriptionDataProps[]>(
    []
  );
  const { getUserData } = useUser();
  const { subscription } = useUserStore();

  const fetchSubscriptions = async () => {
    try {
      const { subscriptions } = (await getSubscriptions()) as {
        subscriptions: ISubscriptionDataProps[];
      };

      setSubscriptions(subscriptions);
    } catch (error) {
      console.error(error, "");
    }
  };

  useEffect(() => {
    getUserData().then(() => {
      if (subscription?.plan.name === "Premium Plan") {
        fetchSubscriptions();
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-left bg-gray-50 border-b border-gray-200">
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Sl No.
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Transaction ID
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Transaction Type
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Amount Paid
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Next Billing Date
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions?.map((txn, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {txn?.dateCreated}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {txn.transactionId}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {BillingCycle.YEARLY === txn.billingCycle
                    ? "Yearly"
                    : "Monthly"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {txn.currencyCode}
                  {txn.price}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {txn?.nextBillingDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
