import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import pages
// import components
import Erreur from "./Pages/Erreur";
import Home from "./Pages/Home";
import Equipe from "./Pages/Equipe";
import Joueur from "./Pages/Joueur";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <main>
      <Navbar />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Pages/Equipe/:id">
              <Equipe />
            </Route>
            <Route exact path="/Pages/Joueur/:id">
              <Joueur />
            </Route>
            <Route path="*">
              <Erreur />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </main>
  );
}

export default App;
