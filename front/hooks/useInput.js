import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const inputValueHandler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, inputValueHandler];
};
