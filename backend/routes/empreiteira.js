//requisição express + banco de dados
const express = require("express");
//middleware de roteamento

const db = require('../utils/db');
//middleware de roteamento
const router = express.Router();

//-------CARREGAR O PERFIL --------
router.get("/perfil", (req, res) => {

    let id_empreiteira = req.query["id_empreiteira"];
    const sql = `
        SELECT *
        FROM empreiteira
        LEFT JOIN nota
        ON empreiteira.id_empreiteira = nota.id_empreiteira
        WHERE
            empreiteira.id_empreiteira = ?`

    db.get(sql, [id_empreiteira], (err, row) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        console.log(row);
        res.render("empreiteira/perfil_empreiteiro",{empreiteira: row});
    });
});

//------EDITAR PERFIL----------
router.get("/editarPerfil", (req, res) => {

    let id_empreiteira = req.query["id_empreiteira"];
    const sql = `
        SELECT *
        FROM empreiteira
        WHERE
            id_empreiteira = ?`

    db.get(sql, [id_empreiteira], (err, row) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        console.log(row);
        res.render("empreiteira/config_empreiteiro", {empreiteiras:row, id:id_empreiteira});
        //res.render("/", {obra: row});
    });
});

router.post("/editarPerfil", (req, res) => {
    let id_empreiteira = req.body["id_empreiteira"];
    let id_cidade = req.body["id_cidade"];
    // let cnpj = req.body["cnpj"];
    let data_de_abertura = req.body["data_de_abertura"];
    let razao_social = req.body["razao_social"];
    let nome_fantasia = req.body["nome_fantasia"];
    let qtd_funcionario = req.body["qtd_funcionario"];
    let logradouro = req.body["logradouro"];
    let numero = req.body["numero"];
    let bairro = req.body["bairro"];
    let telefone = req.body["telefone"];
    let email = req.body["email"];
    let senha = req.body["senha"];
    let descricao = req.body["descricao"];
    console.log("nome:" + nome_fantasia);
    //const sql = "UPDATE servico SET nome='" + req.body.nome + "', logradouro='"+req.body.logradouro+"', bairro='"+req.body.bairro+"', data_abertura='"+req.body.data_abertura+"', data_finadlizacao='"+req.body.data_finadlizacao+"', numero='"+req.body.numero+"', descricao='"+req.body.descricao+"' WHERE id_servico='"+req.body.id_servico+"'";
    const sql = `UPDATE empreiteira
                    SET
                        nome_fantasia=?,
                        qtd_funcionario=?,
                        logradouro=?,
                        numero=?,
                        bairro=?,
                        telefone=?,
                        email=?,
                        senha=?,
                        descricao=?
                    WHERE id_empreiteira=?`;
    db.run(sql, [nome_fantasia, qtd_funcionario, logradouro, numero, bairro, telefone, email, senha, descricao, id_empreiteira], (err, rows) => {
		if (err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.redirect("/empreiteira/perfil?id_empreiteira="+id_empreiteira);
	});
});

router.get("/paginaServico", (req, res) => {

    let id_servico = req.query["id_servico"];
    let id_empreiteira = req.query["id_empreiteira"];
    console.log("id EMPREITEIRA ::::: " + id_empreiteira);
    const sql = `
        SELECT *
        FROM servico
        WHERE
            id_servico = ?`

    db.get(sql, [id_servico], (err, row) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        console.log(row);
        res.render("empreiteira/pagina_servicos",{servico: row, id: id_empreiteira});
    });
});

// Mostrar as obras em qe o empreiteiro se candidatou
// router.get("/suasObras", (req, res) => {

//     let id_empreiteira = req.query["id_empreiteira"];
//     const sql = `
//         SELECT *
//         FROM servico
//         LEFT JOIN inscricao
//         ON
//             servico.id_servico = inscricao.id_servico = ?`

//     db.get(sql, [id_empreiteira], (err, row) =>{
//         if(err) {
//             console.error(err.message);
//             res.send("Erro: " + err.message);
//             return;
//         }
//         console.log(row);
//         res.render("empreiteira/suas_obras",{suasObras: row});
//     });
// });

router.get('/suasObras', (req, res) => {
    // Get the value of the idEmp parameter from the URL
    let id_empreiteira = req.query["id_empreiteira"];

    const sql = `
        SELECT servico.*
        FROM empreiteira
        INNER JOIN inscricao ON empreiteira.id_empreiteira = inscricao.id_empreiteira
        INNER JOIN servico ON inscricao.id_servico = servico.id_servico
        WHERE empreiteira.id_empreiteira = ?
    `;

    console.log(sql);

        db.all(sql, [id_empreiteira], (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
            console.log(rows);
            res.render("empreiteira/suas_obras",{suasObras:rows});
            
            }
        });
});



module.exports = router;