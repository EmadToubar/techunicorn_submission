const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const {authUser} = require('../middleware/roleAuth')

const Appointment = require('../../models/appointment');
const Doctor = require("../../models/doctor")

router.get('/', checkAuth, authUser(['ADMIN']),(req,res,next) => {
    Appointment
    .find()
    .select('doctor patient date duration _id')
    .populate('doctor', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            appointments: docs.map(doc => {
                return {
                    _id: doc._id,
                    doctor: doc.doctor,
                    patient: doc.patient,
                    date: doc.date,
                    duration: doc.duration,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/appointments/' + doc._id
                    }
                }
            }),
           
        }
        );
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})



//Patient search 
router.get('/patient/:patientName', (req,res,next) => {
    Appointment
    .find()
    .select('doctor patient date duration _id')
    .populate('doctor', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            appointments: docs.map(
                doc => {
                if(doc.patient === req.params.patientName){
                return {
                    _id: doc._id,
                    doctor: doc.doctor,
                    patient: doc.patient,
                    date: doc.date,
                    duration: doc.duration,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/appointments/' + doc._id
                    }
                }
                
                }
                else{
                    return{
                }}
            }),
           
        }
        );
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

router.post('/', checkAuth, authUser(['CLIENT']), (req,res,next) => {
    Doctor.findById(req.body.doctorId)
    .then(doctor => {
        const appointment = new Appointment({
            _id: mongoose.Types.ObjectId(),
            doctor: req.body.doctorId,
            patient: req.body.patient,
            date: req.body.date,
            duration: req.body.duration
            
        });
        if(appointment.duration > 120){
            res.status(401).json({
                "message": "Duration limit exceeded"
            })
        }
        else{
        return appointment
        .save()
        }
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Appointment created',
            createdAppointment:{
                _id: result._id,
                doctor: result.doctor,
                patient: result.patient,
                date: req.body.date,
                duration: req.body.duration
            },
            request:{
                type:'GET',
                url: 'http://localhost:3000/appointments/' + result._id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
   
    
    

});

router.get('/:appointmentId', checkAuth, (req,res,next) => {
Appointment.findById(req.params.appointmentId)
.exec()
.then(appointment => {
    if(!appointment){
        return res.status(404).json({
            message: "Appointment not found"
        })
    }
    res.status(200).json({
        appointment: appointment,
        request:{
            type:'GET',
            url: 'http://localhost:3000/appointments'
        }
    })
})
.catch(err =>{
    res.status(500).json({
        error: err
    })
});
})


router.delete('/:appointmentId', checkAuth, (req,res,next) => {
    Appointment.remove({_id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Appointment cancelled',
            request:{
                type: "GET",
                url: "http://localhost:3000/appointments",
                body: {appointmentId: 'ID' }
            }
        })
    })
    .catch();
})

module.exports = router