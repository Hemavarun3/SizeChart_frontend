import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MeasurementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    wgt: "",
    hgt: "",
    sho_gi: "",
    che_gi: "",
    wai_gi: "",
    nav_gi: "",
    hip_gi: "",
    kne_gi: "",
    ank_gi: "",
    thi_gi: "",
    cal_gi: "",
    gender: "",
    topBottom: "Top", // Default to "Top"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { wgt, hgt, gender, topBottom } = formData;
    let requiredFieldsFilled = true;
    console.log(formData);
    

    if (topBottom === "Top") {
      requiredFieldsFilled =
        wgt &&
        hgt &&
        formData.sho_gi &&
        formData.che_gi &&
        formData.wai_gi &&
        formData.nav_gi &&
        gender;
    } else if (topBottom === "Bottom") {
      requiredFieldsFilled =
        wgt &&
        hgt &&
        formData.wai_gi &&
        formData.hip_gi &&
        formData.thi_gi &&
        formData.cal_gi &&
        formData.kne_gi &&
        formData.ank_gi &&
        gender;
    }

    if (requiredFieldsFilled) {
      try {
        console.log(formData);
        
        const response = await fetch("https://sizechart-backend.onrender.com/predictdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);

          if (result.message !== "No prediction result found.") {
            toast.success(`Form submitted successfully! Result: ${result.message}`);
            navigate("/result", { state: { resultMessage: result.message } });  // Navigate with state
          } else {
            toast.success("Form submitted successfully, but no result message was returned.");
            navigate("/result", { state: { resultMessage: "No prediction result found." } });  // Navigate with state
          }
        } else {
          const errorText = await response.text();
          toast.error(`Failed to submit form. Server responded with: ${errorText}`);
        }
      } catch (error) {
        toast.error(`An error occurred while submitting the form: ${error.message}`);
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="flex justify-center items-center ">
        <div className="w-4/5 md:w-3/5  bg-gray-800 px-16 py-8 mt-10 shadow-xl rounded-2xl">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-y-2 md:gap-y-4 md:justify-between font-semibold text-gray-200">
            {/* Common fields */}
            <div className="flex flex-col space-y-2 md:w-2/5">
              <label className="label text-white">Weight (kg)</label>
              <input
                type="number"
                name="wgt"
                value={formData.wgt}
                onChange={handleChange}
                className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                placeholder="Enter weight"
                min="0"
                max="500"
                inputMode="numeric"
                required
              />
            </div>
            <div className="flex flex-col space-y-2 md:w-2/5">
              <label className="label text-white">Height (cm)</label>
              <input
                type="number"
                name="hgt"
                value={formData.hgt}
                onChange={handleChange}
                className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                placeholder="Enter height"
                min="0"
                max="300"
                inputMode="numeric"
                required
              />
            </div>
            {/* Gender and Top/Bottom selection */}
            <div className="flex flex-col md:flex-row md:justify-between md:w-full mt-4">
              <div className="flex flex-col space-y-2 md:w-2/5">
                <label className="label text-white">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2 appearance-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 md:w-2/5">
                <label className="label text-white">Top/Bottom</label>
                <select
                  name="topBottom"
                  value={formData.topBottom}
                  onChange={handleChange}
                  className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2 appearance-none"
                  required
                >
                  <option value="Top">Top</option>
                  <option value="Bottom">Bottom</option>
                </select>
              </div>
            </div>
            {/* Top-specific fields */}
            {formData.topBottom === "Top" && (
              <>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Shoulder Circumference (cm)</label>
                  <input
                    type="number"
                    name="sho_gi"
                    value={formData.sho_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter shoulder circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Chest Circumference (cm)</label>
                  <input
                    type="number"
                    name="che_gi"
                    value={formData.che_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter chest circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Waist Circumference (cm)</label>
                  <input
                    type="number"
                    name="wai_gi"
                    value={formData.wai_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter waist circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Naval Circumference (cm)</label>
                  <input
                    type="number"
                    name="nav_gi"
                    value={formData.nav_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter naval circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
              </>
            )}
            {/* Bottom-specific fields */}
            {formData.topBottom === "Bottom" && (
              <>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Waist Circumference (cm)</label>
                  <input
                    type="number"
                    name="wai_gi"
                    value={formData.wai_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter waist circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Hip Circumference (cm)</label>
                  <input
                    type="number"
                    name="hip_gi"
                    value={formData.hip_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter hip circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Thigh Circumference (cm)</label>
                  <input
                    type="number"
                    name="thi_gi"
                    value={formData.thi_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter thigh circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Calf Circumference (cm)</label>
                  <input
                    type="number"
                    name="cal_gi"
                    value={formData.cal_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter calf circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Knee Circumference (cm)</label>
                  <input
                    type="number"
                    name="kne_gi"
                    value={formData.kne_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter knee circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 md:w-2/5 mt-4">
                  <label className="label text-white">Ankle Circumference (cm)</label>
                  <input
                    type="number"
                    name="ank_gi"
                    value={formData.ank_gi}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2"
                    placeholder="Enter ankle circumference"
                    min="0"
                    max="200"
                    inputMode="numeric"
                    required
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded-full px-6 py-2 transition-colors hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementForm;
