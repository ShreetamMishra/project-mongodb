import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Sem.css";
import download from "../assets/download-solid.svg";

function Sem1() {
  const [semester] = useState("Semester1");
  const [subject, setSubject] = useState("");
  const [year] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);
  const fileInputRef = useRef(null);
  const [answerFileChosen, setAnswerFileChosen] = useState(false);

  const subjects = [
    "Imperative Programming",
    "Digital Electronics",
    "Operating Systems",
    "Discrete Mathematics",
    "Ability Enhancement Skill",
    "Communication Skills",
  ];

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
    const isLoggedIn = !!localStorage.getItem("token");

    // If not logged in, display an alert and navigate to /login
    if (!isLoggedIn) {
      alert("Please login first.");
      window.location.href = "/login";
      return; // Stop further execution
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/download/${id}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || "file.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  const downloadAnswerFile = async (id, fileName) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/download-answer/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || "answerFile.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubjectClick = (subj) => {
    setSubject(subj);
    setSubjectSelected(true);
  };
  const uploadAnswer = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const fileInput = fileInputRef.current;

      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        setError("Please select a file for the answer");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("answerFile", fileInput.files[0]);

      await axios.post(
        `http://localhost:8080/api/upload-answer/${id}`,
        formData
      );

      fileInput.value = null;
      getItems();
    } catch (error) {
      setError("Error uploading answer");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItems();
  }, [semester, subject, year]);

  return (
    <div>
      {" "}
      <Navbar />
      <div>
        <h1 className="flex flex-row justify-center mt-10 font-bold text-[#ffff] text-[30px]">
          BSc IT Semester I
        </h1>
        <div className="hello2 font-bold text-[#ffff]">
          {subjectSelected ? (
            <div className={`selected-subject-box`}>{subject}</div>
          ) : (
            subjects.map((subj) => (
              <div
                key={subj}
                className={`subject-box ${subject === subj ? "selected" : ""}`}
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
          <div className="itemContainer text-[#ffff] ">
            {subjectSelected &&
              items
                .filter((item) => subject === "" || item.subject === subject)
                .map((item) => (
                  <div className="item1" key={item._id}>
                    <div className="itemBox1">
                      <h3>
                        {item.semester} {item.subject} ({item.year})
                      </h3>
                      <div className="buttonContainer flex flex-row lg:w-[180px] lg:mr-[10rem] lg:gap-10 ">
                        <div className="flex flex-row lg:w-full lg:gap-5 ">
                          {item.answerFile ? (
                            <div className="flex items-center">
                              <button
                                onClick={() => downloadAnswerFile(item._id)}
                                className="flex items-center"
                              >
                                <span className="mr-2">Answer:</span>
                                <img src={download} alt="Download" />
                              </button>
                            </div>
                          ) : (
                            <div className="const flex flex-row lg:gap-5 ">
                              {" "}
                              {/* Add this container for horizontal layout */}
                              {answerFileChosen ? (
                                <p>Click on "Upload" to upload your answer</p>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id="answerFileInput"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                  />
                                  <label
                                    htmlFor="answerFileInput"
                                    className="w-[8rem] flex flex-col justify-center"
                                  >
                                    <button
                                      onClick={() =>
                                        fileInputRef.current.click()
                                      }
                                      disabled={loading}
                                      className="choose text-[10px] "
                                    >
                                      <p className="w-full flex flex-col justify-center mt-[1.5px]">
                                        Choose File
                                      </p>
                                    </button>
                                  </label>
                                </>
                              )}
                              <button
                                onClick={() => uploadAnswer(item._id)}
                                disabled={loading}
                                className="bg-[#d84914] text-[11px] px-2  rounded-md "
                              >
                                {loading ? "Uploading..." : "Upload"}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center ">
                          <button
                            onClick={() =>
                              downloadFile(item._id, item.fileName)
                            }
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

export default Sem1;
