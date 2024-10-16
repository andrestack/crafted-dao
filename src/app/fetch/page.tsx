"use client";

import { useEffect, useState } from "react";

// Define an interface for the structure of your data
interface PersonData {
  name: string;
  profitStaked: string | null;
  profitAvailable: string | null;
  jobsCompleted: string | null;
  treasuryTotal: string | null;
  overhead: string | null;
}

const Dashboard = () => {
  // Specify the type of data
  const [data, setData] = useState<PersonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Team Dashboard</h1>
      {data.length > 0 ? (
        data.map((person, index) => (
          <div key={index}>
            <h2>{person.name}</h2>
            <p>Profit Staked: {person.profitStaked}</p>
            <p>Profit Available: {person.profitAvailable}</p>
            <p>Jobs Completed: {person.jobsCompleted}</p>
            <p>Treasury Total: {person.treasuryTotal}</p>
            <p>Overhead: {person.overhead}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
