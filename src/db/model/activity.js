const mongoose = require('mongoose')

const Activity = mongoose.model('activity', {
    activityId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    cost: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: String,
        trim: true
    },
    iconUrl: {
        type: String,
        required: true,
        trim: true,
    },
    timinglist: [{
        id: String,
        time: String,
        date: String,
        maxCount: Number,
        bookedCount: Number,
        isAvailable: Boolean
    }]
})

module.exports = Activity