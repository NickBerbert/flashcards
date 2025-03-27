import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Questao() {
  const [questao, setQuestao] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);

    // Obtendo idUsuario da página anterior
    const idUsuario = location.state?.idUsuario;

    useEffect(() => {
      fetch("http://localhost:5000/questaoAtual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario }) // Enviando ID do usuário
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMensagem(data.error);
          } else {
            setQuestao(data);
            setRespostaCorreta(null);
            setMensagem("");
          }
        })
        .catch((error) => console.error("Erro ao buscar questão:", error));
    }, []);
    

  useEffect(() => {
    if (questao) {
      console.log("Redirecionando para:", questao.tipo);
      if (questao.tipo === "aberta") {
        navigate("/perguntaAberta", { state: { questao, idUsuario } });
      } else if (questao.tipo === "optativa") {
        navigate("/perguntaOptativa", { state: { questao, idUsuario } });
      }
    }
  }, [questao, idUsuario, navigate]);

  return (
    <div className="questao">
        <span className="pergunta1">
          {questao ? questao.enunciado : "Carregando questão..."}
        </span>
      </div>
  );
}

export default Questao;


