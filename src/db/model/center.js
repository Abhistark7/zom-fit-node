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
        trim: true,
        default: "0.0"
    },
    activityIdList: {
        type: [{type: String}]
    },
    imageUrl: {
        type: String,
        trim: true,
        default: 'https://playo.imgix.net/PHOENIXSPORTS/PhoenixSportsHyderabad48.jpg?auto=compress,format&h=250'
    },
    likedUserIds: {
        type: [{type: String}]
    },
    currentBookingCount: {
        type: Number,
        default: 0
    }
})

module.exports = Center