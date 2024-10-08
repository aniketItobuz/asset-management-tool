const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()


mongoose.connect("mongodb+srv://aniket:Itobuz1234@test-pro-db.xpg1d.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db")

app.use(express.json())
app.use(cors());


const employeeRouter = require('./routes/employee/employees')
app.use('/employees', employeeRouter)

const hardwareRouter = require('./routes/hardware/hardwares')
app.use('/hardwares', hardwareRouter)

app.listen(3000, function(){
    console.log('Server started...');
} )





