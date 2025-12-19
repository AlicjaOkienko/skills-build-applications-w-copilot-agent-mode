import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setTeams(items);
        console.log('Fetched data:', items);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Teams</h1>
      {teams.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              {Object.keys(teams[0]).map(key => (
                <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                {Object.values(team).map((value, i) => (
                  <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teams found.</p>
      )}
    </div>
  );
};

export default Teams;