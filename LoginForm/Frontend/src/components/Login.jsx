import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Link, InputAdornment, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        console.error('Login error:', response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    aria-label="toggle password visibility"
                    sx={{ p: 0 }}
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Not a member?{' '}
              <Link component={RouterLink} to="/signup" variant="body2">
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
