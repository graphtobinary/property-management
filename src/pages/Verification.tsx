import { useCallback, useEffect, useState } from "react";
import AppLogo from "../components/AppLogo";
import PageMeta from "../components/common/PageMeta";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import Alert from "../components/ui/alert/Alert";
import AuthLayout from "./AuthPages/AuthPageLayout";
import { validateEmail } from "../utils/utils";
import Button from "../components/ui/button/Button";
import { useParams } from "react-router";
import { verifyEmail } from "../api/User.api";
import Loader from "../components/Loader/Loader";
import { getCountryList } from "../api/Listing.api";

export default function Verification() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  // const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({
    email: "",
  });
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const getCountries = async () => {
    try {
      const data = await getCountryList();
      console.log(data);
      // setCountries(data as any);
    } catch (error) {
      console.log(error);
    }
  };

  const { token } = useParams();
  useEffect(() => {
    getCountries();
    handleVerifyEmail();
  }, []);

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail({
        invitation_token: token as string,
      });
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSendVerificationEmail = useCallback(async () => {
    // Reset errors before validation
    const newErrors: {
      email?: string;
    } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "This is an invalid email address.";
    }

    // Set errors if any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setBtnLoading(true);
      // api call will be added here
    } catch (error) {
      console.error(error);
      setBtnLoading(false);
    }
  }, [email]);

  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <AuthLayout>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col  flex-1 w-full px-12">
            <div className="flex flex-col h-full">
              <div className="mb-5 sm:mb-8">
                <AppLogo
                  isExpanded={true}
                  isHovered={false}
                  isMobileOpen={false}
                />
              </div>
              {isLoading ? (
                <div className="flex w-full h-full justify-center items-center">
                  <Loader size="large" />
                </div>
              ) : (
                <div className="flex flex-col flex-1 w-full max-w-md mx-auto">
                  {isSuccess ? (
                    <Alert
                      variant="success"
                      title="Email verified Successful"
                      message="Grow from 1 listing to 1000s in a single platform"
                      showLink={true}
                      linkHref="/"
                      linkText="Learn more"
                    />
                  ) : (
                    <>
                      <div className="mt-5">
                        <Alert
                          variant="error"
                          title="Token Expired"
                          message="Send verification email again"
                        />
                        <div className="mt-5">
                          <Label>
                            Email<span className="text-error-500">*</span>
                          </Label>
                          <Input
                            placeholder="info@gmail.com"
                            onChange={handleEmailChange}
                            error={Boolean(errors?.email ?? false)}
                            hint={errors.email}
                          />
                        </div>
                        <div className="mt-5">
                          <Button
                            onClick={() => handleSendVerificationEmail()}
                            className="w-full"
                            size="sm"
                            type="submit"
                            isLoading={btnLoading}
                          >
                            Send Verification Email
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
