import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setWorkouts(items);
        console.log('Fetched data:', items);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Workouts</h1>
      {workouts.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              {Object.keys(workouts[0]).map(key => (
                <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                {Object.values(workout).map((value, i) => (
                  <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default Workouts;