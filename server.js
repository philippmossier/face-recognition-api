const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require("cors"); //Cross-Origin Resource Sharing, for Security
const knex = require("knex") // also needs npm install pg in package.json file
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// all db.methods are knex methods, read documentation online, knex.js is an npm-package
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '', //superusername in your postgresSQL
        password: '', // postgreSQL password
        database: 'smart_brain'
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => { res.send(database.users) });
app.post("/signin", signin.handleSignin(db, bcrypt)) // cleanest version but advanced
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) }) // normal version, maybe easier to understand
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put("/image", (req, res) => { image.handleImage(req, res, db) })

app.listen(3000, () => {
    console.log("app is running on port 3000")
})


/* Backend Plan:
/--> res = this is working
/signin --> POST = succes/fail   ( GET is not secure because of shown password in query string)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/

// Infos :
// When you signin at frontend input gets send within a "req.body" to the server