const express = require('express')
const mongoose = require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.get('/getAllCities', (req, res) => {
    mongoose.getAllCities().then((result) => {
        res.send(result)
    }).catch((result) => {
        res.send('An Error occured!')
    })
})

app.get('/getAllCenters', (req, res) => {
    mongoose.getAllCenters().then((result) => {
        res.send(result)
    }).catch((result) => {
        res.send('An Error occured!')
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})