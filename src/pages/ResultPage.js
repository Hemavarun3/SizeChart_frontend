import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.resultMessage) {
      setResultMessage(location.state.resultMessage);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-center">
      <div className="bg-gray-800 px-16 py-8 shadow-xl rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-white">Prediction Result</h1>
        {resultMessage != "No prediction result found." ? (
          <p className="text-white mt-4">{resultMessage}</p>
        ) : (
          <p className="text-white mt-4">No result available</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
