import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchStaffs, deleteStaff } from '../api';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Box
} from '@mui/material';

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          component={RouterLink}
          to="/add"
          variant="contained"
          color="primary"
        >
          Add New Staff
        </Button>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="staff table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map(staff => (
              <TableRow
                key={staff.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {staff.name}
                </TableCell>
                <TableCell>{staff.age}</TableCell>
                <TableCell>{staff.address}</TableCell>
                <TableCell align="right">
                  <Button
                    component={RouterLink}
                    to={`/detail/${staff.id}`}
                    variant="text"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    component={RouterLink}
                    to={`/update/${staff.id}`}
                    variant="text"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(staff.id)}
                    variant="text"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Dashboard;