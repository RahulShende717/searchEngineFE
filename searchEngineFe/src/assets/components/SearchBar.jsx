import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/upload', formData);
      alert(`Upload Success! Loaded ${res.data.totalRecords} records.`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file.');
    }
  };
                      
  // Search function
  const performSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/search?query=${searchTerm}`);
      setSearchResults(res.data.results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  // Debounced Search
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      performSearch(query);
    }, 500); // 2 seconds

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Upload Parquet and Search</h2>

      <div style={{ marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
          Load File
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div>
        <h3>Search Results ({searchResults?.length})</h3>
        {searchResults?.length === 0 && <p>No results</p>}

        <ul>
          {searchResults?.map((item, index) => (
            <li key={index}>
              {item.Message} | {item.Tag} | {item.Sender}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
