'use client';

import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } 
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Google Sheets Data</h1>
      {data.length > 0 ? (
        data.map((row, index) => (
          <div key={index}>
            <p>Row: {row}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
