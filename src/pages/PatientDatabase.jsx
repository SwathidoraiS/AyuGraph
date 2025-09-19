
import { useState } from "react";

export default function PatientProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    healthConditions: "",
    allergies: "",
    dietaryPreference: "",
    foodLikes: "",
    foodDislikes: "",
    regionalCuisine: "",
    lifestyle: "",
    exercise: "",
    // New fields
    medications: "",
    sleepPattern: "",
    appetiteDigestion: "",
    bowelHabits: "",
    energyLevels: "",
    stressLevels: "",
    bodyFrame: "",
    skinType: "",
    hairType: "",
    pulseType: "",
    memory: "",
    decisionMaking: "",
    preferredTastes: "",
    cravings: "",
    foodIntolerances: "",
    waterIntake: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "patientProfiles"), formData);
      alert("Patient profile saved to Firebase!");
      setFormData({}); // clear form after save
    } catch (err) {
      console.error("Error saving profile: ", err);
      alert("Error saving profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-yellow-50 to-green-50 p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6">Patient Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Basic Info */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Existing sections */}
        <textarea
          name="healthConditions"
          placeholder="Current Health Conditions"
          value={formData.healthConditions}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <textarea
          name="allergies"
          placeholder="Allergies or Food Intolerances"
          value={formData.allergies}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <input
          type="text"
          name="dietaryPreference"
          placeholder="Dietary Preference"
          value={formData.dietaryPreference}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="foodLikes"
          placeholder="Food Likes"
          value={formData.foodLikes}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="foodDislikes"
          placeholder="Food Dislikes"
          value={formData.foodDislikes}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="regionalCuisine"
          placeholder="Regional Cuisine"
          value={formData.regionalCuisine}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="lifestyle"
          placeholder="Lifestyle"
          value={formData.lifestyle}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="exercise"
          placeholder="Exercise type & frequency"
          value={formData.exercise}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* New fields */}
        <textarea
          name="medications"
          placeholder="Current Medications"
          value={formData.medications}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <input
          type="text"
          name="sleepPattern"
          placeholder="Sleep Pattern"
          value={formData.sleepPattern}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="appetiteDigestion"
          placeholder="Appetite & Digestion"
          value={formData.appetiteDigestion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="bowelHabits"
          placeholder="Bowel Habits"
          value={formData.bowelHabits}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="energyLevels"
          placeholder="Energy Levels"
          value={formData.energyLevels}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="stressLevels"
          placeholder="Stress Levels"
          value={formData.stressLevels}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="bodyFrame"
          placeholder="Body Frame"
          value={formData.bodyFrame}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="skinType"
          placeholder="Skin Type"
          value={formData.skinType}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="hairType"
          placeholder="Hair Type"
          value={formData.hairType}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="pulseType"
          placeholder="Pulse Type"
          value={formData.pulseType}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="memory"
          placeholder="Memory"
          value={formData.memory}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="decisionMaking"
          placeholder="Decision Making Style"
          value={formData.decisionMaking}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="preferredTastes"
          placeholder="Preferred Tastes"
          value={formData.preferredTastes}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="cravings"
          placeholder="Cravings"
          value={formData.cravings}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="foodIntolerances"
          placeholder="Food Intolerances"
          value={formData.foodIntolerances}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="waterIntake"
          placeholder="Daily Water Intake (glasses/litres)"
          value={formData.waterIntake}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-green-700 text-white rounded p-3 mt-4 hover:bg-green-800"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
