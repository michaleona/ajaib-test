import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useDebounce = (value: any, delay: number) => {
  const [debouceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouceValue;
};

export default useDebounce;
