import { useEffect, useState } from "react";

const DEFAULT_INTERVAL = 400;

const useFlushInterval = (interval: number = DEFAULT_INTERVAL) => {
  const [_, flush] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      flush((prev) => !prev);
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return flush;
};

export default useFlushInterval;
