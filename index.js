"use strict";
const express = require('express');
const certificationRoute = require("./routes/certification")
const app = express();
app.use("/certification",certificationRoute)
app.use(express.static('public'));
let port =3000
app.listen(port,() => {
	console.log('Application is listening at port: '+ port);
});