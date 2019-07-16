const mongoose = require('mongoose')
const City = require('./model/city')
const Center = require('./model/center')
const User = require('./model/user')
const Activity = require('./model/activity')
const Booking = require('./model/booking')

mongoose.connect('mongodb://127.0.0.1:27017/zomfit', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const getAllCities = () => {
    return new Promise((res, rej) => {
        City.find({}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const getAllCenters = () => {
    return new Promise((res, rej) => {
        Center.find({}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const createUser = (user) => {
    const newUser = new User({
        name: user.name,
        address: user.address,
        email: user.email,
        password: user.password,
        savedAddressList: [],
        savedCenterIdList: [],
        likedActivitiesList: []
    })
    return new Promise((res, rej) => {
        newUser.save().then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    })
}

const login = (email, password) => {
    return new Promise((res, rej) => {
        User.find({email, password}).then((result) => {
                if(result.length !== 0) {
                        res(result)
                } else {
                    rej('Login Unsuccessful')
                }
            })
    })
}

const fetchUserById = (userId) => {
    User.findOne({__id: new ObjectId(userId)}).then((result) => {
        return new Promise((res, rej) => {
            if(result.length !== 0) {
                return res(result)
            } else {
                return rej(undefined)
            }
        })
    })
}

const getCentersByIds = (centerIdArray) => {
    return new Promise((res, rej) => {
        Center.find({centerId : centerIdArray})
        .then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const getActivityByIds = (activityIdArray) => {
    return new Promise((res, rej) => {
        Activity.find({activityId: activityIdArray})
        .then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    })
}

const getCenterById = (id) => {
    return new Promise((res, rej) => {
        Center.find({centerId: id}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const newBooking = (userId, time, date, centerName, centerImageUrl, activityName, activityIconUrl, cityName) => {
    return new Promise((res, rej) => {
        const booking = new Booking({
            userId,
            time,
            centerName,
            centerImageUrl,
            cityName,
            date,
            activityName,
            activityIconUrl
        })
        booking.save().then((result) => {
            res('Success')
        }).catch((error) => {
            rej('An error occurred')
        })
    })
}

module.exports = {
    getAllCities: getAllCities,
    getAllCenters: getAllCenters,
    createUser: createUser,
    login: login,
    getCentersByIds: getCentersByIds,
    getCenterById: getCenterById,
    getActivityByIds: getActivityByIds,
    newBooking: newBooking
}