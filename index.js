'use strict'

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

//Setup Views Directory, TODO: Assign view engine, Let html as DEF
app.set('views', './views')
app.set('view engine', 'html')

//Setup Static Directory
app.use(express.static('./public'))

//Setup Parser, Note: extended option is diabled to allow for array encoding
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//Setup routing directories/paths

//404 & 500 Error handlers
app.use((request, response, next) => {
    response.status(404).send("404: Page not found")
})

app.use((error, request, response, next) => {
    response.status(500).send("500: Internal Server Error")
})

app.listen(PORT, () => {
    console.log("Application listening to port: " + PORT)
})