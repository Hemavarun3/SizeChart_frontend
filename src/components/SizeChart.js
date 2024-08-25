import React, { useState } from "react";

const SizeChart = () => {
  const [category, setCategory] = useState(""); // State for top or bottom selection
  const [gender, setGender] = useState(""); // State for gender selection
  const [showChart, setShowChart] = useState(false); // State to control display of the size chart

  // Updated size chart data with S, M, L, XL for every variant
  const sizeChartData = {
    top: {
      male: [
        { size: 38, brandSize: "S", chest: 39.5, frontLength: 29.0, shoulder: 17.0, sleeveLength: 29.0 },
        { size: 40, brandSize: "M", chest: 42.3, frontLength: 29.4, shoulder: 17.8, sleeveLength: 29.4 },
        { size: 42, brandSize: "L", chest: 45.3, frontLength: 29.8, shoulder: 18.5, sleeveLength: 29.4 },
        { size: 44, brandSize: "XL", chest: 48.3, frontLength: 30.1, shoulder: 19.3, sleeveLength: 30.1 },
      ],
      female: [
        { size: 36, brandSize: "S", chest: 34.5, frontLength: 28.0, shoulder: 16.0, sleeveLength: 28.0 },
        { size: 38, brandSize: "M", chest: 36.5, frontLength: 28.4, shoulder: 16.5, sleeveLength: 28.5 },
        { size: 40, brandSize: "L", chest: 38.5, frontLength: 28.8, shoulder: 17.0, sleeveLength: 29.0 },
        { size: 42, brandSize: "XL", chest: 40.5, frontLength: 29.2, shoulder: 17.5, sleeveLength: 29.5 },
      ],
    },
    bottom: {
      male: [
        { size: 30, brandSize: "S", waist: 32.5, inseam: 32.0, length: 40.0 },
        { size: 32, brandSize: "M", waist: 34.5, inseam: 32.5, length: 41.0 },
        { size: 34, brandSize: "L", waist: 36.5, inseam: 33.0, length: 42.0 },
        { size: 36, brandSize: "XL", waist: 38.5, inseam: 33.5, length: 43.0 },
      ],
      female: [
        { size: 28, brandSize: "S", waist: 28.5, inseam: 31.0, length: 38.0 },
        { size: 30, brandSize: "M", waist: 30.5, inseam: 31.5, length: 39.0 },
        { size: 32, brandSize: "L", waist: 32.5, inseam: 32.0, length: 40.0 },
        { size: 34, brandSize: "XL", waist: 34.5, inseam: 32.5, length: 41.0 },
      ],
    },
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && gender) {
      setShowChart(true);
    }
  };

  // Render the table based on category and gender
  const renderTable = () => {
    const data = sizeChartData[category][gender];

    return (
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2">Size</th>
            <th className="py-2">Brand Size</th>
            {category === "top" ? (
              <>
                <th className="py-2">Chest (in)</th>
                <th className="py-2">Front Length (in)</th>
                <th className="py-2">Across Shoulder (in)</th>
                <th className="py-2">Sleeve Length (in)</th>
              </>
            ) : (
              <>
                <th className="py-2">Waist (in)</th>
                <th className="py-2">Inseam (in)</th>
                <th className="py-2">Length (in)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.size}</td>
              <td className="border px-4 py-2">{item.brandSize}</td>
              {category === "top" ? (
                <>
                  <td className="border px-4 py-2">{item.chest}</td>
                  <td className="border px-4 py-2">{item.frontLength}</td>
                  <td className="border px-4 py-2">{item.shoulder}</td>
                  <td className="border px-4 py-2">{item.sleeveLength}</td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2">{item.waist}</td>
                  <td className="border px-4 py-2">{item.inseam}</td>
                  <td className="border px-4 py-2">{item.length}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 text-white p-8 shadow-xl rounded-2xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Size Chart</h2>

        {/* Form for Category and Gender Selection */}
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="block">Select Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded bg-gray-700 text-white"
            >
              <option value="">Select Category</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="block">Select Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-2 border rounded bg-gray-700 text-white"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>

        {/* Render the size chart table only if showChart is true */}
        {showChart && (
          <div className="overflow-x-auto">
            {renderTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeChart;
