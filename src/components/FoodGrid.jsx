import React, { useState } from "react";

const FoodCard = ({ food }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition-shadow duration-300">
    <div className="flex items-center mb-2">
      <div className="text-xl font-semibold text-green-800">{food.name}</div>
      <div className="ml-auto flex items-center text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z"
          />
        </svg>
        {food.category}
      </div>
    </div>

    <p className="text-gray-700 text-sm mb-4">{food.description}</p>

    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
      <div>
        <span className="font-medium">Calories:</span> {food.calories}
      </div>
      <div>
        <span className="font-medium">Rasa:</span> {food.rasa}
      </div>
      <div>
        <span className="font-medium">Virya:</span> {food.virya}
      </div>
      <div>
        <span className="font-medium">Vipaka:</span> {food.vipaka}
      </div>
      <div className="col-span-2">
        <span className="font-medium">Dosha Effect:</span> {food.doshaEffect}
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {food.tags.map((tag, idx) => (
        <span
          key={idx}
          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex justify-center">
      <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
        View Details
      </button>
    </div>
  </div>
);

const FoodGrid = () => {
  const [foods, setFoods] = useState([
    {
      name: "Basmati Rice",
      category: "Grains",
      description: "Long-grain rice with cooling properties, ideal for Pitta constitution.",
      calories: "130 kcal",
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      doshaEffect: "Balances Pitta, Increases Vata",
      tags: ["Cooling", "Easy to digest", "Nourishing"],
    },
    {
      name: "Spinach",
      category: "Vegetables",
      description: "Leafy green that balances Pitta and Vata, rich in iron.",
      calories: "23 kcal",
      rasa: "Bitter",
      virya: "Cooling",
      vipaka: "Sweet",
      doshaEffect: "Balances Pitta and Vata",
      tags: ["Detoxifying", "Iron-rich", "Cooling"],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    category: "",
    description: "",
    calories: "",
    rasa: "",
    virya: "",
    vipaka: "",
    doshaEffect: "",
    tags: "",
  });

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    const foodToAdd = {
      ...newFood,
      tags: newFood.tags.split(",").map((t) => t.trim()),
    };
    setFoods([...foods, foodToAdd]);
    setNewFood({
      name: "",
      category: "",
      description: "",
      calories: "",
      rasa: "",
      virya: "",
      vipaka: "",
      doshaEffect: "",
      tags: "",
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {/* Add Food Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          Add New Food
        </button>
      </div>

      {/* Food Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Food</h2>
            <form onSubmit={handleAddFood} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Food Name"
                value={newFood.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newFood.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Short Description"
                value={newFood.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="calories"
                placeholder="Calories"
                value={newFood.calories}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="rasa"
                placeholder="Rasa"
                value={newFood.rasa}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="virya"
                placeholder="Virya"
                value={newFood.virya}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="vipaka"
                placeholder="Vipaka"
                value={newFood.vipaka}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="doshaEffect"
                placeholder="Dosha Effect"
                value={newFood.doshaEffect}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="tags"
                placeholder="Properties / Tags (comma separated)"
                value={newFood.tags}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Add Food
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food, idx) => (
          <FoodCard key={idx} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodGrid;
