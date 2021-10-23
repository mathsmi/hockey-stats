import React from "react";
import { useParams } from "react-router-dom";
import StatsJoueur from "../Components/statsJoueur";
import DonneesJoueur from "../Components/donneesJoueur";

function Joueur() {
  const { id } = useParams();
  return (
    <>
      <DonneesJoueur id={id} />
      <StatsJoueur id={id} />
    </>
  );
}
export default Joueur;
