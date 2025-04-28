import { Link } from "react-router";

const AppLogo = ({
  isExpanded,
  isHovered,
  isMobileOpen,
  hiddenOnMobile = false,
}: {
  isExpanded?: boolean;
  isHovered?: boolean;
  isMobileOpen?: boolean;
  hiddenOnMobile?: boolean;
}) => {
  let displayClass = "";
  if (hiddenOnMobile) {
    displayClass += "hidden sm:flex ";
  } else {
    displayClass += "flex ";
  }
  return (
    <div
      className={`py-4 ${displayClass} ${
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
    </div>
  );
};

export default AppLogo;
