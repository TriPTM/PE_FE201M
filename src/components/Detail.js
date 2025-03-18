import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStaffById } from '../api';

function Detail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    fetchStaffById(id)
      .then(data => setStaff(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!staff) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Staff Detail</h1>
      <div className="detail-card">
        <img src={staff.avatar} alt={staff.name} className="detail-image" />
        <div className="detail-info">
          <h2>{staff.name}</h2>
          <p><strong>Address:</strong> {staff.address}</p>
          <p><strong>Age:</strong> {staff.age}</p>
          <p><strong>Created At:</strong> {new Date(staff.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;