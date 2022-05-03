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
  return (
    <div className="containerRow">
      <div className="element tableauStats statistiquesJoueur">
        <table>
          <thead>
            <tr className="fondDegrade">
              <th>Saison</th>
              <th className="cachePetit">Ligue</th>
              <th>Équipe</th>
              <th>Buts</th>
              <th>Passes</th>
              <th>Points</th>
              <th>MJ</th>
              <th className="cachePetit">PIM</th>
              <th className="cachePetit">+/-</th>
              <th className="cachePetit">BAN</th>
              <th className="cachePetit">PAN</th>
              <th className="cachePetit">BIN</th>
              <th className="cachePetit">PIN</th>
              <th className="cachePetit">BG</th>
              <th className="cachePetit">BP</th>
              <th className="cachePetit">T</th>
              <th className="cachePetit">%T</th>
              <th className="cachePetit">%MJ</th>
            </tr>
          </thead>
          <tbody>
            {data.stats &&
              data.stats.map((statsJoueur) => {
                return (
                  <>
                    {statsJoueur &&
                      statsJoueur.splits.map((saison) => {
                        return (
                          <tr key={saison.season + saison.sequenceNumber}>
                            <td className="alignGauche">
                              {saison.season.substring(0, 4) +
                                "-" +
                                saison.season.substring(
                                  4,
                                  saison.season.length
                                )}
                            </td>
                            <td className="alignGauche cachePetit">
                              {saison.league.name === "National Hockey League"
                                ? "NHL"
                                : saison.league.name}
                            </td>
                            <td className="alignGauche">{saison.team.name}</td>
                            <td>{saison.stat.goals}</td>
                            <td>{saison.stat.assists}</td>
                            <td>{saison.stat.points}</td>
                            <td>{saison.stat.games}</td>
                            <td className="cachePetit">{saison.stat.pim}</td>
                            <td className="cachePetit">
                              {saison.stat.plusMinus
                                ? saison.stat.plusMinus
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.powerPlayGoals
                                ? saison.stat.powerPlayGoals
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.powerPlayPoints
                                ? saison.stat.powerPlayPoints
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.shortHandedGoals
                                ? saison.stat.shortHandedGoals
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.shortHandedPoints
                                ? saison.stat.shortHandedPoints
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.gameWinningGoals
                                ? saison.stat.gameWinningGoals
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.overTimeGoals
                                ? saison.stat.overTimeGoals
                                : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.shots ? saison.stat.shots : "--"}
                            </td>
                            <td className="cachePetit">
                              {saison.stat.shotPct ? saison.stat.shotPct : "--"}
                            </td>
                            <td className="cachePetit">
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
