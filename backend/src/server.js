// simple node web server that displays hello world
// optimized for Docker image

const express = require("express");
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

const morgan = require("morgan");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const database = require("./database");

const passport = require("passport");
require('dotenv').config();

// console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

require("./auth");

const knex = require("knex");

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("common"));

const users = [{username:  "test1", password:  "password1"}];

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  // Update to conform to following criteria:
  // -- Check if username OR email OR phone
  // -- OAuth??
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.user = user;
    res.status(200).json({ message: "Login successful", token: "fake_token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/home');
  }
);



app.get("/", function(req, res, next) {
  database.raw('select VERSION() version')
    .then(([rows, columns]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

// Insert API endpoints here ???

app.post("/api/auth/signup", (req, res) => {
  const {username, password,
    email, phone, owner_name,
    pet_name, pet_type, pet_breed, pet_sex, pet_dob} = req.body;
    // Don't implement on frontend until OAuth implemented
    // ie: when doing so return a variable fed into DB!!
    // (or however that works)

    // Add fields to corresponding tables
    knex('users').insert({
      username: username,
      password: password,
      email: email,
      phone: phone,
      display_name: owner_name
    }).then((user_id) => {
      knex('pets').insert({
        owner: user_id,
        name: pet_name,
        type: pet_type,
        breed: pet_breed,
        sex: pet_sex,
        dob: pet_dob
      })
    });
    res.status(200).json({ message: "Signup successful" });
});

app.post("/api/pet", (req, res) => {
  const {owner, name, type, breed, sex, dob} = req.body;
  // Maybe check if owner exists?
  // And if session is authenticated
  knex('pets').insert({
    owner: owner,
    name: name,
    type: type,
    breed: breed,
    sex: sex,
    dob: dob
  })
  .then(() => {
    res.status(200).json({ message: "Pet added" });
  });
});

app.get("/api/pet", (req, res) => {
  
  knex('pets')
  .where({'pet_id': req.query.id})
  .select('*');
  
  // error handling

  // return JSON

});




// Health checks/System stuff

app.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

//I need the url for the homepage in order to proceed or else I will get confused on implication(for now fix the .env file later and auth.js file). */