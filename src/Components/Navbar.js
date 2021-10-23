import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import { Link } from "react-router-dom";
import { FaBars, FaRegWindowClose, FaAngleDown } from "react-icons/fa";
import useFetch from "../Components/useFetch";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState("");
  const [isMenuOpenMobil, setIsMenuOpenMobil] = useState("");
  const [isScroll, setIsScroll] = useState(false);

  const { isLoading, error, data } = useFetch(`teams`);
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
  function toggleMenu(e) {
    const menu = e.target.id;
    if (menu === "mobil") {
      isMenuOpenMobil === "mobil"
        ? setIsMenuOpenMobil("")
        : setIsMenuOpenMobil(menu);
    } else if (menu !== "") {
      isMenuOpen === menu ? setIsMenuOpen("") : setIsMenuOpen(menu);
    } else setIsMenuOpen(menu);
  }
  function closeMenu(e) {
    const menu = e.target.id;
    menu === "mobil" ? setIsMenuOpenMobil("") : setIsMenuOpen("");
  }

  // Changement de couleur d'arrière plan de la barre de menu
  window.onscroll = function () {
    var scrollLimit = 250;
    if (window.scrollY >= scrollLimit) {
      setIsScroll(true);
    } else setIsScroll(false);
  };

  return (
    <>
      <div
        className={`${isScroll ? "navbar isScroll" : "navbar"}`}
        onMouseLeave={closeMenu}
      >
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <div
          className={`${
            isMenuOpenMobil === "mobil" ? "menu showMobil" : "menu hideMobil"
          }`}
        >
          <div className="colonneMenu">
            <a href="/Page/Classement">
              <div className="premierNiveau">Classement</div>
            </a>
          </div>
          <div className="colonneMenu">
            <a href="/Page/Meneurs">
              <div className="premierNiveau">Meneurs</div>
            </a>
          </div>
          <div className="colonneMenu">
            <div
              id="equipe"
              className="premierNiveau"
              onMouseEnter={toggleMenu}
            >
              Équipes <FaAngleDown className="flecheBas" />
            </div>
            <div
              className={`${
                isMenuOpen === "equipe" ? "sousMenu show" : "sousMenu hide"
              }`}
            >
              <div id="equipe" className="ferme" onClick={closeMenu}>
                <FaRegWindowClose />
              </div>
              {data.teams.map((team) => {
                let logo = require(`../Assets/${team.id}.svg`);
                return (
                  <div key={team.franchiseId}>
                    <img src={logo.default} className="logoMini" />
                    <a href={`/Pages/Equipe/${team.id}`}>{team.name}</a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="colonneMenu">
            <a href="/Page/NousJoindre">
              <div className="premierNiveau">Nous joindre</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
