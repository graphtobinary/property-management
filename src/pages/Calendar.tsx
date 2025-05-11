import { useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import CustomCalendar from "../components/CustomCalendar";
import useUserStore from "../store/user.store";
import { useNavigate } from "react-router";
const Calendar: React.FC = () => {
  const { subscription } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (subscription?.isExpired) {
      navigate("/");
    }
  }, [subscription?.isExpired]);
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      <div className="p-4">
        <CustomCalendar />
      </div>
    </>
  );
};

export default Calendar;
