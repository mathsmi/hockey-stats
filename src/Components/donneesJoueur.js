import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import silhouette from "../Assets/player.png";

function DonneesJoueur({ id }) {
  const { isLoading, data } = useFetch(`people/${id}`);

  if (isLoading) {
    return <div className="loading"></div>;
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
                <div className="element fondDegrade donneesJoueurs">
                  <div className="renseignementsJoueurs">
                    <div className="photoJoueur">
                      <img src={silhouette} alt={joueur.fullName} />
                    </div>
                    <div>
                      <div className="case">
                        Équipe:{" "}
                        <Link to={`/Pages/Equipe/${joueur.currentTeam.id}`}>
                          {joueur.currentTeam.name}
                        </Link>
                      </div>
                      <div className="case">
                        Lieu de naissance: {joueur.birthCity},{" "}
                        {joueur.birthCountry}
                      </div>
                      <div className="case">
                        Date de naissance: {joueur.birthDate}, ({joueur.age})
                      </div>
                      <div className="case">Numéro: {joueur.primaryNumber}</div>
                      <div className="case">Grandeur: {joueur.height}</div>
                      <div className="case">Poids: {joueur.weight}</div>
                      <div className="case">
                        Position: {joueur.primaryPosition.type}
                      </div>
                      <div className="case">Tir: {joueur.shootsCatches}</div>
                      <div className="case">Poids: {joueur.weight}</div>
                    </div>
                  </div>
                  <div className="statsCarriere">
                    <div className="statCarriere">
                      <span className="nombre">923</span>Parties
                    </div>
                    <div className="statCarriere">
                      <span className="nombre">50</span>Buts
                    </div>
                    <div className="statCarriere">
                      <span className="nombre">187</span>Passes
                    </div>
                    <div className="statCarriere">
                      <span className="nombre">237</span>Points
                    </div>
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
