import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

function Standing() {
  const { isLoading, data } = useFetch("standings");
  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="containerRow">
      {data.records &&
        data.records.map((division) => {
          return (
            <div key={division.division.id} className="element tableauStats">
              <table>
                <thead className="fondDegrade">
                  <tr>
                    <th colSpan="9">
                      <h3>{division.division.name}</h3>
                    </th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>MJ</th>
                    <th>V</th>
                    <th>D</th>
                    <th>DP</th>
                    <th>PTS</th>
                    <th className="cachePetit">BP</th>
                    <th className="cachePetit">BC</th>
                    <th className="cachePetit">SÉQ</th>
                  </tr>
                </thead>
                <tbody>
                  {division.teamRecords &&
                    division.teamRecords.map((equipe) => {
                      let logo = require(`../Assets/${equipe.team.id}.svg`);
                      return (
                        <tr key={equipe.team.id}>
                          <td className="bold logoNom">
                            <Link to={`/Pages/Equipe/${equipe.team.id}`}>
                              <img
                                src={logo.default}
                                className="logoMini"
                                alt={`logo ${equipe.team.name}`}
                              />
                              {equipe.clinchIndicator
                                ? equipe.clinchIndicator + "-"
                                : ""}
                              {equipe.team.name}
                            </Link>
                          </td>
                          <td>{equipe.gamesPlayed}</td>
                          <td>{equipe.leagueRecord.wins}</td>
                          <td>{equipe.leagueRecord.losses}</td>
                          <td>{equipe.leagueRecord.ot}</td>
                          <td>{equipe.points}</td>
                          <td className="cachePetit">{equipe.goalsScored}</td>
                          <td className="cachePetit">{equipe.goalsAgainst}</td>
                          <td className="cachePetit">
                            {equipe.streak !== undefined
                              ? equipe.streak.streakCode
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
}

export default Standing;
