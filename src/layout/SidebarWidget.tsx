import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useNavigate } from "react-router";
import useUserStore from "../store/user.store";
import Button from "../components/ui/button/Button";

export default function SidebarWidget({
  openModal,
}: {
  openModal: () => void;
  openUpgradeModal: () => void;
}) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUserStore();

  useOutsideClick(userMenuRef, () => setIsUserDropdownOpen(false));

  const navigate = useNavigate();
  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };
  return (
    <>
      <div className="relative" ref={userMenuRef}>
        {/* User Profile Button */}
        <div
          className="flex items-center text-gray-700 cursor-pointer dark:text-gray-400"
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        >
          <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
            <img src="/images/user/owner.jpg" alt="User" />
          </span>
          <div>
            <span className="block font-medium text-white text-theme-sm dark:text-gray-400">
              {user?.tenant?.firstName} {user?.tenant?.lastName}
            </span>
            <span className="mt-0.5 block text-theme-xs text-white dark:text-gray-400">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isUserDropdownOpen && (
          <div className="absolute bottom-full mb-2 right-0 w-40 bg-white shadow-lg rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => openModal()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="mt-5">
        <Button onClick={handleManageSubscription} size="sm" variant="outline">
          Manage Subscription
        </Button>
      </div>
    </>
  );
}
