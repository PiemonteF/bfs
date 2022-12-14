//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();



//------AVALIAÇÃO DA EMPREITEIRA PELA CONSTRUTORA-----------
//forms no qual a empreiteira consegue avaliar a empreiteira dando a ele uma classificação 
router.post("/avaliacaoEmpreiteira", (req, res) => {
    let nota;
    let nota_prazo = req.body["nota_prazo"];
    let descricao_prazo = req.body["descricao_prazo"];
    let nota_qualidade = req.body["nota_qualidade"];
    let descricao_qualidade = req.body["descricao_qualidade"];
    let nota_produtividade = req.body["nota_produtividade"];
    let descricao_produtividade = req.body["descricao_produtividade"];
    let nota_documentacao = req.body["nota_documentacao"];
    let descricao_documentacao = req.body["descricao_documentacao"];
    let nota_limpeza_organizacao = req.body["nota_limpeza_organizacao"];
    let descricao_limpeza_organizacao = req.body["descricao_limpeza_organizacao"];
    let id_servico = req.body["id_servico"];
    let id_empreiteira = req.body["id_empreiteira"];

    nota = (parseInt(nota_prazo) + parseInt(nota_qualidade) + parseInt(nota_produtividade) + parseInt(nota_documentacao) + parseInt(nota_limpeza_organizacao))/5;

    const sql = `
        INSERT INTO nota 
        (
            nota,
            nota_prazo,
            descricao_prazo,
            nota_qualidade,
            descricao_qualidade,
            nota_produtividade,
            descricao_produtividade,
            nota_documentacao,
            descricao_documentacao,
            nota_limpeza_organizacao,
            descricao_limpeza_organizacao,
            id_servico,
            id_empreiteira
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const lista = [
        nota,
        nota_prazo,
        descricao_prazo,
        nota_qualidade,
        descricao_qualidade,
        nota_produtividade,
        descricao_produtividade,
        nota_documentacao,
        descricao_documentacao,
        nota_limpeza_organizacao,
        descricao_limpeza_organizacao,
        id_servico,
        id_empreiteira
    ];

    db.run(sql, lista, (err, rows) => {
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.json({message:"foi"});
    });
});

//------LISTA TODAS AS EMPREITEIRAS CADASTRADAS NA PLATAFORMA--------
//Lista as empreiteiras cadastradas no site
//Se atentar nas informações que irão aparecer
//Ordenar por nota
//Filtrar por cidade + estado
router.get("/lista_empreiteiras", (req, res) => {
    const sql = `
        SELECT id_empreiteira, nome_fantasia, telefone, cnpj
        FROM empreiteira`

        db.all(sql, (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
            //redireciona para o feed necessário
            res.render("mrv_admin/lista_empreiteiras", {lista:rows});
            }
        });
});

//------LISTAS TODAS AS EMPREITEIRAS CADASTRADAS EM UM SERVIÇO ESPECÍFICO------
//Se atentar nas informações que irão aparecer
//Ordenar por nota
router.get("/candidatos", (req, res) => {
    let id_servico = req.query["id_servico"];

    const sql =  `
        SELECT empreiteira.*
        FROM inscricao
        INNER JOIN empreiteira ON empreiteira.id_empreiteira = inscricao.id_empreiteira
        WHERE inscricao.id_servico = ?
    `
    //`SELECT * FROM empreiteira, inscricao WHERE inscricao.id_servico = ? AND inscricao.id_empreiteira = empreiteira.id_empreiteira`


        db.all(sql, [id_servico], (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
            //redireciona para o feed necessário
            console.log(rows)
            res.json({message:rows});
            //res.render("mrv_admin/candidatos", {candidatos:rows});
            }
        });
});

//------PERFIL MRV------
router.get("/perfil", (req, res) => {

    let id_administrador = req.query["id_administrador"];
    const sql = `
        SELECT *
        FROM administrador_mrv
        WHERE
            id_administrador = ?`

    db.get(sql, [id_administrador], (err, row) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        console.log(row);
        res.json({message:row});
        //res.render("/", {obra: row});
    });
});

module.exports = router;