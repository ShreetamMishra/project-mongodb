import React, { useState, useEffect, useRef } from "react";
import "../styles/Upload.css";
import axios from "axios";

const Download = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("2022");

  const semesterSubjects = {
    "1stSem": ["C", "C++"],
    "2ndSem": ["Java", "Python"],
    // Add more semesters and subjects as needed
  };

  const subjectOptions = semesterSubjects[semester] || [];

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/api", {
        params: { semester, subject, year },
      });
      setItems(res.data.items);
    } catch (error) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (id, fileName) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || "file.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, [semester, subject, year]);

  return (
    <div className="app">
      <div className="semester-selection">
        <label>Semester:</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
            <option value="">Select Semester</option>
          <option value="1stSem">1st Semester</option>
          <option value="2ndSem">2nd Semester</option>
          {/* Add more semester options as needed */}
        </select>

        {subjectOptions.length > 0 && (
          <>
            <label>Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
               <option value="">Select Subject</option>
              {subjectOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className="items">
  {loading ? (
    <p>Loading...</p>
  ) : items.length ? (
    items
      .filter((item) => item.subject === subject) // Filter items based on the selected subject
      .map((item) => (
        <div className="item" key={item._id}>
          <div className="itemBox">
            <h3>{item.name}</h3>
            <h3>{item.semester}</h3>
            <h3>{item.subject}</h3>
            <h3>{item.year}</h3>
            <button onClick={() => downloadFile(item._id, item.fileName)}>
              Download File
            </button>
          </div>
        </div>
      ))
  

        ) : (
          <p>No items available</p>
        )}
      </div>
      <div className="colorfulElements"></div>
      <div className="colorfulElements"></div>
      <div className="colorfulElements"></div>
    </div>
  );
};

export default Download;
