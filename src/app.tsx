import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
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
import UpdateUserProfile from "./pages/UpdateUserProfile";
import Verification from "./pages/Verification";
import useUser from "./hooks/useUser";
import Loader from "./components/Loader/Loader";
import useUserStore from "./store/user.store";

// PrivateRoute component to handle authentication
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();

  if (user === undefined) {
    return <Loader />; // Prevent unnecessary navigation until we have user data
  }

  return user ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default function App() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/signin"
          element={
            user === undefined ? (
              <Loader />
            ) : !user ? (
              <SignIn />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user === undefined ? (
              <Loader />
            ) : user ? (
              <Navigate replace to="/" />
            ) : (
              <SignUp />
            )
          }
        />

        {/* Protected Routes */}
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
        </Route>
        <Route path="/tell-us-about-you" element={<UpdateUserProfile />} />
        {/* Create Listing Routes */}
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
          <Route path="/create-listing-step-eleven" element={<StepEleven />} />
          <Route path="/create-listing-step-twelve" element={<StepTwelve />} />
          <Route
            path="/create-listing-step-thirteen"
            element={<StepThirteen />}
          />
          <Route path="/purchase-plan" element={<PurchasePlan />} />
        </Route>

        {/* Other Routes */}
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
