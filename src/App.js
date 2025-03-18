import React from "react";
import TelaInicial from "./TelaInicial";
import Comecar from "./Comecar";
import Tutorial from "./Tutorial";
import Pontuacao from "./Pontuacao";
import Questao from "./Questao";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/comecar" element={<Comecar />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/pontuacao" element={<Pontuacao />} />
          <Route path="/questao" element={<Questao />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;