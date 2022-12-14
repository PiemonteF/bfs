const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();

//-------ROTA PRA A LANDING PAGE---------
//carrega todas os serviços no banco de dados e mostra na landing page

//IDEIA - Só renderizar a landing page e colocar serviços falsos
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM servico`

        db.all(sql, (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
                res.render("login/index", {servicos: rows});
            }
        });
});

module.exports = router;