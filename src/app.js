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

app.get('/getAllActivities', (req, res) => {
    mongoose.getAllActivities().then((result) => {
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

app.post('/bookActivity', (req, res) => {
    console.log('Booking now...')
    mongoose.newBooking(req.body.userId,
        req.body.time,
        req.body.centerName,
        req.body.centerImageUrl,
        req.body.cityName,
        req.body.date,
        req.body.activityName,
        req.body.activityIconUrl,
        req.body.activityId,
        req.body.timingId,
        req.body.centerId).then((result) => {
            res.send({
                status: true,
                message: result
            })
        }).catch((error) => {
            res.send({
                status: false,
                message: eroor
            })
        })
})

app.post('/getUpcomingBooking', (req, res) => {
    console.log('Getting upcoming booking...')
    mongoose.getUpcomingBooking(req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success',
            bookingList: result
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: 'An error occured',
            bookingList: []
        })
    })
})

app.post('/getCompletedBooking', (req, res) => {
    console.log('Getting upcoming booking...')
    mongoose.getCompletedBooking(req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success',
            bookingList: result
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: 'An error occured',
            bookingList: []
        })
    })
})

app.post('/likeActivity', (req, res) => {
    console.log('Liking activity with id ', req.body.activityId)
    mongoose.likeActivity(req.body.activityId, req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success'
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: error
        })
    })
})

app.post('/dislikeActivity', (req, res) => {
    console.log('Disliking activity with id ', req.body.activityId)
    mongoose.dislikeActivity(req.body.activityId, req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success'
        })
    }).catch((result) => {
        res.send({
            status: false,
            message: 'Failed'
        })
    })
})

app.post('/saveCenter', (req, res) => {
    console.log('Saving center with id ', req.body.centerId)
    mongoose.saveCenter(req.body.centerId, req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success'
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: error
        })
    })
})

app.post('/unsaveCenter', (req, res) => {
    console.log('Unsaving center with id', req.body.centerId)
    mongoose.unsaveCenter(req.body.centerId, req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success'
        })
    }).catch((result) => {
        res.send({
            status: false,
            message: 'Failed'
        })
    })
})

app.post('/getSavedCenter', (req, res) => {
    console.log('getting saved centers for user id ', req.body.userId)
    mongoose.getSavedCenters(req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success',
            savedCenterList: result
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: 'Failed',
            savedCenterList: []
        })
    })
})

app.post('/getLikedActivities', (req, res) => {
    console.log('getting liked for user id ', req.body.userId)
    mongoose.getLikedActivity(req.body.userId).then((result) => {
        res.send({
            status: true,
            message: 'Success',
            likedActivityList: result
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: 'Failed',
            likedActivityList: []
        })
    })
})

app.post('/adminLogin', (req, res) => {
    console.log('Admin Logging in...', req.body.email)
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

app.get('/getTrendingActivities', (req, res) => {
    mongoose.getTrendingActivities().then((result) => {
        res.send(result)
    }).catch((result) => {
        res.send('An Error occured!')
    })
})

app.get('/getTrendingCenters', (req, res) => {
    mongoose.getTrendingCenters().then((result) => {
        res.send(result)
    }).catch((result) => {
        res.send('An Error occured!')
    })
})

app.post('/addCity', (req, res) => {
    mongoose.addCity(req.body.cityName, req.body.cityImageUrl).then((result) => {
        res.send({
            status: true,
            message: 'City added!'
        })
    }).catch((error) => {   
        res.send({
            status: false,
            message: error
        })
    })
})

app.post('/addCenter', (req, res) => {
    console.log('Adding center...')
    mongoose.addCenter(req.body.centerName, req.body.cityName, req.body.centerImageUrl)
    .then((result) => {
        res.send({
            status: true,
            message: 'Success'
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: error
        })
    })
})

app.post('/addActivity', (req, res) => {
    console.log('Adding activity...')
    mongoose.addActivity(req.body.activityName, req.body.cost, req.body.activityIconUrl, req.body.timingList, req.body.centerName)
    .then((result) => {
        res.send({
            status: true,
            message: 'Success'
        })
    }).catch((error) => {
        res.send({
            status: false,
            message: error
        })
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
