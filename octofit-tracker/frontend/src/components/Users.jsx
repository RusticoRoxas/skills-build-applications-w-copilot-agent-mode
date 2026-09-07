import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(usersEndpoint).then(setUsers).catch((loadError) => setError(loadError.message));
  }, []);

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <section>
      <div className="section-heading">
        <div><p className="eyebrow">Community</p><h1>Members</h1></div>
        <span className="count-badge">{users.length} active</span>
      </div>
      <div className="table-wrap">
        <table className="table tracker-table align-middle mb-0">
          <thead><tr><th>Name</th><th>Email</th><th>Team</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id}>
                <td className="person-cell"><span className="avatar">{user.name?.charAt(0)}</span>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.team?.name || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Users;
