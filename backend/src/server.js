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

const cors = require("cors");

// Appi
const app = express();

app.use(cors());

require("./auth");

const session = require("express-session");

app.use(express.json());

app.use(session({
  secret: "your-session-secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const users = [{username:  "test1", password:  "password1"}];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.user = user;
    res.status(200).json({ message: "Login successful", token: "fake_token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/auth/login", passport.authenticate("oauth2"));

app.get("/auth/callback", passport.authenticate("oauth2", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/home");
});

app.use(morgan("common"));

app.get("/", function(req, res, next) {
  database.raw('select VERSION() version')
    .then(([rows, columns]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

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

//I need the url for the homepage in order to proceed or else I will get confused on implication(for now fix the .env file later and auth.js file).