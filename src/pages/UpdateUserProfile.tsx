import PageMeta from "../components/common/PageMeta";
import UpdateUserForm from "../components/UpdateUserForm";
import AuthLayout from "./AuthPages/AuthPageLayout";

export default function UpdateUserProfile() {
  return (
    <>
     <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />

      <AuthLayout>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col  flex-1 w-full sm:px-12">
            <div>
              <div className="mb-5 sm:mb-8 sm:pt-8">
                <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-sm">
                  Tell us a little about you
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Well set you up with the right experience for your needs
                </p>
              </div>
              <div>
                {/* --- */}

                <UpdateUserForm />
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
