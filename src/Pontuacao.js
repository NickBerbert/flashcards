import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./pontuacao.css"; 
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";  

function Pontuacao() {
        useEffect(() => {
          fetch("http://localhost:5000/pontuacao")
            .then((res) => res.json())
        }, []);
      const navigate = useNavigate();

    //    const [pontuacoes, setPontuacoes] = useState([]);
    const [pontuacoes] = useState([]);

    const voltar = () => {
        navigate('/'); 
    };

    return (
        <div className="container">
            <div className="logo">
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
                    <img 
                        src={logo}  
                        className="icone-raio" 
                        alt="Ícone de Raio" 
                    />
                </div>
            </div>
            <div className="cinza_escuro">
                <div className="pontuacoes">
                    <div className="melhores-container">
                        <img 
                            src="/22542143-pixel-arte-jogos-moeda-moeda-vetor-removebg-preview.png"  
                            className="icone-moeda"   
                            alt="Ícone moeda" 
                        />
                        <span className="melhores-pontuacoes">Melhores Pontuações:</span>
                    </div>
                    <ol>
                        {pontuacoes.length > 0 ? (
                            pontuacoes.map((usuario, index) => (
                                <li key={index}>
                                    <span>{usuario.nome} ({usuario.pontuacao} pontos)</span>
                                </li>
                            ))
                        ) : (
                            <p>Carregando pontuações...</p>
                        )}
                    </ol>
                </div>
            </div>
            <button className="botaoVoltar" onClick={voltar}>
                <p className="voltar">Voltar</p>
            </button>
        </div>
    );
}

export default Pontuacao;
