const mongoose = require('mongoose')

const Booking = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please enter your name"]
    },
    email: {
        type:String,
        required: [true, "Please enter the email"]
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model("bookingRegistration", Booking)