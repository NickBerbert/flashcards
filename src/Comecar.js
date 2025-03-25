import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nickname.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import Config from "./public/font-awesome-4.7.0/css/font-awesome.min.css";

function Comecar() {
  const [message, setMessage] = useState("Testando conexão...");

  useEffect(() => {
    fetch("http://localhost:5000/comecar")
      .then((res) => res.json())
      .then((data) => setMessage(`Backend conectado: ${data.message}`))
      .catch((err) => setMessage("Erro ao conectar ao backend!"));
  }, []);

  const navigate = useNavigate();
    const iniciar = () => {
      navigate('/questaoAtual'); 
  };

  return (
    <>
      <img 
        src={logo} className="nickname-logo-cachorro"
        alt="Cachorro pixelado"
      />
      <i src={Config}  id="cog" className="fa fa-cog config"></i>
      <div className="nickname-container">
        <div className="nickname-cinza_escuro">
          <div className="nickname-logo">
            <div className="nickname-logo-text">
              <img 
                src={RaioIcone} 
                className="nickname-icone-raio" 
                alt="Ícone de Raio"
              />
              <div className="nickname-flashcards-wrapper">
                <div className="nickname-flashcards">FLASHCARDS</div>
                <div className="nickname-text-shadow1">FLASHCARDS</div>
              </div>
              <span className="nickname-java">JAVA</span>
              <div className="nickname-edition-wrapper">
                <div className="nickname-edition">edition</div>
                <div className="nickname-text-shadow2">edition</div>
              </div>
              <div className="nickname">
                <form className="nickname-formulario">
                  <input 
                    type="text" 
                    id="nick" 
                    name="nick" 
                    placeholder="Digite seu nome"
                  />
                  <button className="nickname-botaoIniciar">
                    <p className="nickname-iniciar">Iniciar</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comecar;
