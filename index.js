"use strict";
const express = require("express");
const app = express();
const partnerRoute = require("./routes/partner");
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use("/", partnerRoute);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.info(`Server is running on ${PORT}`)});