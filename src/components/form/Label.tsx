import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { LabelProps } from "../../interfaces";

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        // Default classes that apply by default
        "mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-400",

        // User-defined className that can override the default margin
        className
      )}
    >
      {children}
    </label>
  );
};

export default Label;
