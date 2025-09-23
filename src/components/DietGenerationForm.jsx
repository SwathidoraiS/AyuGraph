// DietGenerationForm.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WeeklyDietPlan from "./WeeklyDietPlan";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FaEye, FaTimes, FaPrint, FaTrashAlt } from 'react-icons/fa';

export default function DietGenerationForm({ patient }) {
    const [preferences, setPreferences] = useState({
        regionalCuisine: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dominantDosha, setDominantDosha] = useState(null);
    const [dietPlan, setDietPlan] = useState(null);
    const [savedCharts, setSavedCharts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChart, setSelectedChart] = useState(null);

    const weeklyDietPlanRef = useRef(null);
    const modalContentRef = useRef(null);

    useEffect(() => {
        if (patient && patient._id) {
            setDominantDosha(getDominantDosha(patient));
            fetchSavedCharts(patient._id);
        } else {
            setDominantDosha(null);
            setDietPlan(null);
            setSavedCharts([]);
        }
    }, [patient]);

    const getDominantDosha = (patient) => {
        const scores = {
            Vata: patient.vataScore,
            Pitta: patient.pittaScore,
            Kapha: patient.kaphaScore,
        };
        return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    };

    const fetchSavedCharts = async (patientId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/foods/get-saved-charts/${patientId}`);
            setSavedCharts(response.data.dietCharts);
        } catch (err) {
            console.error("Error fetching saved charts:", err);
            setError("Failed to load saved charts.");
        }
    };

    const handleGenerateDiet = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setDietPlan(null);
        if (!patient || !dominantDosha) {
            setError("Patient data is missing.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/foods/generate-diet", {
                dominantDosha: dominantDosha.toLowerCase(),
                regionalCuisine: preferences.regionalCuisine,
            });
            setDietPlan(response.data);
        } catch (err) {
            console.error("Error generating diet:", err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to generate diet plan. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSaveChart = async () => {
        if (!dietPlan || !patient || !patient._id) {
            setError("No diet plan or patient to save.");
            return;
        }
        try {
            const chartData = {
                patientId: patient._id,
                dietPlan: dietPlan
            };
            await axios.post("http://localhost:5000/api/foods/save-diet-chart", chartData);
            alert("Diet chart saved to database!");
            fetchSavedCharts(patient._id);
        } catch (err) {
            console.error("Error saving chart:", err);
            setError("Failed to save chart. Please try again.");
        }
    };

    const handleDeleteChart = async (chartId) => {
        try {
            await axios.delete(`http://localhost:5000/api/foods/delete-diet-chart/${patient._id}/${chartId}`);
            alert("Diet chart deleted!");
            fetchSavedCharts(patient._id);
        } catch (err) {
            console.error("Error deleting chart:", err);
            setError("Failed to delete chart.");
        }
    };

    const handleViewChart = (chart) => {
        setSelectedChart(chart);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedChart(null);
    };

    // The corrected PDF download function
    const handleDownloadPdf = async () => {
        const element = weeklyDietPlanRef.current;
        if (!element) {
            console.error("PDF target element not found.");
            return;
        }

        try {
            // Use a higher scale for better image quality in the PDF
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${patient.name}_DietPlan.pdf`);
        } catch (err) {
            console.error("Error generating PDF:", err);
            alert("Failed to download PDF. Please try again.");
        }
    };

    const handlePrintChart = () => {
        const content = modalContentRef.current;
        if (!content) {
            console.error("Print content not found.");
            return;
        }
        const originalContents = document.body.innerHTML;
        const printContents = content.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
                2. Generate Diet
            </h3>
            {patient ? (
                <form onSubmit={handleGenerateDiet} className="space-y-4">
                    <p className="text-gray-700">
                        Generating diet for:{" "}
                        <span className="font-semibold text-green-700">
                            {patient.name}
                        </span>
                        <br />
                        Dominant Dosha:{" "}
                        <span className="font-semibold text-yellow-800">
                            {dominantDosha || "N/A"}
                        </span>
                    </p>
                    <div>
                        <label htmlFor="regionalCuisine" className="block text-gray-700 font-medium mb-1">
                            Regional Cuisine (Optional)
                        </label>
                        <select
                            id="regionalCuisine"
                            value={preferences.regionalCuisine}
                            onChange={(e) => setPreferences({ ...preferences, regionalCuisine: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            <option value="">Any</option>
                            <option value="Indian">Indian</option>
                            <option value="Global">Global</option>
                        </select>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                        disabled={loading || !dominantDosha}
                    >
                        {loading ? "Generating..." : "Generate Diet Plan"}
                    </button>
                </form>
            ) : (
                <p className="text-gray-500">Please select a patient first.</p>
            )}

            {dietPlan && (
                <div className="mt-6">
                    <div className="flex justify-center space-x-4 mb-4">
                        <button
                            onClick={handleDownloadPdf}
                            className="bg-yellow-500 text-white font-semibold py-1.5 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={handleSaveChart}
                            className="bg-green-500 text-white font-semibold py-1.5 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                        >
                            Save Chart
                        </button>
                    </div>
                    <WeeklyDietPlan dietPlan={dietPlan} patientName={patient.name} ref={weeklyDietPlanRef} />
                </div>
            )}
            
            {savedCharts.length > 0 && (
                <div className="mt-8">
                    <h4 className="font-semibold text-green-700 mb-4">Saved Diet Charts</h4>
                    <ul className="space-y-2">
                        {savedCharts.map((chart) => (
                            <li key={chart._id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm">
                                <div>
                                    <span className="font-medium">
                                        Chart from: **{new Date(chart.date).toLocaleDateString()}**
                                    </span>
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        Patient: {patient.name}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleViewChart(chart)} className="p-2 text-green-600 hover:text-green-800 transition">
                                        <FaEye size={20} />
                                    </button>
                                    <button onClick={() => handleDeleteChart(chart._id)} className="p-2 text-red-500 hover:text-red-700 transition">
                                        <FaTrashAlt size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isModalOpen && selectedChart && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl relative max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 border-b pb-2 sticky top-0 bg-white z-10">
                            <h5 className="text-xl font-bold text-green-800">Diet Chart for {patient.name}</h5>
                            <div className="flex space-x-2">
                                <button onClick={handlePrintChart} className="text-gray-600 hover:text-gray-800">
                                    <FaPrint size={24} />
                                </button>
                                <button onClick={handleCloseModal} className="text-red-500 hover:text-red-700">
                                    <FaTimes size={24} />
                                </button>
                            </div>
                        </div>
                        <div ref={modalContentRef} className="p-4">
                            <WeeklyDietPlan
                                dietPlan={selectedChart.plan}
                                patientName={patient.name}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}