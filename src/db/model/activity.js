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
        trim: true,
        default: 'https://image.flaticon.com/icons/svg/55/55240.svg'
    },
    totalSlots: {
        type: Number
    },
    bookedSlots: {
        type: Number
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