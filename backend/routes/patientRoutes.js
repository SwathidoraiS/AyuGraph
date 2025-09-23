import express from 'express';
import Patient from '../models/Patient.js';
import { calculateDoshaScores } from '../utils/doshaCalculator.js'; 

const router = express.Router();

// GET all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new patient
router.post('/', async (req, res) => {
    try {
        const patientData = req.body;
        // Optional: Calculate dosha scores before saving
        const doshaScores = calculateDoshaScores(patientData);
        const newPatient = new Patient({ ...patientData, ...doshaScores });
        await newPatient.save();
        res.status(201).json({ message: "Patient profile saved successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (update) a patient by ID
// PUT (update) a patient by ID
router.put('/:id', async (req, res) => {
    console.log(`PUT request received for patient ID: ${req.params.id}`);
    console.log('Received data:', req.body);
    try {
        const patientData = req.body;
        // Recalculate scores on update
        const doshaScores = calculateDoshaScores(patientData); 
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { ...patientData, ...doshaScores },
            { new: true, runValidators: true } // Returns the updated document and runs schema validators
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(updatedPatient);
    } catch (err) {
        console.error("Error updating patient:", err);
        res.status(500).json({ message: err.message });
    }
});

// DELETE a patient by ID
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;