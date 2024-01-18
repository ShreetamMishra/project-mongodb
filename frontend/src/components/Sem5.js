import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import download from "../assets/download-solid.svg";
function Sem5() {
  const [semester, setSemester] = useState('Semester5');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const subjects = ["Network Security", "Asp.Net","Software Testing", "Advanced Java","Linux Administration"];

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

  const handleSubjectClick = (subj) => {
    setSubject(subj);
    setSubjectSelected(true);
  };

  useEffect(() => {
    getItems();
  }, [semester, subject, year]);

  return (
    <div><Navbar />
    <div>
      <h1 className='flex flex-row justify-center mt-10 font-bold text-[#ffff] text-[30px]'>Semester 5</h1>
      <div className='hello2 font-bold text-[#ffff]'>
        {subjectSelected ? (
          <div className={`selected-subject-box`}>
            {subject}
          </div>
        ) : (
          subjects.map((subj) => (
            <div
              key={subj}
              className={`subject-box ${subject === subj ? 'selected' : ''}`}
              onClick={() => handleSubjectClick(subj)}
            >
              {subj}
            </div>
          ))
        )}
      </div>
      {/* Additional input fields for semester and year if needed */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className='itemContainer'>
        {subjectSelected &&
          items
            .filter((item) => subject === '' || item.subject === subject)
            .map((item) => (
              <div className="item1" key={item._id}>
                <div className="itemBox1">
  <h3>
    {item.semester} {item.subject} ({item.year}) {item.name}
  </h3>
  <div className="buttonContainer">
    <button onClick={() => downloadFile(item._id, item.fileName)}>
      <img src={download} alt="Download" />
    </button>
  </div>
</div>

              
              </div>
            ))}
      </div></div>
    </div></div>
  );
}

export default Sem5;
