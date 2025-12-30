import React, { useState } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, TextField, Button, Box, Alert 
} from '@mui/material';

export default function Illustration() {
  const token = localStorage.getItem('token');
  const [rows, setRows] = useState([]);
  const [formJSON, setFormJSON] = useState('{}');
  const [error, setError] = useState('');

  const generate = async () => {
    setError('');
    try {
      const payload = JSON.parse(formJSON);
      const url = `http://localhost:3001/api/policies/calculate`;
      const { data } = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRows(data.illustration || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid JSON or server error');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Policy Illustration</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Paste the input JSON parameters to view the projected benefits table.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Input JSON"
        value={formJSON}
        onChange={(e) => setFormJSON(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={generate} sx={{ mb: 4 }}>
        Generate Table
      </Button>

      {rows.length > 0 && (
        <TableContainer component={Paper} elevation={3}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Age</b></TableCell>
                <TableCell align="right"><b>Premium Paid To Date</b></TableCell>
                <TableCell align="right"><b>Accumulated Value</b></TableCell>
                <TableCell align="right"><b>Projected Benefit</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.year} hover>
                  <TableCell>{r.year}</TableCell>
                  <TableCell>{r.age}</TableCell>
                  <TableCell align="right">₹{r.premiumPaidToDate.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{r.accumulatedValue.toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ₹{r.projectedBenefit.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}