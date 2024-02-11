import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import download from '../assets/download-solid.svg';

function Sem5() {
  const [semester] = useState('Semester5');
  const [subject, setSubject] = useState('');
  const [year] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);
  const [answerFileChosen, setAnswerFileChosen] = useState({});
  const fileInputRefs = useRef({});

  const subjects = [
    'Network Security',
    'Asp.Net',
    'Software Testing',
    'Advanced Java',
    'Linux Administration',
  ];

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:8080/api', {
        params: { semester, subject, year },
      });
      setItems(res.data.items);
    } catch (error) {
      setError('Error fetching items');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (id, fileName) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/download/${id}`, {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || 'file.pdf';
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubjectClick = (subj) => {
    setSubject(subj);
    setSubjectSelected(true);
  };

  const handleFileInputChange = (itemId, file) => {
    setAnswerFileChosen((prev) => ({ ...prev, [itemId]: file }));
  };

  const uploadAnswer = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const file = answerFileChosen[id];

      if (!file) {
        setError('Please select a file for the answer');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('answerFile', file);

      await axios.post(`http://localhost:8080/api/upload-answer/${id}`, formData);

      fileInputRefs.current[id].value = null;
      setAnswerFileChosen((prev) => ({ ...prev, [id]: null }));
      getItems();
    } catch (error) {
      setError('Error uploading answer');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [semester, subject, year]);

  return (
    <div>
      <div className="hii">
        <Navbar />
      </div>
      <div>
        <h1 className="flex flex-row justify-center mt-10 font-bold text-[#ffff] text-[30px]">
          Semester 5
        </h1>
        <div className="hello2 font-bold text-[#ffff]">
          {subjectSelected ? (
            <div className={`selected-subject-box`}>{subject}</div>
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
        <div>
          {loading && <p>Loading...</p>}
          <div className="itemContainer">
            {subjectSelected &&
              items
                .filter((item) => subject === '' || item.subject === subject)
                .map((item) => (
                  <div className="item1" key={item._id}>
                    <div className="itemBox1">
                      <h3>
                        {item.semester} {item.subject} ({item.year})
                      </h3>
                      <div className="buttonContainer">
                        <div className="flex items-center">
                          {item.answerFile ? (
                            <div className="flex items-center">
                              <button
                                onClick={() => downloadFile(item._id)}
                                className="flex items-center"
                              >
                                <span className="mr-2">Answer:</span>
                                <img src={download} alt="Download" />
                              </button>
                            </div>
                          ) : (
                            <div className="const flex items-center">
                              <input
                                type="file"
                                id={`answerFileInput-${item._id}`}
                                ref={(ref) => (fileInputRefs.current[item._id] = ref)}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileInputChange(item._id, e.target.files[0])}
                              />
                              <label
                                htmlFor={`answerFileInput-${item._id}`}
                                className="w-[8rem] flex flex-col justify-center"
                              >
                                <button
                                  onClick={() => fileInputRefs.current[item._id].click()}
                                  disabled={loading}
                                  className="choose text-[10px]"
                                >
                                  <p className="w-full flex flex-col justify-center mt-[1.5px]">
                                    Choose File
                                  </p>
                                </button>
                              </label>
                              {answerFileChosen[item._id] && (
                                <button
                                  onClick={() => uploadAnswer(item._id)}
                                  disabled={loading}
                                  className="bg-[#d84914] text-[11px] px-2 rounded-md ml-2"
                                >
                                  {loading ? 'Uploading...' : 'Upload'}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => downloadFile(item._id, item.fileName)}
                            className="flex items-center"
                          >
                            <span className="mr-2">Question:</span>
                            <img src={download} alt="Download" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sem5;
