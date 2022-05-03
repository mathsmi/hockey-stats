import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useEquipe = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [equipe, setEquipe] = useState(null);
  const { data: team } = useFetch(`teams/${id}`);

  useEffect(() => {
    const fetchEquipe = async function () {
      try {
        if (team) {
          setIsLoading(true);
          const newEquipe =
            team &&
            team.teams.map((item, index) => {
              return {
                id: id,
                nom: item.name,
                arena: item.venue.name,
                site: item.officialSiteUrl,
              };
            });
          const sortedData = newEquipe;
          setEquipe(sortedData);
        } else {
          setEquipe([]);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipe();
  }, [id, team]);

  return { equipe, isLoading };
};

export default useEquipe;
