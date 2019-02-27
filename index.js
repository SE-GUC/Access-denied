"use strict"
const express = require("express");
const app = express();
const partnerRoute = require("./routes/partner");
const consultancyRoute = require("./routes/consultancy")
const coworkingspaceRoute = require("./routes/coworkingspace")

app.use(express.json())
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.method} ${req.originalUrl}`, req.body)
    next()
})

app.use(express.static('public'));
app.use("/api/partner", partnerRoute);
app.use("/api/consultancy", consultancyRoute);
app.use("/api/coworking",coworkingspaceRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.info(`Server is running on ${PORT}`)});