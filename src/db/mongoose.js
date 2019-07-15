const mongoose = require('mongoose')
const City = require('./model/city')
const Center = require('./model/center')

mongoose.connect('mongodb://127.0.0.1:27017/zomfit', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const getAllCities = () => {
    return new Promise((res, rej) => {
        City.find({}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

const getAllCenters = () => {
    return new Promise((res, rej) => {
        Center.find({}).then((result) => {
            res(result)
        }).catch((error) => {
            rej(error)
        })
    }) 
}

module.exports = {
    getAllCities: getAllCities,
    getAllCenters: getAllCenters
}