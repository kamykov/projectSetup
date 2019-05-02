import React, { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
}

//https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
