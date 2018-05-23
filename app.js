// console.log("Bom dia Brasil, Boa tarde Italia");
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/minicurso');

const Serie = require('./Serie.js');

var app = express();

app.use(bodyParser.json());

var series = [];
//registrou requisicao get em barra vai executar essa funcao
//requisicao: traz informacoes do "cliente"
app.get('/', function(requisicao, resposta){ 
   resposta.send('<h1>NodeFlix!</h1>');
});

app.post('/series', (req, res) =>{
    var novaSerie = req.body;
    const serieCriada = new Serie(novaSerie);
    serieCriada.save(function(){
        res.send(serieCriada);
    });
});

app.get('/series/:id', (req, res) => {
    const seriesDB = Serie.findById(req.params.id, (erro, series) => {
        if(erro){
            return res.status(400).send(erro);
        }
        res.send(series);
    });
});

//funcao find(erro, objeto)
app.get('/series', (req, res) => {
    const seriesDB = Serie.find({},'_id nome', (erro, series) => {
        if(erro){
            return res.status(400).send(erro);
        }
        res.send(series);
    });
});




app.put('/series/:id',(req, res)=>{
    var id = req.params.id;
    var novaSerie = req.body;
    Serie.findById((id, serieEncontrada)=>{
        serieEncontrada.assistida = novaSerie.assistida;
        serieEncontrada.save((err,serie)=>{
            res.send(serie);
        });
    });
});


app.listen(8087, function(){
    console.log('O servidor está rodando');
});
