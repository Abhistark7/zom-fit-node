const mongoose = require('mongoose')

const Center = mongoose.model('center', {
    centerId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    cityName: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: String,
        trim: true
    },
    activityIdList: {
        type: [{type: String}]
    },
    imageUrl: {
        type: String,
        trim: true
    },
    likedUserIds: {
        type: [{type: String}]
    },
    currentBookingCount: {
        type: Number
    }
})

module.exports = Center