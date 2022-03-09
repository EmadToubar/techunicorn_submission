const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Doctor = require('../../models/doctor')
const checkAuth = require('../middleware/check-auth')
const {authUser} = require('../middleware/roleAuth')


module.exports = router

//Route to list all doctors
router.get('/', async (req,res)=> {
try{
    const doctors = await Doctor.find()
    res.json(doctors)
} catch(err){
 res.status(500).json({message: err.message})
}

})

//Route to list a specific doctor using their ID
router.get('/:doctorId', getDoctor, (req,res)=> {
    const id = req.params.doctorId;
    Doctor.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
})

//Route to list a doctor's time slots
router.get('/:doctorId/slots', getDoctor, (req,res)=> {
    const id = req.params.doctorId;
    Doctor.findById(id)
    .exec()
    .then(doc => {
        console.log(doc.slots);
        res.status(200).json(doc.slots);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
})

//Route to create a doctor in the database (Only authorized to clinic admin)
router.post('/', checkAuth, authUser(['ADMIN']), async (req,res)=> {
    const doctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        appointments: req.body.appointments,
        slots: req.body.slots
    })

    try{
        const newDoctor = await doctor.save()
        res.status(201).json(newDoctor)

    } catch(err){
        res.status(400).json({message: err.message})
    }
    
})

//Route to update doctor details
router.patch('/:doctorId', checkAuth, getDoctor, (req,res)=> {
    const id = req.params.doctorId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    Doctor.update({doctorId},{ $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
})

//Route to delete a doctor from the database using their ID (Only authorized to admin)
router.delete('/:doctorId', checkAuth, authUser(['ADMIN']), getDoctor, (req,res)=> {
    const id = req.params.doctorId
    Doctor.remove({doctorId})
    .exec()
    .then(res => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    
})

//Function that obtains doctor object
async function getDoctor(req, res, next){
let doctor
    try{
doctor = await Doctor.findById(req.params.doctorId)
if(doctor == null){
    return res.status(404).json({message:'Cannot find doctor'})
}
} catch(err){
 return res.status(500).json({message: err.message})
}
res.doctor = doctor
next()
}

module.exports = router;