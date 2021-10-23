import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

function StatsJoueur({ id }) {
  const { isLoading, error, data } = useFetch(
    `people/${id}/stats?stats=yearByYear`
  );
  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>Une erreur c'est produite!</h1>
        <p>{error.msg}</p>
        <Link to="/" className="btn">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  return (
    <div className="containerRow">
      <div className="element gros">
        <table className="statistiquesJoueur">
          <thead>
            <tr>
              <th>Saison</th>
              <th>Ligue</th>
              <th>Équipe</th>
              <th>Buts</th>
              <th>Passes</th>
              <th>Points</th>
              <th>MJ</th>
              <th>PIM</th>
              <th>+/-</th>
              <th>BAN</th>
              <th>PAN</th>
              <th>BIN</th>
              <th>PIN</th>
              <th>BG</th>
              <th>BP</th>
              <th>T</th>
              <th>%T</th>
              <th>%MJ</th>
            </tr>
          </thead>
          <tbody>
            {data.stats.map((statsJoueur) => {
              return (
                <>
                  {statsJoueur.splits.map((saison) => {
                    return (
                      <tr key={saison.season + saison.sequenceNumber}>
                        <td className="alignGauche">
                          {saison.season.substring(0, 4) +
                            "-" +
                            saison.season.substring(4, saison.season.length)}
                        </td>
                        <td className="alignGauche">
                          {saison.league.name === "National Hockey League"
                            ? "NHL"
                            : saison.league.name}
                        </td>
                        <td className="alignGauche">{saison.team.name}</td>
                        <td>{saison.stat.goals}</td>
                        <td>{saison.stat.assists}</td>
                        <td>{saison.stat.points}</td>
                        <td>{saison.stat.games}</td>
                        <td>{saison.stat.pim}</td>
                        <td>
                          {saison.stat.plusMinus ? saison.stat.plusMinus : "--"}
                        </td>
                        <td>
                          {saison.stat.powerPlayGoals
                            ? saison.stat.powerPlayGoals
                            : "--"}
                        </td>
                        <td>
                          {saison.stat.powerPlayPoints
                            ? saison.stat.powerPlayPoints
                            : "--"}
                        </td>
                        <td>
                          {saison.stat.shortHandedGoals
                            ? saison.stat.shortHandedGoals
                            : "--"}
                        </td>
                        <td>
                          {saison.stat.shortHandedPoints
                            ? saison.stat.shortHandedPoints
                            : "--"}
                        </td>
                        <td>
                          {saison.stat.gameWinningGoals
                            ? saison.stat.gameWinningGoals
                            : "--"}
                        </td>
                        <td>
                          {saison.stat.overTimeGoals
                            ? saison.stat.overTimeGoals
                            : "--"}
                        </td>
                        <td>{saison.stat.shots ? saison.stat.shots : "--"}</td>
                        <td>
                          {saison.stat.shotPct ? saison.stat.shotPct : "--"}
                        </td>
                        <td>
                          {saison.stat.faceOffPct
                            ? saison.stat.faceOffPct
                            : "--"}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsJoueur;
