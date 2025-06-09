import React, { useEffect, useState } from "react";
import axios from "axios";
const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/results`
        );
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          console.error("Unexpected API response:", data);
          setError("Unexpected data format received from server.");
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
        setError("Could not fetch results. Please try again later.");
      }
    };

    fetchResults();
  }, []);
  return (
    <div className="results">
      <h2>Previous Analyses</h2>
      {error && <p className="error">{error}</p>}
      {Array.isArray(results) && results.length > 0
        ? results.map((res, index) => (
            <div key={index} className="result-card">
              <img src={`http://localhost:5000${res.imageUrl}`} alt="upload" />
              <p>{res.result}</p>
            </div>
          ))
        : !error && <p>No results to display.</p>}
    </div>
  );
};
export default ResultsPage;
