"use strict"
const express = require("express");
const app = express();
const partnerRoute = require("./routes/partner");
const bodyParser = require("body-parser")

const consultancyRoute = require("./routes/consultancy")

app.use(bodyParser.json())
app.use("/", partnerRoute);
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.method} ${req.originalUrl}`, req.body)
    next()
})

app.use("/api/consultancy", consultancyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.info(`Server is running on ${PORT}`)});