const express = require('express'),
      app = express(),
      mysql = require('mysql'),
      bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'desafio_mysql'
});

db.connect((err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log('Connected to database.');
});

app.get('/', (req, res) => {
  let query = "SELECT * FROM times ORDER BY ano ASC";

  db.query(query, (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.render('index', {times: result});
    }
  });
});

app.post('/delete/:nome', (req, res) => {
  let nome = req.params.nome;
  let query = `DELETE FROM times WHERE nome = '${nome}';`;

  db.query(query, (err, result)=> {
    if(err){
      console.log(err);
    }
    else{
      console.log(`${nome} foi removido.`);
      res.redirect('/');
    }
  });
});

app.post('/', (req, res) => {
  let nome = req.body.nome_input;
  let estado = req.body.estado_input;
  let ano = req.body.ano_input;
  console.log("Novo time adicionado: " + nome, estado, ano);

  let query = "INSERT INTO times(nome, estado, ano) VALUES ('" + nome + "', '" + estado + "', '" + ano + "');";
  db.query(query, (err, result)=> {
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/');
    }
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});