// SemesterSubjectSelection.js
import React, { useState, useEffect } from 'react';

const SemesterSubjectSelection = ({ onSelect }) => {
  const semesters = ['1stSem', '2nd Semester', '3rd Semester']; // Add more semesters as needed
  const subjects = {
    '1stSem': ['Python', 'Physics'],
    '2nd Semester': ['Chemistry', 'Biology'],
    '3rd Semester': ['History', 'Geography'],
  };

  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[semesters[0]][0]);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  useEffect(() => {
    if (typeof onSelect === 'function') {
      onSelect(selectedSemester, selectedSubject);
    }
  }, [selectedSemester, selectedSubject, onSelect]);


  return (
    <div>
      <label>
        Select Semester:
        <select value={selectedSemester} onChange={handleSemesterChange}>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Subject:
        <select value={selectedSubject} onChange={handleSubjectChange}>
          {subjects[selectedSemester].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SemesterSubjectSelection;
