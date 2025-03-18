import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Detail from './components/Detail';
import Add from './components/Add';
import Update from './components/Update';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
