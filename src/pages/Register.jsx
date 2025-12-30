import React, { useState } from 'react';
import axios from 'axios';
import { Box, Paper, TextField, Button, Typography, Alert, Grid, Container } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', name: '', mobile: '', dob: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async e => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      await axios.post('http://localhost:3001/api/auth/register', form);
      setMsg('Registration successful! You can now login.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>Register</Typography>
          {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" value={form.name} onChange={e => set('name', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" value={form.email} onChange={e => set('email', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="password" label="Password" value={form.password} onChange={e => set('password', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="date" label="DOB" InputLabelProps={{ shrink: true }} value={form.dob} onChange={e => set('dob', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" size="large" type="submit" sx={{ mt: 2 }}>
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}