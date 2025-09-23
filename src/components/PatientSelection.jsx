import React, { useState, useEffect } from "react";

export default function PatientSelection({ setSelectedPatient }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/patients");
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    const selected = patients.find((p) => p._id === patientId);
    setSelectedPatient(selected);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-green-800 mb-4">
        1. Select a Patient
      </h3>
      {loading && <p className="text-gray-500">Loading patients...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <select
          onChange={handlePatientChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="">-- Please select a patient --</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}