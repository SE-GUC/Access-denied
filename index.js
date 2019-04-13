'use strict'
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
var http = require('http').Server(app)
var io = require('socket.io')(http)
require('dotenv').config()

// Database Configuration...

const uri = process.env.MONGOURI

const PORT = process.env.PORT || 3001
//Require routers
const taskRoute = require('./routes/task')
const skillsRoute = require('./routes/skills')
const consultancyRoute = require('./routes/consultancy')
const coworkingspaceRoute = require('./routes/coworkingspace')
const partnerRoute = require('./routes/partner')
const customerRoute = require('./routes/member')
const EducationalOrganisationRoute = require('./routes/EducationalOrganisation')
const certificationRoute = require('./routes/certification')
const scheduleRoute = require('./routes/schedule')
const reviewRoute = require('./routes/review')
const EvaluationRoute = require('./routes/Evaluation')
const applicationRoute = require('./routes/application')
const messageRoute = require('./routes/message')
const searchRoute = require('./routes/search')
const userRoute = require('./routes/user')
const loginRoute = require('./routes/login')
const requestRoute = require('./routes/requests')

//Setup Parser, Note: extended option is diabled to allow for array encoding
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)
//Setup Views Directory, TODO: Assign view engine, Let html as DEF
// app.set('views', './views')
// app.set('view engine', 'html')

//Logger
app.use((request, response, next) => {
  console.log(
    `${new Date().toString()} => ${request.method} ${request.originalUrl}`,
    request.body
  )
  next()
})
const verifyToken = token => {
  try {
    let ver = jwt.verify(token, process.env.KEY)
    return ver
  } catch {
    return false
  }
}
//Setup Static Directory
// app.use(express.static('./public'))
//Setup routing directories/paths
app.set('io', io)
app.set('verifyToken', verifyToken)
app.use('/api/task', taskRoute.router) // Tested - Passed - changed file name to match file naming agreement
app.use('/api/consultancy', consultancyRoute) // Tested - Passed
app.use('/api/partner', partnerRoute) // Tested - Passed - router had extra paths, EX : /api/partner/update (solved by removal)
app.use('/api/coworking', coworkingspaceRoute) // Tested - Passed
app.use('/api/Member', customerRoute) // Tested - Passed
app.use('/api/EducationalOrganisation', EducationalOrganisationRoute) // Tested - Passed
app.use('/api/certification', certificationRoute) // Tested - Passed - A lot of problems with CRUD Associated with POST & GET routes (Solved by correcting code)
app.use('/api/schedule', scheduleRoute)
app.use('/api/review', reviewRoute)
app.use('/api/Evaluation', EvaluationRoute)
app.use('/api/application', applicationRoute)
app.use('/api/message', messageRoute)
app.use('/api/user', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/skills', skillsRoute)
app.use('/search', searchRoute)
app.use('/api', requestRoute)

io.on('connection', () => {
  console.log('Connected...')
})
// 404 & 500 Error handlers  //Todo: handle errors in a different way
app.use((error, request, response, next) => {
  response.status(500).send('500: Internal Server Error')
})

// Connect to mongo
mongoose
  .connect(uri, {
    useNewUrlParser: true,
      autoIndex: false 
  })
  .then(() => {
    console.log('Connected to MongoDB')
    http.listen(PORT, () => {
      console.log('Application listening to port: ' + PORT)
    })
  })
  .catch(err => console.log(err))
