require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/routes")
const express = require("express");
const app = express();


app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.listen(process.env.APP_PORT);

console.log("Listening on " + process.env.APP_PORT)