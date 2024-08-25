import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MeasurementForm from "./components/MeasurementForm";
import ResultPage from "./pages/ResultPage";
import SizeChart from "./components/SizeChart"; // Import the SizeChart component
import { Toaster } from "react-hot-toast";

function App() {
  const [resultMessage, setResultMessage] = useState("");

  const handleResultMessage = (message) => {
    setResultMessage(message);
  };

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/form"
          element={<MeasurementForm onSubmitSuccess={handleResultMessage} />}
        />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/size-chart" element={<SizeChart />} /> {/* Add route for SizeChart */}
      </Routes>
    </Router>
  );
}

export default App;
