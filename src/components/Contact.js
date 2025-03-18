import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';

function Contact() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong> contact@example.com
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Phone:</strong> (123) 456-7890
        </Typography>
      </Box>
    </Container>
  );
}

export default Contact;