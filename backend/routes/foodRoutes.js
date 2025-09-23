// backend/routes/foodRoutes.js

import express from 'express';
import Food from '../models/food.js';
import Patient from '../models/patient.js'; // Import the Patient model

const router = express.Router();

router.post('/generate-diet', async (req, res) => {
    try {
        const { dominantDosha, regionalCuisine } = req.body;

        if (!dominantDosha) {
            return res.status(400).json({ error: 'dominantDosha is required to generate a diet plan.' });
        }

        // Corrected query to match your database schema
        const query = {
            [`dosha_impact.${dominantDosha.toLowerCase()}`]: 'pacifying'
        };

        if (regionalCuisine && regionalCuisine !== 'Any') {
            query.regionalCuisine = { $regex: new RegExp(regionalCuisine, 'i') };
        }

        const foods = await Food.find(query);

        if (foods.length === 0) {
            return res.status(404).json({ message: 'No foods found that match the criteria. Please try different options.' });
        }

        const allFoodsGrouped = {
            Breakfast: foods.filter(food => food.meal_type === 'Breakfast'),
            Lunch: foods.filter(food => food.meal_type === 'Lunch'),
            Dinner: foods.filter(food => food.meal_type === 'Dinner'),
        };

        res.json(allFoodsGrouped);

    } catch (err) {
        console.error("Error generating diet:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-diet-chart', async (req, res) => {
    try {
        const { patientId, dietPlan } = req.body;

        if (!patientId || !dietPlan) {
            return res.status(400).json({ error: 'Patient ID and diet plan are required.' });
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        // Add the new diet plan to the patient's dietCharts array
        patient.dietCharts.push({
            date: new Date(),
            plan: dietPlan
        });

        await patient.save();

        res.status(200).json({ message: 'Diet chart saved successfully.', patient });

    } catch (err) {
        console.error("Error saving diet chart:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;