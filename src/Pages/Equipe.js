import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Components/useFetch";
import StatsJoueurSaison from "../Components/statsJoueurSaison";

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
        <div className="element tableauStats">
          <table>
            <thead>
              <tr className="fondDegrade">
                <th></th>
                <th>Buts</th>
                <th>Passes</th>
                <th>Points</th>
                <th>MJ</th>
                <th className="cachePetit">PIM</th>
                <th className="cachePetit">+/-</th>
              </tr>
            </thead>
            <tbody>
              {roster.roster &&
                roster.roster.map((roster) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`/Pages/Joueur/${roster.person.id}`}>
                          {roster.person.fullName}
                        </Link>
                      </td>
                      <StatsJoueurSaison id={roster.person.id} />
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
