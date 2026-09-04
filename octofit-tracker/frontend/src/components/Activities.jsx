import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(activitiesEndpoint).then(setActivities).catch((loadError) => setError(loadError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div></div>
      <div className="activity-grid">
        {activities.map((activity) => (
          <article className="activity-item" key={activity._id || activity.id}>
            <div className="activity-icon">{activity.type?.charAt(0).toUpperCase()}</div>
            <div className="activity-copy"><strong>{activity.user?.name || 'Member'}</strong><span>{activity.type} · {activity.durationMinutes} min</span></div>
            <strong className="points">+{activity.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;
