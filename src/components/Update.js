import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateStaff, fetchStaffById } from '../api';

function Update() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        age: '',
        avatar: '',
        createdAt: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchStaffById(id)
            .then(response => {
                setFormData({
                    name: response.name,
                    address: response.address,
                    age: response.age,
                    avatar: response.avatar,
                    createdAt: response.createdAt
                });
            })
            .catch(err => console.error(err));
    }, [id]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        else if (formData.name.split(' ').length < 3) tempErrors.name = 'Name must have more than 2 words';
        if (!formData.address) tempErrors.address = 'Address is required';
        if (!formData.age) tempErrors.age = 'Age is required';
        if (!formData.avatar) tempErrors.avatar = 'Avatar URL is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            updateStaff(id, formData)
                .then(() => navigate('/dashboard'))
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="container">
            <h1>Update Staff</h1>
            <div className="update-layout">
                <div className="image-preview">
                    {formData.avatar ? (
                        <img
                            src={formData.avatar}
                            alt="Staff avatar"
                            className="avatar-image"
                            onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Fallback image
                        />
                    ) : (
                        <div className="image-placeholder">No Image Available</div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Address"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                        />
                        {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Age"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                        />
                        {errors.age && <span className="error">{errors.age}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Avatar URL"
                            value={formData.avatar}
                            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                        />
                        {errors.avatar && <span className="error">{errors.avatar}</span>}
                    </div>
                    <button type="submit" className="submit-btn">Update Staff</button>
                </form>
            </div>
        </div>
    );
}

export default Update;