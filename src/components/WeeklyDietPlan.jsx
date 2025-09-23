import React, { forwardRef } from 'react';

// Use forwardRef to pass the ref from the parent component
const WeeklyDietPlan = forwardRef(({ dietPlan, patientName }, ref) => {
    const mealTypes = Object.keys(dietPlan);
    
    const colors = {
        Breakfast: "bg-yellow-100",
        Lunch: "bg-green-100",
        Dinner: "bg-orange-100",
    };

    return (
        // Attach the forwarded ref to the root div of the component
        <div ref={ref} className="overflow-x-auto bg-white shadow-md rounded-md p-4">
            <h2 className="font-semibold text-green-700 mb-3">🌿 Diet Plan for {patientName}</h2>
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
                                {dietPlan[mealType] && dietPlan[mealType].length > 0 ? (
                                    <ul>
                                        {dietPlan[mealType].map((food, index) => (
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
});

export default WeeklyDietPlan;