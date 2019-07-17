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

const newBooking = (userId, time, centerName, centerImageUrl, cityName, date, activityName, activityIconUrl, activityId, timingId) => {
    return new Promise((res, rej) => {
        const booking = new Booking({
            userId,
            time,
            centerName,
            centerImageUrl,
            cityName,
            date,
            activityName,
            activityIconUrl,
        })
        console.log('checking max count')
        updateBookingCount(activityId, timingId).then((result) => {
            booking.save().then((result) => {
                console.log('making booking')
                    res('Success')
            }).catch((error) => {
                rej('An error occurred')
            })
        }).catch((eroor) => {
            rej('Booking limit reached')
        })   
    })
}

const updateBookingCount = (activityId, timingId) => {
    return new Promise((res, rej) => {
        Activity.find({activityId : activityId}).then((result) => {
            timingId--
            timingList = result[0].timinglist
            if(timingList[timingId].maxCount > timingList[timingId].bookedCount) {
                timingList[timingId].bookedCount++
                Activity.update({activityId}, {
                    '$set': {
                        timinglist: timingList
                    }
                }).then((result) => {
                    res(result)
                }).catch((error) => {
                    rej(error)
                })
            }
            res(result)
        })
    })
}

const getUpcomingBooking = (userId) => {
    return new Promise((res, rej) => {
        Booking.find({userId: userId, status: 'UPCOMING'}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    })
    
}

const getCompletedBooking = (userId) => {
    return new Promise((res, rej) => {
        Booking.find({userId: userId, status: 'COMPLETED'}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    })
    
}

const likeActivity = (activityId, userId) => {
    return new Promise((res, rej) => {
        Activity.find({activityId}).then((re) => {
            likedUserlist = re[0].likedUserIds
            likedUserlist.push(userId)
            Activity.update({activityId}, {
                '$set' : {
                    likedUserIds: likedUserlist
                }
            }).then((result) => [
                res(result)
            ]).catch((error) => {
                rej(error)
            })
        }).catch((er) => {
            console.log(er)
        })
    })
}

const dislikeActivity = (activityId, userId) => {
    return new Promise((res, rej) => {
        Activity.find({activityId}).then((re) => {
            if(re.length != 0) {
            likedUserlist = re[0].likedUserIds.filter((e) => e !== userId)
            Activity.update({activityId}, {
                '$set' : {
                    likedUserIds: likedUserlist
                }
            }).then((result) => [
                res(result)
            ]).catch((error) => {
                rej(error)
            })
        }
        }).catch((er) => {
            console.log(er)
        })
    })
}

const saveCenter = (centerId, userId) => {
    return new Promise((res, rej) => {
        Center.find({centerId}).then((re) => {
            likedUserlist = re[0].likedUserIds
            likedUserlist.push(userId)
            Center.update({centerId}, {
                '$set' : {
                    likedUserIds: likedUserlist
                }
            }).then((result) => [
                res(result)
            ]).catch((error) => {
                rej(error)
            })
        }).catch((er) => {
            console.log(er)
        })
    })
}

const unsaveCenter = (centerId, userId) => {
    return new Promise((res, rej) => {
        Center.find({centerId}).then((re) => {
            if(re.length != 0) {
                likedUserlist = re[0].likedUserIds.filter((e) => e !== userId)
                Center.update({centerId}, {
                    '$set' : {
                        likedUserIds: likedUserlist
                    }
                }).then((result) => [
                    res(result)
                ]).catch((error) => {
                    rej(error)
                })
            }
        }).catch((er) => {
            console.log(er)
        })
    })
}

const getSavedCenters = (userId) => {
    return new Promise((res, rej) => {
        Center.find({likedUserIds: userId}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    })
}

const getLikedActivity = (userId) => {
    return new Promise((res, rej) => {
        Activity.find({likedUserIds: userId}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
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
    newBooking: newBooking,
    getUpcomingBooking: getUpcomingBooking,
    getCompletedBooking: getCompletedBooking,
    likeActivity: likeActivity,
    dislikeActivity: dislikeActivity,
    saveCenter: saveCenter,
    unsaveCenter: unsaveCenter,
    getSavedCenters: getSavedCenters,
    getLikedActivity: getLikedActivity
}