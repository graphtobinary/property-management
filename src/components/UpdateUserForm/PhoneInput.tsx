import { PhoneInputProps } from "../../interfaces";
import Input from "../form/input/InputField";
import Select from "../form/Select";

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  type = "text",
  error = false,
  hint,
}) => {
  return (
    <div className="relative flex w-full">
      <div className="absolute z-1">
        <div className="w-[80px]">
          <Select
            placeholder="Code"
            onChange={() => undefined}
            options={countries}
            defaultValue={countries[0].value}
            className="!pr-0 rounded-r-none"
          ></Select>
        </div>
      </div>

      {/* Input field */}
      <Input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-[100px]`}
        error={error}
        hint={hint}
      />
    </div>
  );
};

export default PhoneInput;
