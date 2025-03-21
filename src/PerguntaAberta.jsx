import React, { useEffect, useState } from "react";
import "./perguntaAberta.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";

function PerguntaAberta() {
  useEffect(() => {
            fetch("http://localhost:5000/perguntaAberta")
              .then((res) => res.json())
          }, []);

  return (
    <>
      <div className="logo">
      <img src={RaioIcone} className="icone-raio" alt="Ícone de Raio" />
        <span className="flashcards">FLASHCARDS</span>
      </div>

      <div className="pergunta">
        <span className="pergunta1">Pergunta</span>
      </div>

      <div className="resposta">
        <input 
          type="text" 
          id="respostaUsuario" 
          placeholder="Digite a resposta"
        />
        <button className="botaoEnviar">
          <p className="enviar">Enviar</p>
        </button>
      </div>
    </>
  );
}

export default PerguntaAberta;