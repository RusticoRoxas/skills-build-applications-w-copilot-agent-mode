import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(teamsEndpoint).then(setTeams).catch((loadError) => setError(loadError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div></div>
      <div className="team-grid">
        {teams.map((team) => (
          <article className="team-card" key={team._id || team.id}>
            <div className="team-topline"><span className="team-dot" /><span>{team.members?.length || 0} members</span></div>
            <h2>{team.name}</h2><p>{team.description || 'A crew committed to moving well together.'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;
