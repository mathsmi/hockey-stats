import { useState } from "react";
import { useParams } from "react-router-dom";
import MyArray from "../Components/Ordre";
import useFetch from "../Components/useFetch";
import useFetchRoster from "../Components/useFetchRoster";
import StatsJoueurSaison from "../Components/statsJoueurSaison";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

function Equipe() {
  const { id } = useParams();
  const { isLoading: isLoadingTeam, data: team } = useFetch(`teams/${id}`);
  const {
    isLoading: isLoadingRoster,
    roster,
    setRoster,
  } = useFetchRoster(`teams/${id}/roster`);
  const [orderTerm, setOrderTerm] = useState({
    nom: "points",
    ordre: 1,
  });

  function order(e) {
    const name = e.target.id;
    let value = orderTerm.ordre;

    if (orderTerm.nom === name) {
      if (value < 1) {
        value++;
      } else {
        value = 0;
      }
    } else value = 0;
    const nouvelleOrdre = {
      nom: name,
      ordre: value,
    };
    setOrderTerm(nouvelleOrdre);
    var critere = "";
    if (orderTerm.nom !== "" && orderTerm.ordre < 2) {
      orderTerm.ordre
        ? (critere = orderTerm.nom)
        : (critere = "-" + orderTerm.nom);
    }
    const sortedTableau = MyArray.from(roster).sortBy(critere);
    setRoster(sortedTableau);
  }

  if (isLoadingTeam || isLoadingRoster) {
    return <div className="loading"></div>;
  } else {
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
                  <th
                    name="goals"
                    id="goals"
                    className={
                      orderTerm.nom !== "goals"
                        ? "cliquable"
                        : "cliquable actif"
                    }
                    onClick={order}
                  >
                    Buts
                    {orderTerm.nom !== "goals" || orderTerm.ordre === 2 ? (
                      ""
                    ) : orderTerm.ordre ? (
                      <FaCaretUp className="ordre" />
                    ) : (
                      <FaCaretDown className="ordre" />
                    )}
                  </th>
                  <th
                    name="assists"
                    id="assists"
                    className={
                      orderTerm.nom !== "assists"
                        ? "cliquable"
                        : "cliquable actif"
                    }
                    onClick={order}
                  >
                    Passes
                    {orderTerm.nom !== "assists" || orderTerm.ordre === 2 ? (
                      ""
                    ) : orderTerm.ordre ? (
                      <FaCaretUp className="ordre" />
                    ) : (
                      <FaCaretDown className="ordre" />
                    )}
                  </th>
                  <th
                    name="points"
                    id="points"
                    className={
                      orderTerm.nom !== "points"
                        ? "cliquable"
                        : "cliquable actif"
                    }
                    onClick={order}
                  >
                    Points
                    {orderTerm.nom !== "points" || orderTerm.ordre === 2 ? (
                      ""
                    ) : orderTerm.ordre ? (
                      <FaCaretUp className="ordre" />
                    ) : (
                      <FaCaretDown className="ordre" />
                    )}
                  </th>

                  <th
                    name="games"
                    id="games"
                    className={
                      orderTerm.nom !== "games"
                        ? "cliquable"
                        : "cliquable actif"
                    }
                    onClick={order}
                  >
                    MJ
                    {orderTerm.nom !== "games" || orderTerm.ordre === 2 ? (
                      ""
                    ) : orderTerm.ordre ? (
                      <FaCaretUp className="ordre" />
                    ) : (
                      <FaCaretDown className="ordre" />
                    )}
                  </th>
                  <th
                    name="pim"
                    id="pim"
                    onClick={order}
                    className={
                      orderTerm.nom !== "pim"
                        ? "cliquable cachePetit"
                        : "cliquable cachePetit actif"
                    }
                  >
                    PIM
                    {orderTerm.nom !== "pim" || orderTerm.ordre === 2 ? (
                      ""
                    ) : orderTerm.ordre ? (
                      <FaCaretUp className="ordre" />
                    ) : (
                      <FaCaretDown className="ordre" />
                    )}
                  </th>
                  <th
                    name="plusMinus"
                    id="plusMinus"
                    onClick={order}
                    className={
                      orderTerm.nom !== "plusMinus"
                        ? "cliquable cachePetit"
                        : "cliquable cachePetit actif"
                    }
                  >
                    +/-
                    {orderTerm.nom !== "plusMinus" || orderTerm.ordre === 2 ? (
                      ""
                    ) : orderTerm.ordre ? (
                      <FaCaretUp className="ordre" />
                    ) : (
                      <FaCaretDown className="ordre" />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {roster &&
                  roster.map((roster) => {
                    return (
                      <StatsJoueurSaison joueur={roster} key={roster.id} />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Equipe;
