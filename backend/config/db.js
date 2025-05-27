const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",  
    user: "user_nick",     
    password: "159487236nN+", 
    database: "flashcards"
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

module.exports = connection;