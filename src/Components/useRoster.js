import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useRoster = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [roster, setRoster] = useState(null);
  const { data: team } = useFetch(`teams/${id}`);
  useEffect(() => {
    const fetchRoster = async function () {
      try {
        if (team) {
          setIsLoading(true);
          const newRoster = team.teams.map((item, index) => {
            return {
              id: id,
              nom: item.name,
              arena: item.venue.name,
              site: item.officialSiteUrl,
            };
          });
          const sortedData = newRoster;
          setRoster(sortedData);
        } else {
          setRoster([]);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoster();
  }, [id]);

  return { roster, isLoading };
};

export default useRoster;
