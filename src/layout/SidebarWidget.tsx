import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { AUTH_COOKIES, removeCookie } from "../utils/cookie";
import { useNavigate } from "react-router";
import useUserStore from "../store/user.store";

export default function SidebarWidget() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { clearUserStore } = useUserStore();
  const { user } = useUserStore();

  const logout = () => {
    removeCookie(AUTH_COOKIES.ACCESS_TOKEN);
    removeCookie(AUTH_COOKIES.REFRESH_TOKEN);
    clearUserStore();
    navigate("/signin");
  };

  useOutsideClick(userMenuRef, () => setIsUserDropdownOpen(false));
  return (
    <>
      <div
        className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
      >
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
          Upgrade to premium membership
        </h3>
        <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
          Get access to all the features to manage your properties effortlessly
        </p>
        <a
          href="/purchase-plan"
          className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
        >
          Purchase Plan
        </a>
      </div>
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
            <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.tenant?.firstName} {user?.tenant?.lastName}
            </span>
            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
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
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
