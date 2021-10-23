import { useState, useEffect } from "react";
import axios from "axios";
const API_ENDPOINT = `https://records.nhl.com/site/api/`;

const useFetchRecords = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState(null);
  const fetchStats = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = await response;
      if (data.statusText === "OK") {
        setData(data.data);
        setError({ show: false, msg: "test" });
      } else {
        setError({ show: true, msg: data.statusText });
      }
      setIsLoading(false);
    } catch (error) {
      setError({ show: true, msg: error });
    }
  };

  useEffect(() => {
    fetchStats(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);
  return { isLoading, error, data };
};

export default useFetchRecords;
