"use strict";
const express = require("express");
const app = express();
const customerRoute = require("./routes/member")
const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use("/", customerRoute);

app.listen(3000, () => {console.log('Listening to port 3000')});



app.use(express.static('public'));