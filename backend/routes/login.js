//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();

//encaminha para a página de login
//----LOGIN MRV-------
router.get("/mrv", (req, res) => {
    res.render("login/login_mrv");
});

//-----AUTENTICAÇÃO MRV--------
router.post("/autenticacaoMrv", (req, res) => {
    let email = req.body["email"];
    let senha = req.body["senha"];

    sql = `
    SELECT id_administrador
    FROM administrador_mrv
    WHERE
        senha = ? and
        email = ?`;
        
    db.get(sql, [senha, email], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: bobao " + err.message);
            return;
        }else if(rows !== undefined){
            console.log(rows["id_administrador"]);
            console.log(rows);
            res.redirect("../feed/mrv?id_administrador="+rows["id_administrador"]);
        }else{
            console.log(rows);
            res.redirect("/login/mrv");
        };
    });
});

//-----LOGIN EMPREITEIRA-------
router.get("/empreiteira", (req, res) => {
    res.render("login/login_empreiteira");
});

//------AUTENTICAÇÃO EMPREITEIRA------
router.post("/autenticacaoEmpreiteira", (req, res) => {
    let email = req.body["email"];
    let senha = req.body["senha"];

    let sql = `
        SELECT id_empreiteira
        FROM empreiteira
        WHERE 
            senha=? AND 
            email=?`;


    db.get(sql, [senha, email], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: bobao " + err.message);
            return;
        }else if(rows !== undefined){
            res.redirect("../feed/empreiteira?id_empreiteira="+rows["id_empreiteira"]);
        }else{
            res.redirect("/login/empreiteira");
        };
    });
});



//exporta a rota para poder ser requisitada no app.js
module.exports = router;