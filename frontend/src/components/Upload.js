
import React, { useState, useEffect, useRef } from "react";
import "../styles/Upload.css";
import axios from "axios";
import Navbar from "./Navbar";
const Upload = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  // Define a mapping between semesters and subjects
  const semesterSubjects = {
    "1stSem": ["Imperative Programming", "Digital Electronics","Operating Systems", "Discrete Mathematics","Ability Enhancement Skill", "Communication Skills"],
    "2ndSem": ["Object-oriented Programming", "Microprocessor Architecture","Web Programming", "Numerical and Statistical Methods","Ability Enhancement Skill", "Green Computing"],
    "3rdSem": ["Python Programming", "Data Structures","Computer Networks", "Database Management Systems","Applied Mathematics", "Mobile Programming Practical"],
    "4thSem": ["Introduction to Embedded Systems", "Computer-Oriented Statistical Techniques","Software Engineering", "Computer Graphics and Animation","Computer Graphics and Animation", "Core Java Practical"],
    "5thSem": ["Network Security", "Asp.Net","Software Testing", "Advanced Java","Linux Administration"],
    "6thSem": ["Internet Technology", "Project Management","Information Technology service management", "Electives","Cyber laws", "Geographic Informations Systems"],
    // Add more semesters and subjects as needed
  };
  

  // Generate subject options based on the selected semester
  const subjectOptions = semesterSubjects[semester] || [];

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/api");
      setItems(res.data.items);
    } catch (error) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      // formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("semester", semester);
      formData.append("subject", subject);
      formData.append("year", year);

      await axios.post("http://localhost:8080/api/upload-file", formData);
  
      fileInputRef.current.value = null;
      getItems(); // Refresh the items list after adding
    } catch (error) {
      setError("Error adding item");
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
      link.download = fileName || "file.pdf"; // Set default filename if not available
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div> <Navbar />
    <div className="app">
      <div className="addItems">
       <select value={semester} onChange={(e) => setSemester(e.target.value)} className="h-10">
       <option value="">Select Semester</option>
          <option value="1stSem">1st Semester</option>
          <option value="2ndSem">2nd Semester</option>
          <option value="3rdSem">3rd Semester</option>
          <option value="4thSem">4th Semester</option>
          <option value="5thSem">5th Semester</option>
          <option value="6thSem">6th Semester</option>
          {/* Add more semesters as needed */}
        </select>
      <select value={subject} onChange={(e) => setSubject(e.target.value)} className="h-10">
  <option value="">Select Subject</option>
  {subjectOptions.map((subj) => (
    <option key={subj} value={subj}>
      {subj}
    </option>
  ))}
</select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="h-10">
        <option value="">Select Year</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Add other years as needed */}
        </select>
       
        <input type="file" className="w-10" ref={fileInputRef} />
        <button className="addButton" onClick={addItem} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="items-container">
      <div className="items">
        {loading ? (
          <p>Loading...</p>
        ) : items.length ? (
          items.map((item) => (
          
            <div className="item" key={item._id}>
              <div className="itemBox">
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
    </div></div></div>
  );
};

export default Upload;
