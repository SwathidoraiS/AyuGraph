// backend/routes/foodRoutes.js

import express from 'express';
import Food from '../models/food.js';

const router = express.Router();

// Endpoint to fetch ALL food data
router.get('/', async (req, res) => {
    try {
        const foodItems = await Food.find();
        res.status(200).json(foodItems);
    } catch (err) {
        console.error("Error fetching all food data:", err);
        res.status(500).json({ message: "Failed to fetch all food data." });
    }
});

// Endpoint to generate a diet plan based on patient data
router.post('/generate-diet', async (req, res) => {
    try {
        const { dominantDosha, regionalCuisine } = req.body;

        if (!dominantDosha) {
            return res.status(400).json({ error: 'dominantDosha is required to generate a diet plan.' });
        }

        // The query is updated to match your database structure
        const query = {
            [`dosha_impact.${dominantDosha.toLowerCase()}`]: 'reduces'
        };

        // If a regional cuisine is provided, add it to the query using your field name
        if (regionalCuisine && regionalCuisine !== 'Any') {
            query.cuisine_type = { $regex: new RegExp(regionalCuisine, 'i') };
        }

        const foods = await Food.find(query);

        if (foods.length === 0) {
            return res.status(404).json({ message: 'No foods found that match the criteria. Please try different options.' });
        }

        // Group foods by meal type to create the diet plan
        const dietPlan = {
            Breakfast: foods.filter(food => food.meal_type === 'Breakfast'),
            Lunch: foods.filter(food => food.meal_type === 'Lunch'),
            Dinner: foods.filter(food => food.meal_type === 'Dinner'),
        };

        res.json(dietPlan);

    } catch (err) {
        console.error("Error generating diet:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;