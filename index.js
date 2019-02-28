"use strict";

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

//Require routers
const taskRoute = require('./routes/taskRoute.js')
const consultancyRoute = require("./routes/consultancy")
const coworkingspaceRoute = require("./routes/coworkingspace")
const partnerRoute = require("./routes/partner");
const customerRoute = require("./routes/member")
const EducationalOrganisationRoute=require("./routes/EducationalOrganisation")

//Setup Views Directory, TODO: Assign view engine, Let html as DEF
app.set('views', './views')
app.set('view engine', 'html')

//Logger
app.use((request, response, next) => {
    console.log(`${new Date().toString()} => ${request.method} ${request.originalUrl}`, request.body)
    next()
})

//Setup Static Directory
app.use(express.static('./public'))

//Setup Parser, Note: extended option is diabled to allow for array encoding
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//Setup routing directories/paths
app.use('/api/task', taskRoute)
app.use("/api/consultancy", consultancyRoute);
app.use("/api/partner", partnerRoute);
app.use("/api/coworking",coworkingspaceRoute);
app.use("/", customerRoute); // TODO Add the correct route form
app.use("/api/EducationalOrganisation",EducationalOrganisationRoute);

//404 & 500 Error handlers
app.use((error, request, response, next) => {
    response.status(500).send("500: Internal Server Error")
})

app.listen(PORT, () => {
    console.log("Application listening to port: " + PORT)
})