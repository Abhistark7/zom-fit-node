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

const getAllActivities = () => {
    return new Promise((res, rej) => {
        Activity.find({}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const getTrendingActivities = () => {
    return new Promise((res, rej) => {
        Activity.find({}).then((result) => {
            result.sort((a, b) => (a.bookedCount > b.bookedCount) ? -1 : 1)
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const getTrendingCenters = () => {
    return new Promise((res, rej) => {
        Center.find({}).then((result) => {
            res(result.sort((a, b) => (a.currentBookingCount > b.currentBookingCount) ? -1 : 1))
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

const newBooking = (userId, time, centerName, centerImageUrl, cityName, date, activityName, activityIconUrl, activityId, timingId, centerId) => {
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
        updateBookingCount(activityId, timingId, centerId).then((result) => {
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

const updateBookingCount = (activityId, timingId, centerId) => {
    return new Promise((res, rej) => {
        Activity.find({activityId : activityId}).then((result) => {
            timingId--
            timingList = result[0].timinglist
            newBookedCount = result[0].bookedSlots
            if(timingList[timingId].maxCount > timingList[timingId].bookedCount) {
                timingList[timingId].bookedCount++
                newBookedCount++
                Activity.update({activityId}, {
                    '$set': {
                        timinglist: timingList,
                        bookedSlots : newBookedCount
                    }
                }).then((result) => {
                    Center.update({centerId}, {
                        '$inc' : {
                            currentBookingCount: 1
                        }
                    }).then((re) => {
                        res(result)
                    }).catch((error) => {
                        rej(error)
                    })
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

const addCity = (cityName, cityImageUrl) => {
    return new Promise((res, rej) => {
        doesCityExists(cityName).then((result) => {
            var newCity
            if(cityImageUrl) {
                    newCity = new City({
                    cityId: generateRandomID(20),
                    name: cityName,
                    imageUrl: cityImageUrl
                })
            } else {
                    newCity = new City({
                    cityId: generateRandomID(20),
                    name: cityName
                })
            }
            newCity.save().then((result) => {
                res(result)
            }).catch((error) => {
                rej(error)
            })
        }).catch((error) => {
            rej('City already exists, please another one!')
        })
    })
}

const addCenter = (centerName, cityName, centerImageUrl) => {
    return new Promise((res, rej) => {
        var newCenter
        doesCenterExists(centerName, cityName).then((result) => {
            newCenterId = generateRandomID(20)
            if(centerImageUrl) {
                newCenter = new Center({
                centerId: generateRandomID(20),
                name: centerName,
                cityName,
                imageUrl: centerImageUrl
                })
            } else {
                newCenter = new Center({
                centerId: newCenterId,
                name: centerName,
                cityName,
                })
            }
            addCenterIdToCity(cityName, newCenterId).then((re) => {
                newCenter.save().then((result) => {
                    res(result)
                }).catch((error) => {
                    rej(error)
                })
            }).catch((er) => {
                rej(er)
            })
        }).catch((error) => {
            rej('Center with name - ' + centerName + ' already exists in the selected city')
        })
    })
}

const addCenterIdToCity = (cityName, newCenterId) => {
    return new Promise((res, rej) => {
        City.update({name: cityName}, {
            $push: {
                centerIdList: newCenterId
            }
        }).then((result) => {
            res()
        }).catch((error) => {
            rej()
        })
    })
}

const doesCenterExists = (centerName, cityName) => {
    return new Promise((res, rej) => {
        City.findOne({name: cityName}).then((result) => {
            listOfCenterIds = result.centerIdList
            doesCenterNameExists(listOfCenterIds, centerName).then((result) => {
                res()
            }).catch((error) => {
                rej(error)
            })
        }).catch((error) => {
            rej()
        })
    })
}

const doesCenterNameExists = (listOfCenterIds, centerName) => {
    return new Promise((res, rej) => {
        Center.find({
            centerId: {
                $in: listOfCenterIds
            }
        }).then((result) => {
            if(result.length != 0) {
                result.forEach(element => {
                    if(element.name === centerName) {
                        rej('Center already present')
                    } 
                })
                res()
            } else {
                res()
            }
        }).catch((error) => {
            res(error)
        })
    })
}

const doesCityExists = (cityName) => {
    return new Promise((res, rej) => {
        City.find({name: cityName}).then((result) => {
            if(result.length == 0) {
                res()
            } else {
                rej()
            }
        }).catch((error) => {
            rej(error)
        })
    })
}

const addActivity = (activityName, cost, iconUrl, timingList, centerName) => {
    return new Promise((res, rej) => {
        doesActivityExists(activityName).then((res, rej) => {
            var newActivityId = generateRandomID(20)
            const newActivity = new Activity({
                activityId: newActivityId,
                name: activityName,
                cost,
                iconUrl,
                totalSlots: 150,
                timingList: timingList
            })
            addActivityToCenter(newActivityId, centerName).then((result) => {
                newActivity.save().then((res) => {
                    res()
                }).catch((err) => {
                    rej()
                })
            }).catch((error) => {
                rej()
            })
        }).catch((error) => {
            rej(error)
        })
    })
}

const doesActivityExists = (activityName) => {
    return new Promise((res, rej) => {
        Activity.find({name: activityName}).then((result) => {
            if(result.length == 0) {
                res()
            } else {
                rej('Activity already exists!')
            }
        }).catch((err) => {
            rej()
        })
    })
}

const addActivityToCenter = (activityId, centerName) => {
    return new Promise((res, rej) => {
        Center.update({name: centerName}, {
            $push: {
                activityIdList: activityId
            }
        }).then((result) => {
            res()
        }).catch((error) => {
            rej()
        })
    })
}

const generateRandomID = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    getAllCities: getAllCities,
    getAllCenters: getAllCenters,
    getAllActivities: getAllActivities,
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
    getLikedActivity: getLikedActivity,
    getTrendingActivities: getTrendingActivities,
    getTrendingCenters: getTrendingCenters,
    addCity: addCity,
    addCenter: addCenter,
    addActivity: addActivity
}