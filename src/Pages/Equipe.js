import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Components/useFetch";

function Equipe() {
  const { id } = useParams();
  const {
    isLoading: isLoadingTeam,
    error: errorTeam,
    data: team,
  } = useFetch(`teams/${id}`);
  const {
    isLoading: isLoadingRoster,
    error: errorRoster,
    data: roster,
  } = useFetch(`teams/${id}/roster`);

  if (isLoadingTeam || isLoadingRoster) {
    return <div className="loading"></div>;
  }
  if (errorTeam.show || errorRoster.show) {
    return (
      <div className="page-error">
        <h1>Une erreur c'est produite!</h1>
        <p>{errorTeam.msg}</p>
        <p>{errorRoster.msg}</p>
        <Link to="/" className="btn">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="section-title">
        {team.teams &&
          team.teams.map((equipe) => {
            return <h1 key={equipe.id}>{equipe.name}</h1>;
          })}
      </div>
      <div className="containerRow">
        <div className="element">
          <table>
            <thead>
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
              {roster.roster &&
                roster.roster.map((roster) => {
                  return (
                    <tr key={roster.person.id}>
                      <td className="bold">
                        <Link to={`/Pages/Joueur/${roster.person.id}`}>
                          {roster.person.fullName}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Equipe;
