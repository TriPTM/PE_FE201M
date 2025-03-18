import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStaffById } from '../api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress
} from '@mui/material';

function Detail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    fetchStaffById(id)
      .then(data => setStaff(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!staff) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Staff Detail
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: 300 },
            height: 300,
            objectFit: 'cover'
          }}
          image={staff.avatar}
          alt={staff.name}
          onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {staff.name}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" paragraph>
              <strong>Address:</strong> {staff.address}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Age:</strong> {staff.age}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Created At:</strong> {new Date(staff.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Detail;