import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./tela-inicial.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import musica from "./public/Shawn Mendes - Why Why Why (Official Lyric Video).mp3";

function TelaInicial() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/tutorial")
      .then((res) => res.json());
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
      audio.muted = true; // Começa mudo para evitar bloqueio

      // Recupera a posição do áudio do localStorage
      const savedTime = localStorage.getItem("audioTime");
      if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
      }

      // Tentar dar play após interação do usuário
      const playAudio = () => {
        audio.muted = false;
        audio.play().catch(error => console.log("Autoplay bloqueado:", error));
        document.removeEventListener("click", playAudio);
      };

      document.addEventListener("click", playAudio);

      // Salva a posição do áudio a cada 1 segundo
      const saveTimeInterval = setInterval(() => {
        localStorage.setItem("audioTime", audio.currentTime);
      }, 1000);

      return () => clearInterval(saveTimeInterval);
    }
  }, []);

  return (
    <div className="container">
      <div className="telaInicial-cinza_escuro">
        <div className="telaInicial-logo-container">
          <img src={logo} className="telaInicial-logo-cachorro" alt="Cachorro fofo" />
          <div className="telaInicial-logo-text">
            <div className="telaInicial-flashcards-wrapper">
              <div className="telaInicial-flashcards">FLASHCARDS</div>
              <div className="telaInicial-text-shadow1">FLASHCARDS</div>
              <img src={RaioIcone} className="telaInicial-icone-raio" alt="Ícone de Raio" />
            </div>
            <span className="telaInicial-java">JAVA</span>
            <div className="telaInicial-edition-wrapper">
              <div className="telaInicial-edition">edition</div>
              <div className="telaInicial-text-shadow2">edition</div>
            </div>
          </div>
        </div>

        <i id="cog" className="fa fa-cog" onClick={() => setSidebarOpen(true)}></i>
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        <p id="tela-inicial-som">Som</p>
        <p id="tela-inicial-musica">Música</p>
      </div>

      <div className="telaInicial-botoes">
        <p className="telaInicial-botao" onClick={() => navigate("/comecar")}>Começar</p>
        <p className="telaInicial-botao" onClick={() => navigate("/tutorial")}>Tutorial</p>
        <p className="telaInicial-botao" onClick={() => navigate("/pontuacao")}>Pontuação</p>
      </div>

      <div>
        <audio ref={audioRef} src={musica} type="audio/mpeg"></audio>
      </div>
    </div>
  );
}

export default TelaInicial;
