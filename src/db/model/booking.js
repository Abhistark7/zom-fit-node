const mongoose = require('mongoose')

const Booking = mongoose.model('booking', {
    userId: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    }, 
    status: {
        type: String,
        required: true,
        trim: true,
        default: 'UPCOMING'
    },
    centerName: {
        type: String,
        trim: true
    },
    centerImageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    cityName: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    activityName: {
        type: String,
        trim: true
    },
    activityIconUrl: {
        type: String,
        trim: true
    },
    activityId: {
        type: String,
        trim: true
    },
    timingId: {
        type: String,
        trim: true
    }
})

module.exports = Booking