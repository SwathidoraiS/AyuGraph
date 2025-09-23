import { useState } from "react";

export default function PatientDatabase() {
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

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save patient profile.");
      }

      const data = await response.json();
      console.log("Patient saved successfully:", data);
      setMessage("Patient profile saved successfully!");
      setIsSuccess(true);
      setFormData({
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
    } catch (err) {
      console.error("Error saving profile:", err);
      setMessage(`Error: ${err.message}`);
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-yellow-50 to-green-50 p-6 max-w-6xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-800">
        Patient Profile Form
      </h2>

      {message && (
        <div
          className={`p-4 rounded-md mb-4 text-center text-white ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Patient Info */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="bodyFrame"
              placeholder="Body Frame"
              value={formData.bodyFrame}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Health Details */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            Health Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              name="healthConditions"
              placeholder="Current Health Conditions"
              value={formData.healthConditions}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 col-span-2"
            />
            <textarea
              name="medications"
              placeholder="Current Medications"
              value={formData.medications}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 col-span-2"
            />
            <input
              type="text"
              name="allergies"
              placeholder="Allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 col-span-2"
            />
            <input
              type="text"
              name="foodIntolerances"
              placeholder="Food Intolerances"
              value={formData.foodIntolerances}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="sleepPattern"
              placeholder="Sleep Pattern"
              value={formData.sleepPattern}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="appetiteDigestion"
              placeholder="Appetite & Digestion"
              value={formData.appetiteDigestion}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="bowelHabits"
              placeholder="Bowel Habits"
              value={formData.bowelHabits}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="energyLevels"
              placeholder="Energy Levels"
              value={formData.energyLevels}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="stressLevels"
              placeholder="Stress Levels"
              value={formData.stressLevels}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Dietary & Lifestyle */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            Dietary & Lifestyle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="dietaryPreference"
              placeholder="Dietary Preference"
              value={formData.dietaryPreference}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="foodLikes"
              placeholder="Food Likes"
              value={formData.foodLikes}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="foodDislikes"
              placeholder="Food Dislikes"
              value={formData.foodDislikes}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="regionalCuisine"
              placeholder="Regional Cuisine"
              value={formData.regionalCuisine}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="lifestyle"
              placeholder="Lifestyle"
              value={formData.lifestyle}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="exercise"
              placeholder="Exercise type & frequency"
              value={formData.exercise}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="waterIntake"
              placeholder="Daily Water Intake"
              value={formData.waterIntake}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="preferredTastes"
              placeholder="Preferred Tastes"
              value={formData.preferredTastes}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="cravings"
              placeholder="Cravings"
              value={formData.cravings}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Holistic Details */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            Holistic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="skinType"
              placeholder="Skin Type"
              value={formData.skinType}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="hairType"
              placeholder="Hair Type"
              value={formData.hairType}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="pulseType"
              placeholder="Pulse Type"
              value={formData.pulseType}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="memory"
              placeholder="Memory"
              value={formData.memory}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="decisionMaking"
              placeholder="Decision Making Style"
              value={formData.decisionMaking}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-green-700 text-white rounded-md p-3 mt-6 hover:bg-green-800 transition duration-300 ease-in-out font-semibold shadow-lg"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
