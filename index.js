"use strict";
var express = require('express')
var app = express()
const certificationRoute = require("./routes/certification")

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.method} ${req.originalUrl}`, req.body)
    next()
})

app.use("/certification", certificationRoute);
app.use(express.static('public'));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {console.info(`Server is running on ${PORT}`)});