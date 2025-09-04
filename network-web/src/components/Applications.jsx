```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [page, pageSize, search]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/application', {
        params: { page, pageSize, search },
      });
      setApplications(response.data.applications);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const downloadCSV = async () => {
    try {
      const response = await axios.get('/application', {
        params: { page, pageSize, search, format: 'csv' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setError("Error downloading CSV");
    }
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search applications..."
        value={search}
        onChange={handleSearchChange}
      />
      <button onClick={downloadCSV}>Download CSV</button>

      {loading && <p>Loading applications...</p>}
      {error && <p>Error: {error}</p>}
      {applications.map((application) => (
        <div key={application.id}>
           {/* Display application details */}
          <p>Title: {application.title}</p>
          <p>Content: {application.content}</p>
         </div>
      ))}

      {/* Pagination */}
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page * pageSize >= totalCount}
      >
        Next
      </button>
    </div>
  );
};

export default Applications;

```