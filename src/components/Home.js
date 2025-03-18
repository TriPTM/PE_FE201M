import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchStaffs } from '../api';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button
} from '@mui/material';

function Home() {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs()
      .then(data => {
        console.log(data);
        const sortedData = data.sort((a, b) => b.age - a.age);
        setStaffs(sortedData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Staff List
      </Typography>
      <Grid container spacing={3}>
        {staffs.map(staff => (
          <Grid item xs={12} sm={6} md={4} key={staff.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={staff.avatar}
                alt={staff.name}
                sx={{ objectFit: 'cover' }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component={RouterLink}
                  to={`/detail/${staff.id}`}
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {staff.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {staff.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {staff.age}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  component={RouterLink}
                  to={`/detail/${staff.id}`}
                  variant="contained"
                  size="small"
                  fullWidth
                >
                  Detail
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;