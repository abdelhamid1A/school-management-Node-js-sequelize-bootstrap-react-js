const express = require('express')
const app = express()
require('dotenv').config()
const Sequelize = require('sequelize')
const db = require('./models')


const studentRout = require('./routes/students')
const profRout = require('./routes/professors')
const moduleRout = require('./routes/modules')
// const employeeRout = require('./routes/employeeRouts')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

db.sequelize.sync()
.then(()=>console.log('Connection has been established successfully.'))
.catch((error)=>console.error('Unable to connect to the database:', error))
// app.use('/',agentRout)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,auth-token"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "*"
    );
    next();
});
app.use('/student',studentRout)
app.use('/prof',profRout)
app.use('/module',moduleRout)

const port = process.env.PORT || 4000

app.listen(port,()=>console.log('server run port :'+port))
module.exports = app