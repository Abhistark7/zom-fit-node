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
        trim: true,
        default: '0.0'
    },
    iconUrl: {
        type: String,
        trim: true,
        default: 'https://image.flaticon.com/icons/svg/55/55240.svg'
    },
    totalSlots: {
        type: Number,
        default: 0
    },
    bookedSlots: {
        type: Number,
        default: 0
    },
    timinglist: [{
        id: String,
        time: String,
        date: String,
        maxCount: Number,
        bookedCount: Number,
        isAvailable: Boolean
    }],
    likedUserIds: {
        type: [{type: String}]
    },
})

module.exports = Activity