import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

function Standing() {
  const { isLoading, error, data } = useFetch("standings");
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
      {data.records.map((division) => {
        return (
          <div
            key={division.division.id}
            className="element classementDivision"
          >
            <table>
              <thead>
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
                  <th>BP</th>
                  <th>BC</th>
                  <th>SÉQ</th>
                </tr>
              </thead>
              <tbody>
                {division.teamRecords.map((equipe) => {
                  let logo = require(`../Assets/${equipe.team.id}.svg`);
                  return (
                    <tr key={equipe.team.id}>
                      <td className="bold logoNom">
                        <Link to={`/Pages/Equipe/${equipe.team.id}`}>
                          <img src={logo.default} className="logoMini" />
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
                      <td>{equipe.goalsScored}</td>
                      <td>{equipe.goalsAgainst}</td>
                      <td>
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
