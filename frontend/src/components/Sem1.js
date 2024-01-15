// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Sem1() {
//   const [semester, setSemester] = useState('Semester1');
//   const [subject, setSubject] = useState('');
//   const [year, setYear] = useState('');
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getItems = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get("http://localhost:8080/api", {
//         params: { semester, subject, year },
//       });
//       setItems(res.data.items);
//     } catch (error) {
//       setError("Error fetching items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadFile = async (id, fileName) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/download/${id}`,
//         { responseType: "blob" }
//       );
//       const blob = new Blob([res.data], { type: res.data.type });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = fileName || "file.pdf";
//       link.click();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getItems();
//   }, [semester, subject, year]);

//   return (
//     <div>
//       <h1>Semester 1</h1>
//       <div>
//         <label>Select Subject:</label>
//         <select
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         >
//           <option value="">Select Subject</option>
//           <option value="C">C</option>
//           <option value="C++">C++</option>
//           <option value="Java">Java</option>
//           <option value="Python">Python</option>
//         </select>
//       </div>
//       {/* Additional input fields for semester and year if needed */}
//       <div>
//         {loading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//         {items
//   .filter((item) => subject === '' || item.subject === subject) // Filter items based on the selected subject
//   .map((item) => (
//     <div className="item" key={item._id}>
//       <div className="itemBox">
//         <h3>{item.name}</h3>
//         <h3>{item.semester}</h3>
//         <h3>{item.subject}</h3>
//         <h3>{item.year}</h3>
//         <button onClick={() => downloadFile(item._id, item.fileName)}>
//           Download File
//         </button>
//       </div>
//     </div>
//   ))}

//       </div>
//     </div>
//   );
// }

// export default Sem1;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sem1() {
  const [semester, setSemester] = useState('Semester1');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const subjects = ['C', 'C++', 'Java', 'Python'];

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
    <div>
      <h1>Semester 1</h1>
      <div>
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
        {subjectSelected &&
          items
            .filter((item) => subject === '' || item.subject === subject)
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
            ))}
      </div>
    </div>
  );
}

export default Sem1;
