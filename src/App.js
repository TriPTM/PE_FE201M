import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Detail from './components/Detail';
import Add from './components/Add';
import Update from './components/Update';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Staff Management
            </Typography>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              sx={{ mr: 2 }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/dashboard"
              sx={{ mr: 2 }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contact"
            >
              Contact
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;