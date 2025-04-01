import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { validateEmail } from "../../utils/utils";
import { getUser, loginUser } from "../../api/User.api";
import { Token } from "../../interfaces/auth";
import { AUTH_COOKIES, setCookie } from "../../utils/cookie";
import { AclUserProps } from "../../interfaces";

interface ErrorTypes {
  email?: string;
  password?: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState<ErrorTypes>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      // Reset errors before validation
      const newErrors: ErrorTypes = {};

      // Email validation
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(email)) {
        newErrors.email = "This is an invalid email address.";
      }

      // Password validation
      if (!password.trim()) {
        newErrors.password = "Password is required";
      }

      // Set errors if any
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const formData = {
        email,
        password,
      };

      try {
        setLoading(true);
        const response = (await loginUser(formData)) as Token;
        if (response.accessToken) {
          // Store tokens in cookies
          setCookie(AUTH_COOKIES.ACCESS_TOKEN, response.accessToken);
          setCookie(AUTH_COOKIES.REFRESH_TOKEN, response.refreshToken);
          // Update auth state
          // Call Profile API to get user details
          // setAuth(email, password);
          const { aclUser } = (await getUser(
            response.accessToken
          )) as AclUserProps;
          if (aclUser?.tenant?.tenantBusinessType) {
            navigate("/");
          } else {
            navigate("/tell-us-about-you");
          }
        }
      } catch {
        setErrors({
          password: "Invalid email or password",
        });
      } finally {
        setLoading(false);
      }
    },
    [email, password, navigate]
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  // if (loading) return null;
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSignIn}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    onChange={handleEmailChange}
                    error={Boolean(errors?.email ?? false)}
                    hint={errors.email}
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      error={Boolean(errors?.password ?? false)}
                      hint={errors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-primary hover:text-primary dark:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button
                    className="w-full bg-primary hover:bg-primaryDark"
                    size="sm"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary dark:text-primary"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
