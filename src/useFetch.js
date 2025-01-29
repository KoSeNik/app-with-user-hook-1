import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, initialOptions = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(initialOptions);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryString = options.params
        ? new URLSearchParams(options.params).toString()
        : "";
      const fullUrl = queryString ? `${url}?${queryString}` : url;

      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback((newOptions = {}) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
  }, []);

  return { data, isLoading, error, refetch };
};
