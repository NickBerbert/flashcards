import React, { useEffect, useState } from "react";
import "./tutorial.css"; 

function Tutorial() {
    const [message, setMessage] = useState("Testando conexão...");
    useEffect(() => {
      fetch("http://localhost:5000/tutorial")
        .then((res) => res.json())
        .then((data) => setMessage(`Backend conectado: ${data.message}`))
        .catch((err) => setMessage("Erro ao conectar ao backend!"));
    }, []);
  
    return <h1>{message}</h1>;
}

export default Tutorial;