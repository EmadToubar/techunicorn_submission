const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    
    appointments: {
       type: Date,
       required: true,
       default: Date.now 
    },

    slots:{
        type: Array,
        required: true
    }

})

module.exports = mongoose.model('Doctor', doctorSchema)