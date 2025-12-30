import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, Typography, Alert, Card, CardContent, Paper, 
  LinearProgress, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Stack 
} from '@mui/material';
import PolicyForm from '../components/PolicyForm';

export default function PolicyCalc() {
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    type: 'Term', dob: '', sumAssured: 500000, premiumAmount: 10000,
    premiumFrequency: 'Yearly', termYears: 10, name: '', mobile: '', riders: []
  });
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const onCalculate = async () => {
    setError(''); 
    setResult(null);
    setSuccess('');
    try {
      const url = `http://localhost:3001/api/policies/calculate`;
      const { data } = await axios.post(url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(data.illustration); 
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed');
    }
  };

  const onSave = async () => {
    setError('');
    setSuccess('');
    try {
      const url = `http://localhost:3001/api/policies/save`;
      const { data } = await axios.post(url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(`Policy saved successfully! Record ID: ${data.id}`);
      setResult(data.illustration); // Also show the table after saving
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save policy');
    }
  };

  // const handleBulkUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   setUploading(true);
  //   try {
  //     const { data } = await axios.post('http://localhost:3001/api/policies/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
  //     });
  //     setSuccess(`Bulk upload started! Job ID: ${data.jobId}`);
  //   } catch (err) {
  //     setError('Bulk upload failed');
  //     setUploading(false);
  //   }
  // };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Policy Management
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <PolicyForm form={form} setForm={setForm} onCalculate={onCalculate} />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onCalculate}
          sx={{ fontWeight: 'bold' }}
        >
          Preview Illustration
        </Button>
        <Button 
          variant="contained" 
          color="success" 
          onClick={onSave}
          sx={{ fontWeight: 'bold' }}
        >
          Save Policy to DB
        </Button>
      </Stack>

      {/* <Paper sx={{ p: 4, mt: 4, border: '2px dashed #ccc', textAlign: 'center', bgcolor: '#fafafa' }}>
        <Typography variant="h6">Bulk Processing (Scalability)</Typography>
        <Button variant="outlined" component="label" sx={{ mt: 2 }} disabled={uploading}>
          {uploading ? 'Processing...' : 'Upload CSV/Excel'}
          <input type="file" hidden onChange={handleBulkUpload} />
        </Button>
        {uploading && <LinearProgress sx={{ mt: 2 }} />}
      </Paper> */}

      {result && (
        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Benefit Illustration
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Year</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Age</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Annual Premium</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Premium Paid to Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Accumulated Value</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Death Benefit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((row) => (
                    <TableRow key={row.year} hover>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>₹{row.annualPremium?.toLocaleString()}</TableCell>
                      <TableCell>₹{row.premiumPaidToDate?.toLocaleString()}</TableCell>
                      <TableCell>₹{row.accumulatedValue?.toLocaleString() || 0}</TableCell>
                      <TableCell sx={{ color: 'green', fontWeight: 'bold' }}>
                        ₹{row.projectedBenefit?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}