import React, { useState, useEffect, useRef } from "react";
import "../styles/Upload.css";
import axios from "axios";

const Upload = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      await axios.post("http://localhost:8080/api", formData);
      setName("");
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

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="addItems">
        <input
          type="text"
          placeholder="Add name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" ref={fileInputRef} />
        <button className="addButton" onClick={addItem} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="items">
        {loading ? (
          <p>Loading...</p>
        ) : items.length ? (
          filteredItems.map((item) => (
            <div className="item" key={item._id}>
              <div className="itemBox">
                <h3>{item.name}</h3>
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

export default Upload;
