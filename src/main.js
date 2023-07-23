import React, { useState } from "react";
import axios from "axios";

const main = () => {
  const [urls, setUrls] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchNumbers = async () => {
    try {
      setLoading(true);
      const urlList = urls.split("&").map((url) => url.trim());
      const response = await axios.get("http://localhost:8008/numbers", {
        params: {
          url: urlList
        },
        timeout: 500 
      });
      setNumbers(response.data.numbers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Number Management</h2>
      <div>
        <label htmlFor="urls">Enter URLs separated by "&":</label>
        <input
          type="text"
          id="urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
      </div>
      <button onClick={handleFetchNumbers} disabled={loading}>
        Get Numbers
      </button>
      <div>
        {loading && <p>Loading...</p>}
        {numbers.length > 0 && !loading && (
          <div>
            <h3>Numbers:</h3>
            <ul>
              {numbers.map((num) => (
                <li key={num}>{num}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default main;
