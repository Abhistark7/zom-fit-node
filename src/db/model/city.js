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
        trim: true,
        default: 'https://www.telegraph.co.uk/content/dam/Travel/2018/October/melbourne-top.jpg?imwidth=450'
    }
})

module.exports = City