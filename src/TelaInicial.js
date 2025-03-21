import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./tela-inicial.css"; 
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";

function TelaInicial() {
      useEffect(() => {
        fetch("http://localhost:5000/tutorial")
          .then((res) => res.json())
      }, []);
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="cinza_escuro">
      <div className="logo-container">
        <img src={logo} className="logo-cachorro" alt="Cachorro fofo" />
        <div className="logo-text">
          <div className="flashcards-wrapper">
            <div className="flashcards">FLASHCARDS</div>
            <div className="text-shadow1">FLASHCARDS</div>
          </div>
          <span className="java">JAVA</span>

          <div className="edition-wrapper">
            <div className="edition">edition</div>
            <div className="text-shadow2">edition</div>
          </div>
        </div>
      </div>
      
      <i className="fas fa-cog config"></i>

      <img src={RaioIcone} className="icone-raio" alt="Ícone de Raio" />
      </div>

      <div className="botoes">
        <p className="botao" onClick={() => navigate("/comecar")}>Começar</p>
        <p className="botao" onClick={() => navigate("/tutorial")}>Tutorial</p>
        <p className="botao" onClick={() => navigate("/pontuacao")}>Pontuação</p>
      </div>
    </div>
  );
}

export default TelaInicial;
