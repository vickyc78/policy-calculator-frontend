import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Alert, Container } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/calc');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>Login</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={submit}>
            <TextField
              fullWidth label="Email" variant="outlined" margin="normal"
              value={email} onChange={e => setEmail(e.target.value)}
            />
            <TextField
              fullWidth label="Password" type="password" variant="outlined" margin="normal"
              value={password} onChange={e => setPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" size="large" type="submit" sx={{ mt: 3 }}>
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}