import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

// À FAIRE
// - FILTRER OUT LES JOUEURS QUI N'ONT PAS DE STATS
// - ORDONNER SELON LE NOMBRE DE POINTS

function StatsJoueurSaison({ id, season }) {
  // Si la saison est pas spécifié, on prends celle en cours
  var seasonStats = "";
  if (season !== undefined) seasonStats = `&season=${season}`;

  // On fetch les stats du joueur pour la saison spécifié
  const {
    isLoading: isLoadingStatsJoueur,
    error: errorStatsJoueur,
    data: statsJoueur,
  } = useFetch(`people/${id}/stats?stats=statsSingleSeason${seasonStats}`);
  if (isLoadingStatsJoueur) {
    return <div className="loading"></div>;
  }
  if (errorStatsJoueur.show) {
    return (
      <div className="page-error">
        <h1>Une erreur c'est produite!</h1>
        <p>{errorStatsJoueur.msg}</p>
        <Link to="/" className="btn">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Affichage des stats
  return (
    <>
      {statsJoueur.stats &&
        statsJoueur.stats.map((split) => {
          return (
            split.splits &&
            split.splits.map((stat) => {
              return (
                <>
                  <td>{stat.stat.goals ? stat.stat.goals : "0"}</td>
                  <td>{stat.stat.assists ? stat.stat.assists : "0"}</td>
                  <td>{stat.stat.points ? stat.stat.points : "0"}</td>
                  <td>{stat.stat.games ? stat.stat.games : "0"}</td>
                  <td className="cachePetit">
                    {stat.stat.pim ? stat.stat.pim : "0"}
                  </td>
                  <td className="cachePetit">
                    {stat.stat.plusMinus ? stat.stat.plusMinus : "0"}
                  </td>
                </>
              );
            })
          );
        })}
    </>
  );
}

export default StatsJoueurSaison;
