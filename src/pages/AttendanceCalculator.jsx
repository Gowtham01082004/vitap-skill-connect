import React, { useState } from "react";
import "./AttendanceCalculator.css";

const AttendanceCalculator = () => {
  const [present1, setPresent1] = useState("");
  const [absent1, setAbsent1] = useState("");
  const [total2, setTotal2] = useState("");
  const [present2, setPresent2] = useState("");
  const [absent2, setAbsent2] = useState("");
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  const calculateFormat1 = () => {
    const total = parseInt(present1) + parseInt(absent1);
    if (total > 0) {
      const percentage = (parseInt(present1) / total) * 100;
      setResult1(percentage.toFixed(2));
    }
  };

  const calculateFormat2 = () => {
    let present = present2;
    if (!present2 && absent2) {
      present = parseInt(total2) - parseInt(absent2);
    }
    if (total2 > 0 && present >= 0) {
      const percentage = (parseInt(present) / parseInt(total2)) * 100;
      setResult2(percentage.toFixed(2));
    }
  };

  const resetAll = () => {
    setPresent1("");
    setAbsent1("");
    setTotal2("");
    setPresent2("");
    setAbsent2("");
    setResult1(null);
    setResult2(null);
  };

  return (
    <div className="attendance-page">
      <h2>📘 Attendance Calculator</h2>

      <div className="attendance-format">
        <h4>Format-1</h4>
        <input
          type="number"
          placeholder="Classes Present"
          value={present1}
          onChange={(e) => setPresent1(e.target.value)}
        />
        <input
          type="number"
          placeholder="Classes Absent"
          value={absent1}
          onChange={(e) => setAbsent1(e.target.value)}
        />
        <button onClick={calculateFormat1}>Compute</button>
        {result1 && <p>Attendance: {result1}%</p>}
      </div>

      <div className="attendance-format">
        <h4>Format-2</h4>
        <input
          type="number"
          placeholder="Total Classes"
          value={total2}
          onChange={(e) => setTotal2(e.target.value)}
        />
        <input
          type="number"
          placeholder="Classes Present"
          value={present2}
          onChange={(e) => setPresent2(e.target.value)}
        />
        <div className="or-line">or</div>
        <input
          type="number"
          placeholder="Classes Absent"
          value={absent2}
          onChange={(e) => setAbsent2(e.target.value)}
        />
        <button onClick={calculateFormat2}>Compute</button>
        {result2 && <p>Attendance: {result2}%</p>}
      </div>

      <button className="reset-button" onClick={resetAll}>
        Reset
      </button>
    </div>
  );
};

export default AttendanceCalculator;
