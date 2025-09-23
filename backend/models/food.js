import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
  food_name: String,
  category: String,
  meal_type: String,
  tastes: String,
  properties: String,
  virya: String,
  vipaka: String,
  dosha_impact: {
    vata: String,
    pitta: String,
    kapha: String,
  },
  allergens: String,
  dietary_restrictions: String,
  regionalCuisine: String,
  prep_method: String,
});

export default mongoose.model('Food', FoodSchema, 'dietData');