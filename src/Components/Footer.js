import React, { useState, useEffect } from "react";

function Footer() {
  const [theme, setTheme] = useState();
  // On ordonnes les équipes par nom
  useEffect(() => {
    //Le theme
    if (localStorage.getItem("theme") === "darkTheme") {
      setTheme("darkTheme");
    } else {
      setTheme("lightTheme");
      localStorage.setItem("theme", "lightTheme");
    }
  }, []);

  //Changement du theme
  {
    /*function toggleTheme() {
    if (localStorage.getItem("theme") === "lightTheme") {
      localStorage.setItem("theme", "darkTheme");
      setTheme("darkTheme");
    } else {
      localStorage.setItem("theme", "lightTheme");
      setTheme("lightTheme");
    }
    window.location.reload();
    return { theme };
  }*/
  }
  return (
    <footer>
      Source des données:{" "}
      <a href="https://www.nhl.com" target="_blank" rel="noreferrer">
        NHL
      </a>{" "}
      {/*<div>*/}
      {/******************/}
      {/***** MOBIL *****/}
      {/*****************/}
      {/*<button onClick={toggleTheme}>{theme}</button>*/}
      {/*</div>*/}
    </footer>
  );
}

export default Footer;
