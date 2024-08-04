import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/reset-password/${token}`, { password });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage('Error resetting password.');
      console.error('Reset password error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          {message && (
            <Typography variant="body2" color="textSecondary" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
