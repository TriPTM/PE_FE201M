import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStaff } from '../api';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button
} from '@mui/material';

function Add() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    avatar: '',
    createdAt: new Date().toISOString()
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      addStaff(formData)
        .then(() => navigate('/dashboard'))
        .catch(err => console.error(err));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Staff
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          error={!!errors.address}
          helperText={errors.address}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Age"
          type="number"
          value={formData.age}
          onChange={e => setFormData({ ...formData, age: e.target.value })}
          error={!!errors.age}
          helperText={errors.age}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Avatar URL"
          value={formData.avatar}
          onChange={e => setFormData({ ...formData, avatar: e.target.value })}
          error={!!errors.avatar}
          helperText={errors.avatar}
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Staff
        </Button>
      </Box>
    </Container>
  );
}

export default Add;