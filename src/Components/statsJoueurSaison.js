import { Link } from "react-router-dom";

// À FAIRE
// - FILTRER OUT LES JOUEURS QUI N'ONT PAS DE STATS
// - ORDONNER SELON LE NOMBRE DE POINTS

function StatsJoueurSaison(roster) {
  // Affichage des stats
  return (
    <>
      <tr key={roster.joueur.id}>
        <td>
          <Link to={`/Pages/Joueur/${roster.joueur.id}`}>
            {roster.joueur.nom}
          </Link>
        </td>
        <td>{roster.joueur.goals}</td>
        <td>{roster.joueur.assists}</td>
        <td>{roster.joueur.points}</td>
        <td>{roster.joueur.games}</td>
        <td className="cachePetit">{roster.joueur.pim}</td>
        <td className="cachePetit">{roster.joueur.plusMinus}</td>
      </tr>
    </>
  );
}

export default StatsJoueurSaison;
