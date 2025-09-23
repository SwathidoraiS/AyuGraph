// New file: FoodList.jsx

import React from 'react';

export default function FoodList({ allFoods }) {
    const mealTypes = Object.keys(allFoods);
    const colors = {
        Breakfast: "bg-yellow-100",
        Lunch: "bg-green-100",
        Dinner: "bg-orange-100",
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-md p-4 mt-4">
            <h2 className="font-semibold text-green-700 mb-3">🌿 All Recommended Foods</h2>
            <table className="min-w-full border">
                <thead>
                    <tr className="bg-green-200">
                        <th className="border px-2 py-1">Meal Type</th>
                        <th className="border px-2 py-1">Food Items</th>
                    </tr>
                </thead>
                <tbody>
                    {mealTypes.map(mealType => (
                        <tr key={mealType}>
                            <td className={`border px-2 py-1 font-semibold ${colors[mealType]}`}>
                                {mealType}
                            </td>
                            <td className="border px-2 py-1">
                                {allFoods[mealType] && allFoods[mealType].length > 0 ? (
                                    <ul>
                                        {allFoods[mealType].map((food, index) => (
                                            <li key={index}>{food.food_name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No foods found for this meal.</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}