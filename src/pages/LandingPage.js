import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Measurement Form App
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <button
          className="text-white bg-blue-500 px-6 py-3 rounded-full text-lg transition-colors hover:bg-blue-600"
          onClick={() => navigate("/form")}
        >
          Go to Form
        </button>
        <button
          className="text-white bg-blue-500 px-6 py-3 rounded-full text-lg transition-colors hover:bg-blue-600"
          onClick={() => navigate("/size-chart")}
        >
          View Size Chart
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
