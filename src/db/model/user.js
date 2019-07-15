const validator = require('validator')
const mongoose = require('mongoose')

const User = mongoose.model('user', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: Array.String,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value === 'password') {
                throw new Error('Password should not be password, Duh!')
            }
        }
    },
    savedAddressList: {
        type: [{type: String}]
    },
    savedCenterIdList: {
        type: [{type: String}]
    },
    likedActivitiesList: {
        type: [{type: String}]
    },

})

module.exports = User