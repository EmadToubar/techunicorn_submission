const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true
    },

    patient:{type: String, required: true},

    date: {
        type: Date, required: true
    },

    duration:{
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('Appointment', appointmentSchema)