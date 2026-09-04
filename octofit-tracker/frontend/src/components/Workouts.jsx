import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(workoutsEndpoint).then(setWorkouts).catch((loadError) => setError(loadError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Build your practice</p><h1>Workouts</h1></div></div>
      <div className="workout-grid">
        {workouts.map((workout) => (
          <article className="workout-card" key={workout._id || workout.id}><span className="difficulty">{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.activityType}</span><span>{workout.durationMinutes} min</span></footer></article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
