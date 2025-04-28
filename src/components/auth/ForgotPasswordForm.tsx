import { useCallback, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { validateEmail } from "../../utils/utils";
import { SigninFormProps } from "../../interfaces/auth";
import Alert from "../ui/alert/Alert";
import { forgotPassword } from "../../api/User.api";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<SigninFormProps>({ email: "" });
  const [touched, setTouched] = useState({ email: false });
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  const validate = (value: string): SigninFormProps => {
    const newErrors: SigninFormProps = { email: "" };

    if (touched.email) {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(value)) {
        newErrors.email = "This is an invalid email address.";
      }
    }

    return newErrors;
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (!touched.email) {
      setTouched({ email: true });
    }

    const newErrors = validate(val);
    setErrors(newErrors);
  };

  const isFormValid = touched.email && !errors.email && email.trim();

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const finalTouched = { email: true };
      setTouched(finalTouched);

      const newErrors = validate(email);
      setErrors(newErrors);

      if (newErrors.email) return;

      try {
        setLoading(true);
        const formData = {
          email,
        };
        await forgotPassword(formData);
        setIsSuccess(true);
        formRef.current?.reset();
        setEmail("");
        setTouched({ email: false });
        setErrors({ email: "" });
      } catch {
        setErrors({ email: "Failed to send reset link. Try again." });
      } finally {
        setLoading(false);
      }
    },
    [email, navigate]
  );

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto" />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-6">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the email address linked to your account, and we’ll send you
              a link to reset your password.
            </p>
          </div>
          {isSuccess && (
            <Alert
              variant="success"
              title="Password reset successful!"
              message="Success! We've sent a password reset link to your email."
              showLink={false}
            />
          )}
          <div className="mt-6">
            <form ref={formRef} onSubmit={handleSignIn}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    error={Boolean(errors.email)}
                    hint={errors.email}
                  />
                </div>

                <div>
                  <Button
                    className="w-full bg-primary hover:bg-primaryDark"
                    size="sm"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!isFormValid || isLoading}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Wait, I remember my password...{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:text-primary dark:text-primary"
                >
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
