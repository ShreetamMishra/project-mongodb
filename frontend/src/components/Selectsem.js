import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SelectSem.css";

function SelectSem() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);

    // Use navigate to redirect to the desired route based on the selected semester
    switch (semester) {
      case 1:
        navigate('/sem1');
        break;
      case 2:
        navigate('/sem2');
        break;
      case 3:
        navigate('/sem3');
        break;
      case 4:
        navigate('/sem4');
        break;
      case 5:
        navigate('/sem5');
        break;
      case 6:
        navigate('/sem6');
        break;
      default:
        break;
    }
  };

  return (
    <div className="select-sem-container">
      <div
        className={`sem-box ${selectedSemester === 1 ? 'selected' : ''}`}
        onClick={() => handleSemesterClick(1)}
      >
        Semester 1
      </div>
      <div
        className={`sem-box ${selectedSemester === 2 ? 'selected' : ''}`}
        onClick={() => handleSemesterClick(2)}
      >
        Semester 2
      </div>
      <div
        className={`sem-box ${selectedSemester === 3 ? 'selected' : ''}`}
        onClick={() => handleSemesterClick(3)}
      >
        Semester 3
      </div>
      <div
        className={`sem-box ${selectedSemester === 4 ? 'selected' : ''}`}
        onClick={() => handleSemesterClick(4)}
      >
        Semester 4
      </div>
      <div
        className={`sem-box ${selectedSemester === 5 ? 'selected' : ''}`}
        onClick={() => handleSemesterClick(5)}
      >
        Semester 5
      </div>
      <div
        className={`sem-box ${selectedSemester === 6 ? 'selected' : ''}`}
        onClick={() => handleSemesterClick(6)}
      >
        Semester 6
      </div>
    </div>
  );
}

export default SelectSem;
