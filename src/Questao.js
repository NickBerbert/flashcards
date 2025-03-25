import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Questao() {
  const [questao, setQuestao] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/questaoAtual")
      .then((res) => res.json())
      .then((data) => {
        console.log("Questão recebida:", data);
        if (data && data.tipo) {
          setQuestao(data);
        } else {
          console.error("Resposta da API inválida:", data);
        }
      })
      .catch((error) => console.error("Erro ao buscar questão:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (questao) {
      console.log("Redirecionando para:", questao.tipo);
      if (questao.tipo === "aberta") {
        navigate("/perguntaAberta", { state: { questao } });
      } else if (questao.tipo === "optativa") {
        navigate("/perguntaOptativa", { state: { questao } });
      }
    }
  }, [questao, navigate]);

  return (
    <div className="questao">
      {loading ? <p>Carregando questão...</p> : <p>Redirecionando...</p>}
    </div>
  );
}

export default Questao;
