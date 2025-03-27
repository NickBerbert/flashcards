import React, { useState } from "react";
import "./perguntaAberta.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";

function PerguntaAberta() {
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const questao = location.state?.questao;
  const idUsuario = location.state?.idUsuario || localStorage.getItem("usuarioId");

  console.log("ID do Usuário recebido:", idUsuario);

  const enviarResposta = (pontosGanhos) => {
    if (!questao) {
      setMensagem("Erro: Nenhuma questão carregada!");
      return;
    }
    if (!idUsuario) {
      setMensagem("Erro: ID do usuário não encontrado!");
      return;
    }
    if (!respostaUsuario.trim()) {
      setMensagem("Digite uma resposta antes de enviar!");
      return;
    }
  
    fetch("http://localhost:5000/responderQuestao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario,
        idQuestao: questao.id,
        respostaUsuario,
        pontos: pontosGanhos
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
          if (data.respostaCorreta) {
            setRespostaCorreta(data.respostaCorreta);
          }
        } else {
          setMensagem(data.message);
          setRespostaCorreta(null);
          setRespostaUsuario(""); // Limpa o input após o envio

        // Atraso de 2 segundos antes de redirecionar para a próxima questão
        setTimeout(() => {
          // Envia os parâmetros necessários para a próxima questão
          fetch("http://localhost:5000/questaoAtual", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idUsuario }),
          })
            .then((res) => res.json())
            .then((nextQuestao) => {
              // Redireciona para a página da próxima questão
              navigate("/questaoAtual", { 
                state: { 
                  questao: nextQuestao, 
                  idUsuario, 
                }
              });
            })
            .catch((error) => console.error("Erro ao buscar próxima questão:", error));
        }, 5000); // 2000ms = 2 segundos
      }
    })
      .catch((error) => console.error("Erro ao enviar resposta:", error));
  };
  

  return (
    <>
      <div className="logo">
        <img src={RaioIcone} className="perguntaAberta-icone-raio" alt="Ícone de Raio" />
        <span className="perguntaAberta-flashcards">FLASHCARDS</span>
      </div>

      <div className="perguntaAberta-pergunta">
        <span className="pergunta1">
          {questao ? questao.enunciado : "Carregando questão..."}
        </span>
      </div>

      <div className="perguntaAberta-resposta">
        <input
          type="text"
          placeholder="Digite a resposta"
          value={respostaUsuario}
          onChange={(e) => setRespostaUsuario(e.target.value)}
        />
        <button className="perguntaAberta-botaoEnviar" onClick={() => enviarResposta(20)}>
          <p className="perguntaAberta-enviar">Enviar</p>
        </button>
      </div>

      {mensagem && <p>{mensagem}</p>}
      {respostaCorreta && <p><strong>Resposta correta:</strong> {respostaCorreta}</p>}
    </>
  );
}

export default PerguntaAberta;




  


