export default function PatientSelection({ setSelectedPatient }) {
  const patients = [
    { id: 1, name: "John Doe", age: 30, dosha: "Vata" },
    { id: 2, name: "Jane Smith", age: 25, dosha: "Pitta" },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-md space-y-3">
      <h2 className="font-semibold text-green-700">Step 1: Select Patient</h2>
      <select
        className="border p-2 rounded w-full"
        onChange={(e) => {
          const patient = patients.find(p => p.id === parseInt(e.target.value));
          setSelectedPatient(patient);
        }}
      >
        <option value="">-- Select Patient --</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>{p.name} ({p.dosha})</option>
        ))}
      </select>
    </div>
  );
}
