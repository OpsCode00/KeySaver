const express = require('express')
 
const path = require('path')
 
const app = express()
 
const PORT = process.env.PORT || 5000
 
app.use(express.static(path.join(__dirname + "/public")))

const cors = require('cors');

const {encrypt, decrypt} = require("./EncryptionHandler")

app.use(cors())
app.use(express.json());
var router = express.Router();

const mysql = require('mysql')
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'passwordmanager'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

app.get('/post', (req, res) => { //Test
  console.log("Connesso a React");
  res.redirect("/");
});

app.post('/addpassword', (req, res) => { //Richiesta POST, dovrò fare una richiesta API
  const {name, web, mail, user, password, id} = req.body;
  const hashedPassword = encrypt(password);

  db.query("INSERT INTO Passwords (Name, Web, Mail, User, Password, IV, UniqueID) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, web, mail, user, hashedPassword.password, hashedPassword.iv, id], (err, result) => { //Faccio la Insert e mi salvo eventuali errori in "err"
    if (err) {
      console.log(err) //Se ci sono errori li mostro in console
    } else {
      res.send("Completato con Successo") //Se NON ci sono errori mando una stringa di Success
    }
  })

});

app.get(`/checksignup`, (req, res) => {
  const email = req.query.email
  db.query("SELECT * FROM Login WHERE EMail = (?)", [email], (err, response) => {
    if (err) console.log(err)
    else { 
      res.send(response);
    }
  })
});

app.get(`/checklogin`, (req, res) => {
  const email = req.query.email
  const password = req.query.password
  var values = {password:"", iv:""};
  db.query("SELECT * FROM Login WHERE EMail = (?)", [email], (err, response) => {
    if (err) console.log(err)
    else { 
      if (response.length > 0 && response[0]['EMail'] === email) {
      values.password = response[0]['Password'];
      values.iv = response[0]['IV'];
      if (password === decrypt(values)) {
        res.send(response[0]['ID'].toString()) //Login Effettuato, Invio ID
      } else {
        res.send("Error")
      }
    } else {
      res.send("Error")
    }
  }
  })
});

app.post("/signup", (req, res) => { //Richiesta POST, dovrò fare una richiesta API
  const {email, password, name, surname} = req.body;
  const hashedPassword = encrypt(password);

  db.query("INSERT INTO Login (EMail, Password, IV, Name, Surname) VALUES (?, ?, ?, ?, ?)", [email, hashedPassword.password, hashedPassword.iv, name, surname], (err, result) => { //Faccio la Insert e mi salvo eventuali errori in "err"
    if (err) {
      console.log(err) //Se ci sono errori li mostro in console
    } else {
      res.send("OK") //Se NON ci sono errori mando una stringa di Success
    }
  })

});


app.get('/search', (req, res) => {
  const idUser = req.query.user;
  var accounts = [];
  var values = {password:"", iv:""};
  db.query(`SELECT * FROM Passwords WHERE UniqueID = ?`, [idUser], (err, response) => {
    if (err) console.log(err)
    else { 
      Object.assign(accounts, response);
      accounts.forEach(element => {
        values.password = element['Password'];
        values.iv = element['IV'];
        element['Password'] = decrypt(values)
      });
      res.send(response);
    }
  })
});

app.get('/user', (req, res) => {
  const idUser = req.query.user;
  db.query(`SELECT Name, Surname FROM login WHERE ID = ?`, [idUser], (err, response) => {
    if (err) console.log(err)
    else {
      res.send(response[0]);
    }
  })
});

app.get('/deleteAccount', (req, res) => {
  const idCard = req.query.id;
  var accounts = [];
  var values = {password:"", iv:""};
  db.query('DELETE FROM Passwords WHERE ID = ?', [idCard], (err, response) => {
    if (err) console.log(err)
    else { 
      res.send("OK");
    }
  })
});


// Mostra il Messaggio che il Server è Attivo su una specifica Porta
app.listen(PORT, () => console.log(`In ascolto sulla Porta ${PORT}`));

// crea un Percorso GET
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});