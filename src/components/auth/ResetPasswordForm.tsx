import { useRef, useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import { ResetFormProps } from "../../interfaces/auth";
import { useSearchParams } from "react-router";
import { resetPassword } from "../../api/User.api";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ResetFormProps>({
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const [serachParams] = useSearchParams();
  const validate = (pwd: string, confirmPwd: string): ResetFormProps => {
    const newErrors: ResetFormProps = { password: "", confirmPassword: "" };

    if (touched.password) {
      if (!pwd.trim()) {
        newErrors.password = "Password is required";
      } else if (pwd.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (touched.confirmPassword) {
      if (!confirmPwd.trim()) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPwd !== pwd) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (!touched.password) {
      setTouched((prev) => ({ ...prev, password: true }));
    }
    const newErrors = validate(val, confirmPassword);
    setErrors(newErrors);
  };

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (!touched.confirmPassword) {
      setTouched((prev) => ({ ...prev, confirmPassword: true }));
    }
    const newErrors = validate(password, val);
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = serachParams.get("token");
    if (!token) return;
    const finalTouched = { password: true, confirmPassword: true };
    setTouched(finalTouched);

    const newErrors = validate(password, confirmPassword);
    setErrors(newErrors);

    if (newErrors.password || newErrors.confirmPassword) return;

    try {
      setLoading(true);
      const formData = {
        resetToken: token,
        password,
      };
      const results = await resetPassword(formData);
      if (results) {
        setIsSuccess(true);
        setPassword("");
        setConfirmPassword("");
        setErrors({ password: "", confirmPassword: "" });
        setTouched({ password: false, confirmPassword: false });
        formRef.current?.reset();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    touched.password &&
    touched.confirmPassword &&
    !errors.password &&
    !errors.confirmPassword &&
    password &&
    confirmPassword;

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {isSuccess && (
            <Alert
              variant="success"
              title="Reset Successful!"
              message="Password has been updated successfully."
              showLink={true}
              linkText="Login"
              linkHref="/signin"
            />
          )}
          <div className="mt-5">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={"password"}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      value={password}
                      error={Boolean(errors.password)}
                      hint={errors.password}
                    />
                  </div>
                </div>

                <div>
                  <Label>
                    Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Confirm password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        handleConfirmPasswordChange(e.target.value)
                      }
                      value={confirmPassword}
                      error={Boolean(errors.confirmPassword)}
                      hint={errors.confirmPassword}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 cursor-pointer right-4 top-3"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid || isLoading}
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
