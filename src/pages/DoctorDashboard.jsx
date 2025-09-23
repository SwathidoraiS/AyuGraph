import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate(); // hook to navigate

  const doctor = {
    name: "Dr. Anjali Sharma",
    specialization: "Ayurvedic Dietitian",
    clinicHours: "9 AM - 5 PM",
  };

  const todayAppointments = [
    { time: "10:00 AM", patient: "Ravi Kumar", condition: "Pitta Imbalance" },
    { time: "12:00 PM", patient: "Meena Iyer", condition: "Diabetes Management" },
    { time: "3:00 PM", patient: "Suresh Nair", condition: "Weight Loss" },
  ];

  const recentActivity = [
    "Patient Riya uploaded progress report",
    "Patient Arjun requested diet clarification",
    "Patient Neha booked follow-up consultation",
  ];

  // Logout handler
  const handleLogout = () => {
    // Clear auth tokens or localStorage if any
    // localStorage.removeItem("authToken");
    navigate("/Login"); // redirect to login page
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            Welcome back, {doctor.name} 👋
          </h1>
          <p className="text-gray-600">
            {doctor.specialization} | Clinic Hours: {doctor.clinicHours}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Notification Bell */}
          <button className="relative p-3 rounded-full bg-green-50 hover:bg-green-100">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logout Button */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-green-50 rounded-xl shadow-md text-center">
          <div className="text-2xl">👥</div>
          <h2 className="text-xl font-semibold">120</h2>
          <p className="text-sm text-gray-600">Total Patients</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl shadow-md text-center">
          <div className="text-2xl">📅</div>
          <h2 className="text-xl font-semibold">5</h2>
          <p className="text-sm text-gray-600">Today’s Appointments</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl shadow-md text-center">
          <div className="text-2xl">💬</div>
          <h2 className="text-xl font-semibold">8</h2>
          <p className="text-sm text-gray-600">New Queries</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl shadow-md text-center">
          <div className="text-2xl">⏳</div>
          <h2 className="text-xl font-semibold">3</h2>
          <p className="text-sm text-gray-600">Pending Follow-ups</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-xl shadow hover:shadow-lg border text-green-700 font-medium">
          ➕ Add New Diet Plan
        </button>
        <button className="p-4 bg-white rounded-xl shadow hover:shadow-lg border text-green-700 font-medium">
          👥 View Patient List
        </button>
        <button className="p-4 bg-white rounded-xl shadow hover:shadow-lg border text-green-700 font-medium">
          📅 Schedule Consultation
        </button>
        <button className="p-4 bg-white rounded-xl shadow hover:shadow-lg border text-green-700 font-medium">
          💬 Check Messages
        </button>
      </div>

      {/* Today’s Schedule */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-green-700 mb-4">📌 Today’s Schedule</h2>
        <div className="space-y-3">
          {todayAppointments.map((appt, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{appt.time} - {appt.patient}</p>
                <p className="text-sm text-gray-600">{appt.condition}</p>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">View Case</button>
                <button className="px-3 py-1 text-sm bg-green-600 text-white rounded">Join Call</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-green-700 mb-4">🔔 Recent Patient Activity</h2>
        <ul className="space-y-2 text-gray-700">
          {recentActivity.map((activity, idx) => (
            <li key={idx} className="flex items-center gap-2">
              ✅ {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insights */}
      <div className="bg-green-50 p-6 rounded-xl shadow-inner">
        <h2 className="text-lg font-semibold text-green-700 mb-2">🤖 AI Insights</h2>
        <p className="text-gray-700">
          3 patients with Pitta imbalance need follow-up this week. Consider scheduling calls for progress tracking.
        </p>
      </div>
    </div>
  );
}
