import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import silhouette from "../Assets/player.png";

function DonneesJoueur({ id }) {
  const { isLoading, error, data } = useFetch(`people/${id}`);

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
    <>
      {data.people &&
        data.people.map((joueur) => {
          return (
            <>
              <div className="section-title">
                <h1>{joueur.fullName}</h1>
              </div>
              <div className="containerRow">
                <div className="element data">
                  <div>
                    <div>
                      Équipe:{" "}
                      <Link to={`/Pages/Equipe/${joueur.currentTeam.id}`}>
                        {joueur.currentTeam.name}
                      </Link>
                    </div>
                    <div>
                      Lieu de naissance: {joueur.birthCity},{" "}
                      {joueur.birthCountry}
                    </div>
                    <div>
                      Date de naissance: {joueur.birthDate}, ({joueur.age})
                    </div>
                    <div>Numéro: {joueur.primaryNumber}</div>
                    <div>Grandeur: {joueur.height}</div>
                    <div>Poids: {joueur.weight}</div>
                    <div>Position: {joueur.primaryPosition.type}</div>
                    <div>Tir: {joueur.shootsCatches}</div>
                    <div>Poids: {joueur.weight}</div>
                  </div>
                  <div>
                    <img src={silhouette} alt={joueur.fullName} />
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}

export default DonneesJoueur;
