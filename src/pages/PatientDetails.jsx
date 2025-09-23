import { useState, useEffect } from "react";

export default function PatientDetails() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Fetch all patients from the backend when the component loads
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/patients');
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients: ", err);
      setMessage("Error fetching patients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle patient deletion
  const handleDelete = async () => {
    const url = `http://localhost:5000/api/patients/${patientToDelete._id}`;
    console.log(`Attempting to delete patient with URL: ${url}`);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      console.log(`Response status: ${response.status}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete patient. Server response: ${response.status} ${response.statusText}. Details: ${errorText}`);
      }
      // Remove the deleted patient from the state
      setPatients(patients.filter(p => p._id !== patientToDelete._id));
      setMessage("Patient deleted successfully!");
      setShowDeleteModal(false);
      setPatientToDelete(null);
    } catch (err) {
      console.error("Error deleting patient:", err);
      setMessage("Error deleting patient.");
    }
  };

  // Handle patient update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patientToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        throw new Error('Failed to update patient');
      }
      const updatedPatient = await response.json();
      // Update the patient in the state
      setPatients(patients.map(p => (p._id === updatedPatient._id ? updatedPatient : p)));
      setMessage("Patient updated successfully!");
      setShowEditModal(false);
      setPatientToEdit(null);
    } catch (err) {
      console.error("Error updating patient:", err);
      setMessage("Error updating patient.");
    }
  };

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-yellow-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Patient Database</h2>
        
        {message && (
          <div className="p-4 rounded-md mb-4 text-center text-green-700 bg-green-100">
            {message}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search patients by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 w-full max-w-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading patients...</p>
        ) : filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient._id} className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-green-700 mb-2">{patient.name}</h4>
                  <p className="text-gray-600">Age: {patient.age}</p>
                  <p className="text-gray-600">Gender: {patient.gender}</p>
                  <p className="text-gray-600">Health: {patient.healthConditions}</p>

                  {/* START OF NEWLY ADDED CODE */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-green-800 font-semibold">Predicted Dosha:</p>
                    <p className="text-gray-600">Vata Score: <span className="font-bold">{patient.vataScore}</span></p>
                    <p className="text-gray-600">Pitta Score: <span className="font-bold">{patient.pittaScore}</span></p>
                    <p className="text-gray-600">Kapha Score: <span className="font-bold">{patient.kaphaScore}</span></p>
                  </div>
                  {/* END OF NEWLY ADDED CODE */}

                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => {
                      setPatientToEdit(patient);
                      setEditFormData(patient);
                      setShowEditModal(true);
                    }}
                    className="flex-1 bg-green-600 text-white rounded-md p-2 hover:bg-green-700 transition duration-300 ease-in-out font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setPatientToDelete(patient);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition duration-300 ease-in-out font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">No patients found.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h4 className="text-xl font-bold mb-4 text-gray-800">Confirm Deletion</h4>
            <p className="text-gray-600 mb-6">Are you sure you want to delete <span className="font-semibold text-green-700">{patientToDelete.name}</span>'s profile? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 text-gray-800 rounded-md p-2 hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white rounded-md p-2 hover:bg-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 ${showEditModal ? 'opacity-100 z-50' : 'opacity-0 -z-10'}`}>
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <h4 className="text-2xl font-bold mb-4 text-green-800 text-center">Edit Patient Profile</h4>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">General Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="name" placeholder="Full Name" value={editFormData.name || ''} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="number" name="age" placeholder="Age" value={editFormData.age || ''} onChange={(e) => setEditFormData({...editFormData, age: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <select name="gender" value={editFormData.gender || ''} onChange={(e) => setEditFormData({...editFormData, gender: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input type="text" name="height" placeholder="Height (cm)" value={editFormData.height || ''} onChange={(e) => setEditFormData({...editFormData, height: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="weight" placeholder="Weight (kg)" value={editFormData.weight || ''} onChange={(e) => setEditFormData({...editFormData, weight: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="healthConditions" placeholder="Health Conditions" value={editFormData.healthConditions || ''} onChange={(e) => setEditFormData({...editFormData, healthConditions: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="allergies" placeholder="Allergies" value={editFormData.allergies || ''} onChange={(e) => setEditFormData({...editFormData, allergies: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="medications" placeholder="Medications" value={editFormData.medications || ''} onChange={(e) => setEditFormData({...editFormData, medications: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
            
            {/* Lifestyle & Dietary Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Lifestyle & Dietary</h3>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="dietaryPreference" placeholder="Dietary Preference" value={editFormData.dietaryPreference || ''} onChange={(e) => setEditFormData({...editFormData, dietaryPreference: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="foodLikes" placeholder="Food Likes" value={editFormData.foodLikes || ''} onChange={(e) => setEditFormData({...editFormData, foodLikes: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="foodDislikes" placeholder="Food Dislikes" value={editFormData.foodDislikes || ''} onChange={(e) => setEditFormData({...editFormData, foodDislikes: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="foodIntolerances" placeholder="Food Intolerances" value={editFormData.foodIntolerances || ''} onChange={(e) => setEditFormData({...editFormData, foodIntolerances: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="regionalCuisine" placeholder="Regional Cuisine" value={editFormData.regionalCuisine || ''} onChange={(e) => setEditFormData({...editFormData, regionalCuisine: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="lifestyle" placeholder="Lifestyle" value={editFormData.lifestyle || ''} onChange={(e) => setEditFormData({...editFormData, lifestyle: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="exercise" placeholder="Exercise" value={editFormData.exercise || ''} onChange={(e) => setEditFormData({...editFormData, exercise: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="waterIntake" placeholder="Water Intake" value={editFormData.waterIntake || ''} onChange={(e) => setEditFormData({...editFormData, waterIntake: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            {/* Other Health Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Other Health Info</h3>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="sleepPattern" placeholder="Sleep Pattern" value={editFormData.sleepPattern || ''} onChange={(e) => setEditFormData({...editFormData, sleepPattern: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="appetiteDigestion" placeholder="Appetite & Digestion" value={editFormData.appetiteDigestion || ''} onChange={(e) => setEditFormData({...editFormData, appetiteDigestion: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="bowelHabits" placeholder="Bowel Habits" value={editFormData.bowelHabits || ''} onChange={(e) => setEditFormData({...editFormData, bowelHabits: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="energyLevels" placeholder="Energy Levels" value={editFormData.energyLevels || ''} onChange={(e) => setEditFormData({...editFormData, energyLevels: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="stressLevels" placeholder="Stress Levels" value={editFormData.stressLevels || ''} onChange={(e) => setEditFormData({...editFormData, stressLevels: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            {/* Physical Attributes Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Physical Attributes</h3>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="bodyFrame" placeholder="Body Frame" value={editFormData.bodyFrame || ''} onChange={(e) => setEditFormData({...editFormData, bodyFrame: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="skinType" placeholder="Skin Type" value={editFormData.skinType || ''} onChange={(e) => setEditFormData({...editFormData, skinType: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="hairType" placeholder="Hair Type" value={editFormData.hairType || ''} onChange={(e) => setEditFormData({...editFormData, hairType: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="pulseType" placeholder="Pulse Type" value={editFormData.pulseType || ''} onChange={(e) => setEditFormData({...editFormData, pulseType: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            {/* Mental & Cravings Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Mental & Cravings</h3>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="memory" placeholder="Memory" value={editFormData.memory || ''} onChange={(e) => setEditFormData({...editFormData, memory: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="decisionMaking" placeholder="Decision Making" value={editFormData.decisionMaking || ''} onChange={(e) => setEditFormData({...editFormData, decisionMaking: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="preferredTastes" placeholder="Preferred Tastes" value={editFormData.preferredTastes || ''} onChange={(e) => setEditFormData({...editFormData, preferredTastes: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="text" name="cravings" placeholder="Cravings" value={editFormData.cravings || ''} onChange={(e) => setEditFormData({...editFormData, cravings: e.target.value})} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            {/* Form Buttons */}
            <div className="md:col-span-2 mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-800 rounded-md p-3 hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white rounded-md p-3 hover:bg-green-700 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}