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
    activityIdList: {
        type: [{type: String}]
    },
    imageUrl: {
        type: String,
        trim: true
    }
})

module.exports = Center