const mongoose = require('mongoose')

const City = mongoose.model('city', {
    cityId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    centerIdList: {
        type: [{type: String}]
    },
    imageUrl: {
        type: String,
        trim: true
    }
})

module.exports = City