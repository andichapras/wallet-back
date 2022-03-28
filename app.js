const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoute = require('./routes/user-route')
const transaksiRoute = require('./routes/transaksi-route')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRoute)
app.use('/transaksi', transaksiRoute)

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'an unknown error occured'})
})

mongoose
    .connect('mongodb+srv://belajar:senyuman25@mern.tr8rx.mongodb.net/wallet?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT)
    })
    .catch(err => {
        console.log(err)
    })