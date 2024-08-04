import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Link, FormHelperText } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputAdornment, IconButton } from '@mui/material';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    const result = zxcvbn(password);
    setPasswordStrength(result.score); // 0 to 4 score
    setPasswordError(result.feedback.suggestions.join(' '));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for minimum strength before proceeding
    if (passwordStrength < 3) {
      alert('Password is too weak. Please choose a stronger password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        password
      });
      console.log('Signup response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onChange={handlePasswordChange}
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
          {passwordError && (
            <FormHelperText error>{passwordError}</FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2">
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
