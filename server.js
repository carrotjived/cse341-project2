const bodyParser = require("body-parser");
const express = require("express");
const mongodb = require("./data/database.js");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("cookie-session");
const GitHubStrategy = require("passport-github2").Strategy;

const port = process.env.PORT || 3000;

//MIDDLE Wares

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
//This is the basic express serssion initialization
app.use(passport.initialize()); //initialize passport on every call

app.use(passport.session()); //allow passport to use express-session

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "OrIgin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});

app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));
app.use("/", require("./routes"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
  console.log(req.session.user);
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught Exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database listening on port: ${port}`);
    });
  }
});
