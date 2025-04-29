import React, { useState } from "react";
import "./CgpaCalculator.css"; // Add styles here

const CgpaCalculator = () => {
  const [semesters, setSemesters] = useState(
    Array.from({ length: 12 }, () => ({ gpa: "", credits: "" }))
  );
  const [cgpa, setCgpa] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...semesters];
    updated[index][field] = value;
    setSemesters(updated);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    semesters.forEach(({ gpa, credits }) => {
      const g = parseFloat(gpa);
      const c = parseFloat(credits);
      if (!isNaN(g) && !isNaN(c)) {
        totalCredits += c;
        weightedSum += g * c;
      }
    });

    if (totalCredits === 0) {
      setCgpa("Enter at least one semester");
    } else {
      setCgpa((weightedSum / totalCredits).toFixed(2));
    }
  };

  return (
    <div className="cgpa-container">
      <h2>Sem wise CGPA</h2>
      {semesters.map((sem, index) => (
        <div key={index} className={`sem-row ${index % 2 === 1 ? "alt" : ""}`}>
          <div className="sem-column">
            <label>Credits</label>
            <input
              type="number"
              placeholder="max: 50"
              value={sem.credits}
              onChange={(e) => handleChange(index, "credits", e.target.value)}
            />
          </div>
          <div className="sem-label">Semester-{index + 1}</div>
          <div className="sem-column">
            <label>GPA</label>
            <input
              type="number"
              placeholder="max: 10"
              value={sem.gpa}
              onChange={(e) => handleChange(index, "gpa", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="calculate-btn" onClick={calculateCGPA}>
        Calculate CGPA
      </button>

      {cgpa && (
        <div className="cgpa-result">
          <strong>Calculated CGPA:</strong> {cgpa}
        </div>
      )}
    </div>
  );
};

export default CgpaCalculator;
