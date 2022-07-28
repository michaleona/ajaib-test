import { useEffect, useState } from "react";
import {
  setSorter,
  setPagination,
  selectPaginationState,
} from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useDebounce = (value: any, delay: number) => {
  const [debouceValue, setDebounceValue] = useState(value);
  const pagination = useSelector(selectPaginationState);
  const dispatch = useDispatch();

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
