import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/DoctorDashboard";
import PatientDatabase from "./pages/PatientDatabase";
import FoodDatabase from "./pages/FoodDatabase";
import DoctorProfile from "./pages/DoctorProfile";
import PatientSelection from "./components/PatientSelection";
import DietGenerationForm from "./components/DietGenerationForm";
import WeeklyDietPlan from "./components/WeeklyDietPlan";
import DietActions from "./components/DietActions";
import PatientDetails from "./pages/PatientDetails"; // kept from other branch
import DiscussionForum from "./pages/DiscussionForum";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);

  const renderPage = () => {
    switch (activePage) {
      
      case "Dashboard":
        return <Dashboard />;
      case "Patients":
        return <PatientDatabase />;
      case "PatientDetails":
        return <PatientDetails patient={selectedPatient} />;
      case "Food Database":
        return <FoodDatabase />;
      case "Discussion Forum":
        return <DiscussionForum />;
      case "Diet Generator":
        return (
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-green-900 mb-4">🌿 Diet Generator</h1>

            {/* Step 1: Patient Selection */}
            <PatientSelection setSelectedPatient={setSelectedPatient} />

            {/* Step 2: Generate Diet */}
            {selectedPatient && !dietPlan && (
              <DietGenerationForm
                patient={selectedPatient}
                setDietPlan={setDietPlan}
              />
            )}

            {/* Step 3: Show Weekly Diet Plan */}
            {dietPlan && (
              <>
                <WeeklyDietPlan dietPlan={dietPlan} />
                <DietActions dietPlan={dietPlan} patient={selectedPatient} />
              </>
            )}
          </div>
        );
      case "Profile":
        return <DoctorProfile />;
      default:
        return <div className="p-8 text-xl">Select a page</div>;
    }
  };

  return (
    <div className="flex bg-[#FDFDF9] min-h-screen">
      <Sidebar setActivePage={setActivePage} />
      <main className="flex-1 bg-[#FFFFFF] shadow-inner overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
