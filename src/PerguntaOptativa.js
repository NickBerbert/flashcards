import React, { useState, useEffect } from "react";
import "./perguntaOptativa.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";

function PerguntaOptativa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questao } = location.state || {}; // Acessando a questão passada pela navegação
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);

  const enviarResposta = () => {
    if (!questao) return;

    fetch("http://localhost:5000/perguntaOptativa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        respostaUsuario,
        idQuestao: questao.id,
        idUsuario: 2, // Defina o ID correto do usuário
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
          if (data.respostaCorreta) {
            setRespostaCorreta(data.respostaCorreta); // Exibe a resposta correta
          }
        } else {
          setMensagem(data.message);
          setRespostaCorreta(null); // Se acertar, não exibe resposta correta
        }
      })
      .catch((error) => console.error("Erro ao enviar resposta:", error));
  };

  return (
    <>
        <div className="perguntaOptativa-tudo">
        <div className="perguntaOptativa-logo">
          <img
            className="perguntaOptativa-icone-raio"
            src={RaioIcone}
            alt="imagem-raio"
          />
          <div className="perguntaOptativa-logo-text">
            <div className="perguntaOptativa-flashcards">FLASHCARDS</div>
          </div>
        </div>

        <div className="perguntaOptativa-resposta">
          <div className="perguntaOptativa-pergunta">
            <span className="perguntaOptativa-pergunta1">Pergunta</span>
          </div>

          <div className="perguntaOptativa-alternativa">
          <button className="perguntaOptativa-A">
            <p> a) VFVV</p>
          </button>
          <button className="perguntaOptativa-B">
            <p> b) FFVF</p>
          </button>
          <button className="perguntaOptativa-C">
            <p> c) VFFV</p>
          </button>
          <button className="perguntaOptativa-D">
            <p> d) FVFV</p>
          </button>
        </div>

          <button className="botaoProxima">
            <p className="proxima">Próxima</p>
          </button>
        </div>

        


      </div>
    </>
  );
}

export default PerguntaOptativa;
