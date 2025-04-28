import { FC } from "react";
import { useListingStore } from "../../store/listing.store";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { ExitButtonProps } from "../../interfaces";

const ExitButton: FC<ExitButtonProps> = ({ link }, isListingPage = false) => {
  const navigate = useNavigate();
  const { listingFormData, clearListingStore } = useListingStore();

  const exitLink = link
    ? link
    : !isListingPage
    ? "/"
    : listingFormData.isUpdateListing
    ? "/manage-properties"
    : "/";
  console.log(exitLink, "exitLink");
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        navigate(exitLink);
        clearListingStore();
      }}
    >
      Exit
    </Button>
  );
};

export default ExitButton;
