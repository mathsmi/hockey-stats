import { useState, useEffect } from "react";
import axios from "axios";
const API_ENDPOINT = `https://statsapi.web.nhl.com/api/v1/`;

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchStats = async function () {
      try {
        const response = await axios.get(`${API_ENDPOINT}${urlParams}`);
        const data = await response;
        if (data.statusText === "OK") {
          setData(data.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [urlParams]);

  return { isLoading, data };
};

export default useFetch;
