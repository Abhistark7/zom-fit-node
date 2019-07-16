const express = require('express')
const mongoose = require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

// used to parse incoming request to json
app.use(express.json())

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

app.post('/signUp', (req, res) => {
    console.log('Saving new user... ', req.body)
    mongoose.createUser(req.body).then((result) => {
        res.send({
            status: true,
            message: 'User sign up complete'
        })
    }).catch((eroor) => {
        res.send({
            status: false,
            message: 'User sign up failed!'
        })
    })
})

app.post('/login', (req, res) => {
    console.log('Logging in...', req.body.email)
    mongoose.login(req.body.email, req.body.password).then((result) => {
        res.send({
            status: true,
            message: 'Login Successful',
            user: result[0]
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: error,
            user: {}
        })
    })
})

app.post('/getCentersById', (req, res) => {
    console.log('Fetching centers by city id... ', req.body.centerIdList)
    mongoose.getCentersByIds(req.body.centerIdList).then((result) => {
        res.send({
            status: true,
            message: 'Success',
            centerList: result
            })
        }).catch((error) => {
            res.send({
            status: false,
            message: error,
            centerList: []
        })
    })
})

app.post('/getActivitiesById', (req, res) => {
    console.log('Fetching activities... ', req.body.activityIdList)
    mongoose.getActivityByIds(req.body.activityIdList).then((result) => {
        res.send({
            status: true,
            message: 'Success',
            activityList: result
            })
        }).catch((error) => {
            res.send({
            status: false,
            message: error,
            activityList: []
        })
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
