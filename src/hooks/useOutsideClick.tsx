import { useEffect, RefObject } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  callbackFn: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(e.target as Node)) {
        callbackFn();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callbackFn]);
};

export default useOutsideClick;
