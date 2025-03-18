import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStaffs } from '../api'

function Home() {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs()
      .then(data => {
        console.log(data)
        const sortedData = data.sort((a, b) => b.age - a.age);
        setStaffs(sortedData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Staff List</h1>
      <div className="staff-list">
        {staffs.map(staff => (
          <div key={staff.id} className="staff-card">
            <img src={staff.avatar} alt={staff.name} className="staff-image" />
            <div className="staff-info">
              <Link to={`/detail/${staff.id}`} className="staff-title">{staff.name}</Link>
              <p>Address: {staff.address}</p>
              <p>Age: {staff.age}</p>
              <Link to={`/detail/${staff.id}`} className="detail-btn">Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;