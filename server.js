const path = require("path");
const express = require("express");
const multer  = require("multer");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 9000;
const app = express();
const router = express.Router();
const upload = multer();

app.use(express.static(publicPath));
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

router.post("/greet", upload.none(), (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const greeting = req.body['greeting'];
    console.log(greeting);
    res.send(`And ${greeting} to you!`);
});

app.use('/', router);