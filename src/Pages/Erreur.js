import React from "react";
import { Link } from "react-router-dom";
export default function Erreur() {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Oueplaï! On est perdu!</h1>
        <Link to="/" className="btn btn-primary">
          Artourne à maison!
        </Link>
      </div>
    </section>
  );
}
