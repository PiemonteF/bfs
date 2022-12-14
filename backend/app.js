//requisição biblioteca path
//métodos que facilitam o manuseio dos caminhos dos diretórios
const path = require("path");
//basicamente utiliza o arquivo env para conter variáveis globais
require("dotenv").config({
    encoding: "utf8",
    path: path.join(__dirname, "../env")
});

//requisição ejs
const ejs = require("ejs");
//requisição lru-cache
//salva os html usados no browser, não precisando fazer 
//a requisição do servidor
const LRU = require("lru-cache");
ejs.cache = new LRU({
    max:200
});

//requisição express
const express = require("express");
const app = express();

//configura a pasta views para ser a pdrão ao renderizar uma página
app.set("views", path.join(__dirname, "../views"));
//configura a engine do browser para ler ejs
app.set("view engine", "ejs");
//configura a pasta public para os arquivos estáticos
app.use("/public", express.static(path.join(__dirname,"../public"), {
    cacheControl: false,
    etag: false,
    maxAge: "30d"
}));

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
});

//Configuração das rotas
//rota para a landing page do site
app.use("/", require("./routes/index"));
//rota para os métodos de cadastro
//apenas empreiteiras
app.use("/cadastro", require("./routes/cadastro"));
//rotas para o login da empreiteira como também da MRV
app.use("/login", require("./routes/login"));
//rotas com todos os métodos relacionados a um serviço
app.use("/servico", require("./routes/servico"));
//rotas relacionadas as ações que um usuário da MRV consegue fazer
app.use("/mrv", require("./routes/mrv"));
//rotas para o feed da empreiteira como também da mrv
app.use("/feed", require("./routes/feed"));
//rotas relacionadas as ações que um usuário da MRV consegue fazer
app.use("/empreiteira", require("./routes/empreiteira"));


//erro
app.use((req, res, next) => {
    const err = new Error("Não encontrado");
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status);

    res.send("Erro " + status + " ocorrido: " + (err.message || err.toString()));
});

//iniciar servidor
const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
    console.log("Servidor executando na porta " + server.address().port);
});