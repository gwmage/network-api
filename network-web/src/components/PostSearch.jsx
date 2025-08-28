```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOption, setSearchOption] = useState('all'); // 'all', 'title', 'content', 'author'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        search: searchTerm,
        option: searchOption,
      };
      const response = await axios.get('/api/board/posts', { params }); // Update with correct endpoint
      setSearchResults(response.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };



  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select value={searchOption} onChange={handleOptionChange}>
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="content">Content</option>
        <option value="author">Author</option>
      </select>
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading results...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            {/* Display search results here */}
            <p>{result.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostSearch;
```