import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaderboard).catch((loadError) => setError(loadError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">The weekly race</p><h1>Leaderboard</h1></div></div>
      <div className="leaderboard-list">
        {leaderboard.map((entry, index) => (
          <div className={`leader-row rank-${index + 1}`} key={entry.userId || entry._id || index}>
            <span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{entry.name || entry.user?.name || 'Member'}</strong><span className="leader-meta">{entry.activities || 0} activities</span><strong className="points">{entry.points || 0} pts</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
