"use strict";


const express=require("express");

const app=express();

const EducationalOrganisationRoute=require("./routes/EducationalOrganisation")

const bodyParser=require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.method} ${req.originalUrl}`, req.body)
    next()
})

app.use("/api/EducationalOrganisation",EducationalOrganisationRoute);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.info(`Server is running on ${PORT}`)})

