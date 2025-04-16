import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "./ViewPYQPage.css";

const ViewPYQPage = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const snapshot = await getDocs(collection(db, "questionPapers"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPapers(data);
    };

    fetchPapers();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="pyq-view-container">
          <h2 className="pyq-heading">All Uploaded Question Papers</h2>
          <div className="pyq-grid">
            {papers.map((paper) => (
              <div className="pyq-card" key={paper.id}>
                <h3>{paper.subject}</h3>
                <p>
                  <strong>Code:</strong> {paper.courseCode}
                </p>
                <p>
                  <strong>Exam:</strong> {paper.examType.toUpperCase()}
                </p>
                <p>
                  <strong>Date:</strong> {paper.examDate}
                </p>
                {paper.fileLinks.map((link, index) => (
                  <button
                    key={index}
                    className="view-btn"
                    onClick={() => window.open(link, "_blank")}
                  >
                    View paper
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPYQPage;
