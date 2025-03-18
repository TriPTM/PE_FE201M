import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStaffs, deleteStaff } from '../api';

function Dashboard() {
  const [staffs, setStaffs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStaffs().then(data => setStaffs(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      deleteStaff(id)
        .then(() => {
          setMessage('Staff deleted successfully!');
          fetchStaffs().then(data => setStaffs(data));
          setTimeout(() => setMessage(''), 2000);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <Link to="/add" className="add-btn">Add New Staff</Link>
      {message && <div className="alert">{message}</div>}
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map(staff => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.age}</td>
              <td>{staff.address}</td>
              <td>
                <Link to={`/detail/${staff.id}`}>View</Link>
                <Link to={`/update/${staff.id}`}>Update</Link>
                <button onClick={() => handleDelete(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;