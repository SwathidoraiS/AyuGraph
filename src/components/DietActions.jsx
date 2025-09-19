export default function DietActions({ dietPlan, patient }) {
  return (
    <div className="flex space-x-4 mt-4">
      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">✅ Save Plan</button>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded">🖨 Download PDF</button>
      <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded">✏ Edit Plan</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">📤 Send to Dashboard</button>
    </div>
  );
}
