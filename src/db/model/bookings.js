const mongoose = require('mongoose')

const Booking = mongoose.model('booking', {
    bookingId: {
        type: String,
        required: true,
        trim: true
    },
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
        default: "UPCOMING"
    },
    activityId: {
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
    centerId: {
        type: String,
        trim: true
    },
    centerName: {
        type: String,
        trim: true
    },
    cityName: {
        type: String,
        trim: true
    }
})

module.exports = Booking