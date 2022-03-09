const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Doctor = require('../../models/doctor')
const checkAuth = require('../middleware/check-auth')


module.exports = router

//Listing all doctors
router.get('/', async (req,res)=> {
try{
    const doctors = await Doctor.find()
    res.json(doctors)
} catch(err){
 res.status(500).json({message: err.message})
}

})

//Listing a doctor
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

//Listing a doctor's slots
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

//Creating a doctor account
router.post('/', checkAuth, async (req,res)=> {
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

//Updating a doctor
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

//Deleting a doctor
router.delete('/:doctorId', checkAuth, getDoctor, (req,res)=> {
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