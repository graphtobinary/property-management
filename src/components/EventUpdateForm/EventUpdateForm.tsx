import { FC, useState } from "react";
import { EventUpdateFormProps } from "../../interfaces/listing";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Radio from "../form/input/Radio";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";

const EventUpdateForm: FC<EventUpdateFormProps> = ({
  eventStartDate,
  setEventStartDate,
  eventEndDate,
  setEventEndDate,
  eventCurrency,
  eventPrice,
  setEventPrice,
  eventAvailability = "open",
  eventPrivateNote,
  setEventPrivateNote,
  handleRadioChange,
  handleAddOrUpdateEvent,
  closeModal,
}) => {
  const [errors, setErrors] = useState({
    eventStartDate: "",
    eventEndDate: "",
    eventPrice: "",
    eventAvailability: "",
    eventPrivateNote: "",
  });
  const validateAndSubmit = () => {
    const newErrors = {
      eventStartDate: !eventStartDate ? "Start date is required." : "",
      eventEndDate: !eventEndDate ? "End date is required." : "",
      eventPrice: !eventPrice ? "Price is required." : "",
      eventAvailability: !eventAvailability ? "Availability is required." : "",
      eventPrivateNote: !eventPrivateNote ? "Private note is required." : "",
    };

    setErrors(newErrors);

    // If there's any error, don't submit
    const hasError = Object.values(newErrors).some((error) => error !== "");
    if (hasError) return;

    handleAddOrUpdateEvent(); // Call the original handler if all is valid
  };

  return (
    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          Edit Event
        </h5>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div className="mt-6">
            <Label>From</Label>
            <div className="relative">
              <Input
                id="event-start-date"
                type="date"
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
                error={Boolean(errors?.eventStartDate ?? false)}
                hint={errors.eventStartDate}
              />
            </div>
          </div>

          <div className="mt-6">
            <Label>To</Label>
            <div className="relative">
              <Input
                id="event-end-date"
                type="date"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                error={Boolean(errors?.eventEndDate ?? false)}
                hint={errors.eventEndDate}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <Label>Pricing</Label>

            <div className="relative">
              <Input
                id="event-price"
                type="number"
                value={eventPrice}
                onChange={(e) => setEventPrice(e.target.value)}
                className="pl-[50px]"
                error={Boolean(errors?.eventPrice ?? false)}
                hint={errors.eventPrice}
              />
              <span className="absolute left-0 top-0 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                {eventCurrency}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col flex-wrap justify-between">
            <div className="flex flex-col gap-3">
              <Label htmlFor="group1">Availability</Label>
              <div className="flex flex-col gap-1">
                <Radio
                  id="radio1"
                  name="group1"
                  value="open"
                  checked={eventAvailability === "open"}
                  onChange={(e) => handleRadioChange(e)}
                  label="Open"
                  className="text-md font-semibold"
                />
                <small className="pl-8 text-xs font-normal text-gray-400">
                  Guests can book your property for this date
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <Radio
                  id="radio2"
                  name="group1"
                  value="blocked"
                  checked={eventAvailability === "blocked"}
                  onChange={(e) => handleRadioChange(e)}
                  label="Blocked"
                  className="text-md font-semibold"
                />
                <small className="pl-8 text-xs font-normal text-gray-400">
                  Guests cannot book or find your property on search for this
                  date
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 mt-6">
          <Label>Private Note</Label>
          <div>
            <TextArea
              value={eventPrivateNote}
              onChange={(value) => setEventPrivateNote(value)}
              rows={4}
              placeholder="Lorem ipsum dolor sit amet, "
              error={Boolean(errors?.eventPrivateNote ?? false)}
              hint={errors.eventPrivateNote}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <Button onClick={closeModal} variant="outline">
          Close
        </Button>
        <Button onClick={validateAndSubmit} variant="primary">
          Update Changes
        </Button>
      </div>
    </div>
  );
};

export default EventUpdateForm;
