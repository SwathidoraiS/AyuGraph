import { useState } from "react";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState({
    name: "Anjali Sharma",
    specialization: "Ayurveda & Nutrition",
    email: "dr.swathi@example.com",
    phone: "+91 9876543210",
    experience: "8 years",
    qualifications: "BAMS, MD Ayurveda",
    clinic: "AyuCare Wellness Clinic",
    bio: "Passionate about holistic health and personalized Ayurvedic care.",
  });

  const [editing, setEditing] = useState(false);
  const [tempDoctor, setTempDoctor] = useState({ ...doctor });

  const handleChange = (e) => {
    setTempDoctor({ ...tempDoctor, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setDoctor(tempDoctor);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-yellow-50 to-green-50 flex justify-center items-start p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          {/* Default Profile Icon */}
          <div className="w-24 h-24 rounded-full border-4 border-green-300 bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1118.878 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div>
            {!editing ? (
              <>
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-green-700 font-semibold">{doctor.specialization}</p>
                <p className="text-gray-600">{doctor.clinic}</p>
              </>
            ) : (
              <input
                type="text"
                name="name"
                value={tempDoctor.name}
                onChange={handleChange}
                className="border p-1 rounded w-full mb-2"
                placeholder="Name"
              />
            )}
          </div>
        </div>

        {/* Contact Info & Bio */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {!editing ? (
            <>
              <p><span className="font-semibold">Email:</span> {doctor.email}</p>
              <p><span className="font-semibold">Phone:</span> {doctor.phone}</p>
              <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
              <p><span className="font-semibold">Qualifications:</span> {doctor.qualifications}</p>
            </>
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={tempDoctor.email}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={tempDoctor.phone}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Phone"
              />
              <input
                type="text"
                name="experience"
                value={tempDoctor.experience}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Experience"
              />
              <input
                type="text"
                name="qualifications"
                value={tempDoctor.qualifications}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Qualifications"
              />
            </>
          )}
        </div>

        {/* Bio */}
        <div className="mt-4">
          {!editing ? (
            <p className="text-gray-700">{doctor.bio}</p>
          ) : (
            <textarea
              name="bio"
              value={tempDoctor.bio}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Bio"
              rows={3}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => { setEditing(false); setTempDoctor(doctor); }}
                className="bg-gray-300 px-6 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
