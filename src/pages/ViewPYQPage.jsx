import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "./ViewPYQPage.css";

const ViewPYQPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [examTypeFilter, setExamTypeFilter] = useState("All");

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "questionPapers"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPapers(data);
      } catch (err) {
        console.error("Error fetching papers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const filteredPapers = papers.filter((paper) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      paper.courseCode?.toLowerCase().includes(term) ||
      paper.subject?.toLowerCase().includes(term) ||
      paper.examDate?.toLowerCase().includes(term);

    const matchesExamType =
      examTypeFilter === "All" ||
      paper.examType?.toLowerCase() === examTypeFilter.toLowerCase();

    return matchesSearch && matchesExamType;
  });

  return (
    <div className="pyq-view-container">
      <h2 className="pyq-heading">All Uploaded Question Papers</h2>

      <div className="pyq-filters">
        <input
          type="text"
          className="pyq-search"
          placeholder="Search by course code, subject, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="pyq-dropdown"
          value={examTypeFilter}
          onChange={(e) => setExamTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="cat1">CAT1</option>
          <option value="cat2">CAT2</option>
          <option value="fat">FAT</option>
        </select>
      </div>

      {loading ? (
        <div className="pyq-loader">Loading question papers...</div>
      ) : filteredPapers.length === 0 ? (
        <p className="pyq-no-data">No matching papers found.</p>
      ) : (
        <div className="pyq-grid">
          {filteredPapers.map((paper) => (
            <div className="pyq-card" key={paper.id}>
              <h3>{paper.subject}</h3>
              <p>
                <strong>Code:</strong> {paper.courseCode}
              </p>
              <p>
                <strong>Exam:</strong> {paper.examType?.toUpperCase()}
              </p>
              <p>
                <strong>Date:</strong> {paper.examDate}
              </p>
              <div className="btn-wrapper">
                {paper.fileLinks?.map((link, index) => (
                  <button
                    key={index}
                    className="view-btn"
                    onClick={() => window.open(link, "_blank")}
                  >
                    View Paper {index + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPYQPage;
