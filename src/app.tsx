import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "./store/auth.store";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ManageProperties from "./pages/ManageProperties";
// import Reservations from "./pages/Reservations";
// import Analytics from "./pages/Analytics";
// import Settings from "./pages/Settings";
import StepOne from "./pages/CreateListing/StepOne";
import StepTwo from "./pages/CreateListing/StepTwo";
import StepThree from "./pages/CreateListing/StepThree";
import StepFour from "./pages/CreateListing/StepFour";
import StepFive from "./pages/CreateListing/StepFive";
import StepSix from "./pages/CreateListing/StepSix";
import StepSeven from "./pages/CreateListing/StepSeven";
import StepEight from "./pages/CreateListing/StepEight";
import StepNine from "./pages/CreateListing/StepNine";
import StepTen from "./pages/CreateListing/StepTen";
import StepEleven from "./pages/CreateListing/StepEleven";
import StepTwelve from "./pages/CreateListing/StepTwelve";
import CreateListingPageLayout from "./pages/CreateListing/CreateListingPageLayout";
import StepThirteen from "./pages/CreateListing/StepThirteen";
import PurchasePlan from "./pages/PurchasePlan";
import CalendarDetails from "./pages/CalendarDetails";

// PrivateRoute component to handle authentication
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout - Accessible only when not authenticated */}
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
          />

          {/* Protected Routes - Require Authentication */}
          <Route
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="calendar/:id" element={<CalendarDetails />} />
            <Route path="/manage-properties" element={<ManageProperties />} />
            {/* <Route path="/reservations" element={<Reservations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Route>

          {/* Create Listing Routes - Protected */}
          <Route
            element={
              <PrivateRoute>
                <CreateListingPageLayout />
              </PrivateRoute>
            }
          >
            <Route path="/create-listing-step-one" element={<StepOne />} />
            <Route path="/create-listing-step-two" element={<StepTwo />} />
            <Route path="/create-listing-step-three" element={<StepThree />} />
            <Route path="/create-listing-step-four" element={<StepFour />} />
            <Route path="/create-listing-step-five" element={<StepFive />} />
            <Route path="/create-listing-step-six" element={<StepSix />} />
            <Route path="/create-listing-step-seven" element={<StepSeven />} />
            <Route path="/create-listing-step-eight" element={<StepEight />} />
            <Route path="/create-listing-step-nine" element={<StepNine />} />
            <Route path="/create-listing-step-ten" element={<StepTen />} />
            <Route
              path="/create-listing-step-eleven"
              element={<StepEleven />}
            />
            <Route
              path="/create-listing-step-twelve"
              element={<StepTwelve />}
            />
            <Route
              path="/create-listing-step-thirteen"
              element={<StepThirteen />}
            />
            <Route path="/purchase-plan" element={<PurchasePlan />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
