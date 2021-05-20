import { useState, useCallback } from "react";

export const useFetcher = (URL) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(URL);
      const parsedData = await res.json();
      setData(parsedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr("Trouble while fetching data. Please try again later.");
      setLoading(false);
    }
  }, [URL]);

  return {
    loading,
    data,
    err,
    fetchData
  };
};
