import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminPYQUpload.css";

const AdminPYQUpload = () => {
  const [subject, setSubject] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [examType, setExamType] = useState("cat1");
  const [examDate, setExamDate] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !courseCode || !examDate || files.length === 0)
      return alert("Please fill all fields and upload at least one file.");

    try {
      setUploading(true);

      // Upload files to S3
      const uploadedLinks = [];
      for (const file of files) {
        const res = await axios.post(
          "http://localhost:5000/get-presigned-url",
          {
            fileName: file.name,
            fileType: file.type,
          }
        );
        const { url, fileUrl } = res.data;

        // Upload to S3
        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        uploadedLinks.push(fileUrl); // final S3 public URL
      }

      // Save metadata to Firestore
      await addDoc(collection(db, "questionPapers"), {
        subject,
        courseCode,
        examType,
        examDate,
        fileLinks: uploadedLinks,
        createdAt: serverTimestamp(),
      });

      alert("Uploaded successfully!");
      setSubject("");
      setCourseCode("");
      setExamDate("");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <div className="pyq-upload-container">
          <header className="upload-header">
            <h1 className="title">Add Question Paper</h1>
            <p className="subtitle">
              Upload previous year question papers to help students prepare
              better.
            </p>
          </header>

          <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">📄 Paper Details</h2>

            <div className="form-group">
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                className="form-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Course Code</label>
              <input
                type="text"
                className="form-input"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Exam Type</label>
              <div className="radio-tabs">
                {["cat1", "cat2", "fat"].map((type) => (
                  <label
                    key={type}
                    className={`radio-tab ${examType === type ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="examType"
                      value={type}
                      checked={examType === type}
                      onChange={(e) => setExamType(e.target.value)}
                    />
                    {type.toUpperCase()}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Exam Date</label>
              <input
                type="date"
                className="form-input"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Files</label>
              <label htmlFor="fileInput" className="file-upload">
                <div className="upload-text">Click or drag files here</div>
                <input
                  id="fileInput"
                  type="file"
                  className="file-input"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
              </label>

              <div className="file-preview">
                {files.map((file, idx) => (
                  <div className="preview-item" key={idx}>
                    {file.type.includes("image") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="preview-img"
                      />
                    ) : (
                      <div className="preview-img">📄 PDF</div>
                    )}
                    <button
                      type="button"
                      className="preview-remove"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Question Paper"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminPYQUpload;
