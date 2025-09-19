export default function WeeklyDietPlan({ dietPlan }) {
  const days = Object.keys(dietPlan);
  const times = ["Morning", "Afternoon", "Evening", "Night"];
  const colors = {
    Morning: "bg-yellow-100",
    Afternoon: "bg-green-100",
    Evening: "bg-orange-100",
    Night: "bg-blue-100",
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
      <h2 className="font-semibold text-green-700 mb-3">🌿 Weekly Diet Plan</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-green-200">
            <th className="border px-2 py-1">Time / Day</th>
            {days.map(day => (
              <th key={day} className="border px-2 py-1">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(time => (
            <tr key={time}>
              <td className={`border px-2 py-1 font-semibold ${colors[time]}`}>{time}</td>
              {days.map(day => (
                <td key={day} className="border px-2 py-1">{dietPlan[day][time]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
