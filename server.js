///////////////////////////
// Environmental Variables
///////////////////////////
require("./envfunc")();
const {
  PORT = 3000,
  SECRET = "secret",
  NODE_ENV = "development",
} = process.env;

//Bringing in Express
const express = require("express");
const app = express();

//OTHER IMPORTS
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const {log} = require("mercedlogger")

//set view engine to express-react-views
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

////////////
//MIDDLEWARE
////////////
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //comment if not using forms
app.use(methodOverride("_method"));
// app.use(express.json()) uncomment if using json
app.use(morgan("tiny")); //logging

///////////////
//Routes and Routers
//////////////
app.get("/", (req, res) => {
  res.render("index.jsx", { hello: "Hello World" });
});

//LISTENER
app.listen(PORT, () => {
  log.green("Server Started",`Your are listening on port ${PORT}`);
});
