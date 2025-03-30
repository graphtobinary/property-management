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

export default function Verification() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({
    email: "",
  });
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const { token } = useParams();
  useEffect(() => {
    handleVerifyEmail();
  }, []);

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail({
        invitation_token: token as string,
      });
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
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
      // api call will be added here
    } catch (error) {
      console.error(error);
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
            <div className="w-2/3">
              <div className="mb-5 sm:mb-8">
                <AppLogo
                  isExpanded={true}
                  isHovered={false}
                  isMobileOpen={false}
                />
              </div>
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
                      >
                        Send Verification Email
                      </Button>
                    </div>
                  </div>
                </>
              )}
              <div>{/* --- */}</div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
