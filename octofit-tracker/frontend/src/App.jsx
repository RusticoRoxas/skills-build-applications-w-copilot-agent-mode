import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit<span className="brand-accent"> / tracker</span></span></NavLink>
        <span className="status"><span className="status-dot" /> API connected</span>
      </header>
      <div className="app-layout">
        <aside className="sidebar">
          <p className="nav-label">Workspace</p>
          <nav className="nav-stack" aria-label="Primary navigation">
            <NavLink to="/" end>Overview</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Members</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
          <div className="sidebar-note"><span className="spark">✦</span><strong>Keep showing up.</strong><p>Small efforts compound into big momentum.</p></div>
        </aside>
        <main className="content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      </div>
    </div>
  );
}

function Overview() {
  return <section className="overview"><p className="eyebrow">Friday, September 04</p><h1>Make today<br /><em>count.</em></h1><p className="intro">Your movement, your people, your pace. Pick a path and make it yours.</p><div className="overview-grid"><NavLink to="/activities" className="overview-card card-dark"><span className="card-kicker">Track the work</span><strong>Log an activity <span>↗</span></strong></NavLink><NavLink to="/workouts" className="overview-card card-yellow"><span className="card-kicker">Find your next move</span><strong>Explore workouts <span>↗</span></strong></NavLink><NavLink to="/leaderboard" className="overview-card card-light"><span className="card-kicker">See how we rise</span><strong>View leaderboard <span>↗</span></strong></NavLink></div></section>;
}

export default App;
