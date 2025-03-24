import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ManageProperties from "./pages/ManageProperties";
import Reservations from "./pages/Reservations";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
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

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/manage-properties" element={<ManageProperties />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
          {/* Create Listing Layout */}
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

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
