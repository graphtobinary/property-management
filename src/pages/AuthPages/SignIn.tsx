import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  useEffect(() => {
    toast.error("Something went wrong!");
  }, []);
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
