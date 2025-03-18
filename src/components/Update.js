import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateStaff, fetchStaffById } from '../api';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia
} from '@mui/material';

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Staff
      </Typography>
      <Grid container spacing={3}>
        {/* Image Preview */}
        <Grid item xs={12} md={4}>
          <Card>
            {formData.avatar ? (
              <CardMedia
                component="img"
                height="400"
                image={formData.avatar}
                alt="Staff avatar"
                sx={{ objectFit: 'cover' }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'}
              />
            ) : (
              <Box
                sx={{
                  height: 400,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography color="text.secondary">
                  No Image Available
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Form */}
        <Grid item xs={12} md={8}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Age"
              type="number"
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
              error={!!errors.age}
              helperText={errors.age}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Avatar URL"
              value={formData.avatar}
              onChange={e => setFormData({...formData, avatar: e.target.value})}
              error={!!errors.avatar}
              helperText={errors.avatar}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Staff
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Update;