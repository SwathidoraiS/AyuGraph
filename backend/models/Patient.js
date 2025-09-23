// backend/models/patient.js

import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: String },
  weight: { type: String },
  healthConditions: { type: String },
  allergies: { type: String },
  dietaryPreference: { type: String },
  foodLikes: { type: String },
  foodDislikes: { type: String },
  regionalCuisine: { type: String },
  lifestyle: { type: String },
  exercise: { type: String },
  medications: { type: String },
  sleepPattern: { type: String },
  appetiteDigestion: { type: String },
  bowelHabits: { type: String },
  energyLevels: { type: String },
  stressLevels: { type: String },
  bodyFrame: { type: String },
  skinType: { type: String },
  hairType: { type: String },
  pulseType: { type: String },
  memory: { type: String },
  decisionMaking: { type: String },
  preferredTastes: { type: String },
  cravings: { type: String },
  foodIntolerances: { type: String },
  waterIntake: { type: String },
  vataScore: { type: Number, default: 0 },
  pittaScore: { type: Number, default: 0 },
  kaphaScore: { type: Number, default: 0 },
  dietCharts: [
    {
      date: { type: Date, default: Date.now },
      plan: { type: Object, required: true },
    },
  ],
});

// The fix is here: Check if the model already exists before defining it.
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default Patient;