"use strict";

const express = require('express')
const app = express()
const mongoose = require('mongoose')
// DB Config
const uri =
  "mongodb+srv://MubbyGN:Mk4NAfw7XjkH0Dcb@se-qt9vz.mongodb.net/test?retryWrites=true";

// Connect to mongo
mongoose
  .connect(uri, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
const PORT = process.env.PORT || 3000;

//Require routers
const taskRoute = require('./routes/task')
const consultancyRoute = require("./routes/consultancy")
const coworkingspaceRoute = require("./routes/coworkingspace")
const partnerRoute = require("./routes/partner");
const customerRoute = require("./routes/member")
const EducationalOrganisationRoute = require("./routes/EducationalOrganisation")
const certificationRoute = require("./routes/certification")
const scheduleRoute = require("./routes/schedule")
const reviewRoute = require("./routes/review")
//Setup Parser, Note: extended option is diabled to allow for array encoding
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

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


//Setup routing directories/paths
app.use('/api/task', taskRoute) // Tested - Passed - changed file name to match file naming agreement
app.use("/api/consultancy", consultancyRoute); // Tested - Passed
app.use("/api/partner", partnerRoute); // Tested - Passed - router had extra paths, EX : /api/partner/update (solved by removal)
app.use("/api/coworking",coworkingspaceRoute); // Tested - Passed
app.use("/api/Member", customerRoute); // Tested - Passed
app.use("/api/EducationalOrganisation",EducationalOrganisationRoute); // Tested - Passed
app.use("/api/certification", certificationRoute); // Tested - Passed - A lot of problems with CRUD Associated with POST & GET routes (Solved by correcting code) 
app.use("/api/schedule",scheduleRoute);
app.use("/api/review", reviewRoute);
//404 & 500 Error handlers
app.use((error, request, response, next) => {
    response.status(500).send("500: Internal Server Errors")
})

app.listen(PORT, () => {
    console.log("Application listening to port: " + PORT)
})