const path = require("path");
const express = require("express");
const multer  = require("multer");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const staticPath = path.join(__dirname, "static");
const port = process.env.PORT || 9000;
const app = express();
const upload = multer();
const helmet = require("helmet");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

app.use(express.static(staticPath));
app.use(cookieParser());
app.use(helmet()); // basic web security headers
app.use(webpackMiddleware(webpack(webpackConfig)));

app.set("view engine", "ejs");

app.get("/", csrfProtection, (req, res) => {
  res.render("index", { csrfToken: req.csrfToken() });
});

// csrfProtection position requires formdata as it looks for body._csrf
app.post("/greet", upload.none(), csrfProtection, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const greeting = req.body["greeting"];
  const result = ejs.render("And <%= greeting %> to you!", {greeting: greeting});
  res.send(result);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

