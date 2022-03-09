require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     if(req,method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//         return res.status(200).json({})
//     }
//     next();
// })

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db= mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB Database'))

app.use(express.json())

const appointmentRouter = require('./api/routes/appointments')
app.use('/appointments', appointmentRouter)

const doctorRouter = require('./api/routes/doctors')
app.use('/doctors', doctorRouter)

const userRouter = require('./api/routes/user')
app.use('/user', userRouter)

module.exports = app;
