import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  CalenderIcon,
  ChevronDownIcon,
  HomeIcon,
  HorizontaLDots,
  ManagePropertiesIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import AppLogo from "../components/AppLogo/AppLogo";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import Button from "../components/ui/button/Button";
import { AUTH_COOKIES, removeCookie } from "../utils/cookie";
import useUserStore from "../store/user.store";
import { getRemainingDays } from "../utils/utils";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  isActive: boolean;
};

const AppSidebar: React.FC = () => {
  const [navMenuItems, setNavMenuItems] = useState<NavItem[]>([
    {
      icon: <HomeIcon />,
      name: "Dashboard",
      path: "/",
      isActive: true,
    },
    {
      icon: <ManagePropertiesIcon />,
      name: "Manage Properties",
      path: "/manage-properties",
      isActive: true,
    },
    {
      icon: <CalenderIcon />,
      name: "Calendar",
      path: "/calendar",
      isActive: true,
    },
  ]);

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isUpgradeModalOpen,
    openModal: openUpgradeModal,
    closeModal: closeUpgradeModal,
  } = useModal();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { subscription } = useUserStore();

  // Update menu based on subscription
  useEffect(() => {
    setNavMenuItems((prevItems) =>
      prevItems.map((item) => {
        if (
          (item.path === "/manage-properties" || item.path === "/calendar") &&
          subscription?.isExpired
        ) {
          return { ...item, isActive: false };
        }
        return { ...item, isActive: true };
      })
    );
  }, [subscription]);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = navMenuItems; // menuType === "main" ? navMenuItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (menuType: "main" | "others") => {
    return (
      <ul className="flex flex-col gap-4">
        {navMenuItems.map((nav, index) => {
          return (
            <li key={nav.name}>
              {nav.subItems ? (
                <button
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className={`menu-item group ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  } cursor-pointer ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                  disabled={nav.isActive}
                >
                  <span
                    className={`menu-item-icon-size  ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <ChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? "rotate-180 text-brand-500"
                          : ""
                      }`}
                    />
                  )}
                </button>
              ) : (
                nav.path && (
                  <Link
                    to={nav.isActive ? nav.path : "#"}
                    className={`menu-item group ${
                      isActive(nav.path)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!nav.isActive ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                  </Link>
                )
              )}
              {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                          <span className="flex items-center gap-1 ml-auto">
                            {subItem.new && (
                              <span
                                className={`ml-auto ${
                                  isActive(subItem.path)
                                    ? "menu-dropdown-badge-active"
                                    : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge`}
                              >
                                new
                              </span>
                            )}
                            {subItem.pro && (
                              <span
                                className={`ml-auto ${
                                  isActive(subItem.path)
                                    ? "menu-dropdown-badge-active"
                                    : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge`}
                              >
                                pro
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };
  const { clearUserStore } = useUserStore();
  const logout = () => {
    removeCookie(AUTH_COOKIES.ACCESS_TOKEN);
    removeCookie(AUTH_COOKIES.REFRESH_TOKEN);
    clearUserStore();
    window.location.href = "/signin";
  };

  const navigate = useNavigate();

  return (
    <>
      <aside
        className={`fixed mt-20 md:mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AppLogo
          isExpanded={isExpanded}
          isHovered={isHovered}
          isMobileOpen={isMobileOpen}
          hiddenOnMobile
          // isHidden
        />
        {/* <div
        className={`py-4 hidden md:flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/manzil-logo.svg"
                alt="Logo"
                width={90}
                height={60}
              />

              <img
                className="hidden dark:block"
                src="/images/logo/manzil-logo.svg"
                alt="Logo"
                width={90}
                height={60}
              />
            </>
          ) : (
            <img
              src="/images/logo/manzil-logo.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div> */}

        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    ""
                  ) : (
                    <HorizontaLDots className="size-6" />
                  )}
                </h2>
                {renderMenuItems("main")}
              </div>
              {subscription?.isExpired && (
                <div
                  className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
                >
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Upgrade to premium membership
                  </h3>
                  <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
                    Get access to all the features to manage your properties
                    effortlessly
                  </p>

                  <Button onClick={openUpgradeModal} variant="primary">
                    Purchase Plan
                  </Button>
                </div>
              )}
              <div className="">
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                ></h2>
              </div>
            </div>
          </nav>
        </div>

        <div className=" absolute bottom-24 sm:bottom-5  md:flex flex-col">
          {isExpanded || isHovered || isMobileOpen ? (
            <SidebarWidget
              openModal={openModal}
              openUpgradeModal={openUpgradeModal}
            />
          ) : null}
        </div>
      </aside>
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={closeUpgradeModal}
        className="max-w-[650px] p-6 lg:p-5"
      >
        <div className="flex flex-col  justify-center  ">
          {/* Success Icon */}

          {/* Heading */}
          {subscription?.isExpired ? (
            <>
              <h2 className=" text-xl font-normal text-gray-900">
                Your subscription has expired.
              </h2>
              <span className="text-gray-500 text-sm">
                Please upgrade to continue.
              </span>
            </>
          ) : (
            <>
              <h2 className=" text-xl font-normal text-gray-900">
                You are currently in{" "}
                <span className="font-semibold">Starter Plan!</span>
              </h2>
              <span className="text-gray-500 text-sm">
                Your free access to Manzil ends in{" "}
                <span className="text-primary">
                  {getRemainingDays(subscription?.subscriptionEndDate || "")}{" "}
                  days
                </span>
                .
              </span>
            </>
          )}

          <div className="bg-gray-600 rounded-lg p-2.5 sm:bg-[url('/images/purchae-modal-bg.png')] bg-contain bg-center bg-no-repeat h-48 w-full mt-6 justify-center items-center sm:p-6 ">
            <div className="flex flex-col gap-5 relative">
              <div className="flex flex-col gap-2 w-3/4">
                <div className="text-xl font-semibold text-white ">
                  Upgrade to premium membership
                </div>
                <div className="text-sm font-normal text-gray-300 ">
                  Get access to all the features to manage your properties
                  effortlessly
                </div>
              </div>
              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    closeUpgradeModal();
                    navigate("/purchase-plan");
                  }}
                >
                  Upgrade Now
                </Button>
              </div>
              <div className="absolute right-2 top-2">
                <img
                  src="/images/logo/manzil-logo.svg"
                  alt="Logo"
                  width={64}
                  height={64}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
            Do you want to logout?
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button size="sm" variant="outline" onClick={logout}>
              {"Yes, Logout"}
            </Button>
            <Button size="sm" variant="primary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppSidebar;
