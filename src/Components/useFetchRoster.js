import { useState, useEffect } from "react";
import MyArray from "./Ordre";
import axios from "axios";
const API_ENDPOINT = `https://statsapi.web.nhl.com/api/v1/`;

const useFetch = (urlParams, season) => {
  const [isLoading, setIsLoading] = useState(true);
  const [roster, setRoster] = useState([]);
  const [orderTerm] = useState({
    nom: "points",
    ordre: 0,
  });

  useEffect(() => {
    const fetchStats = async function () {
      try {
        const response = await axios.get(`${API_ENDPOINT}${urlParams}`);
        const data = await response;
        if (data.statusText === "OK") {
          const tableau = [];
          data.data.roster &&
            data.data.roster.map((person) => {
              var id = person.person.id;
              var nom = person.person.fullName;

              // Si la saison est pas spécifié, on prends celle en cours
              var seasonStats = "";
              if (season !== undefined) seasonStats = `&season=${season}`;

              // On fetch les stats du joueur pour la saison spécifié
              const lien = `people/${id}/stats?stats=statsSingleSeason${seasonStats}`;

              axios.get(`${API_ENDPOINT}${lien}`).then((response) => {
                const data = response;
                if (data.statusText === "OK") {
                  data.data.stats &&
                    data.data.stats.map((split) => {
                      const newJoueur = split.splits.map((stat) => {
                        return {
                          id: id ? id : 0,
                          nom: nom ? nom : 0,
                          goals: stat.stat.goals ? stat.stat.goals : 0,
                          assists: stat.stat.assists ? stat.stat.assists : 0,
                          points: stat.stat.points ? stat.stat.points : 0,
                          games: stat.stat.games ? stat.stat.games : 0,
                          pim: stat.stat.pim ? stat.stat.pim : 0,
                          plusMinus: stat.stat.plusMinus
                            ? stat.stat.plusMinus
                            : 0,
                        };
                      });
                      if (newJoueur[0] !== undefined) {
                        tableau.push(newJoueur[0]);
                      }
                    });
                }
                var critere = "";
                if (orderTerm.nom !== "" && orderTerm.ordre < 2) {
                  orderTerm.ordre
                    ? (critere = orderTerm.nom)
                    : (critere = "-" + orderTerm.nom);
                }
                const sortedTableau = MyArray.from(tableau).sortBy(critere);
                setRoster(sortedTableau);
              });
            });
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [urlParams, season]);
  return { isLoading, roster, setRoster };
};

export default useFetch;
