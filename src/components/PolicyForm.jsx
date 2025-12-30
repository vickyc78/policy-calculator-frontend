import React from 'react';
import { 
  Grid, TextField, MenuItem, Button, Paper, Typography, Box, InputAdornment 
} from '@mui/material';

export default function PolicyForm({ form, setForm, onCalculate }) {
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <Paper elevation={2} sx={{ p: 4, mt: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Policy Parameters
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Policy Type"
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
          >
            <MenuItem value="Term">Term Life Insurance</MenuItem>
            <MenuItem value="ULIP">ULIP (Unit Linked)</MenuItem>
            <MenuItem value="Endowment">Endowment Plan</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={(e) => set('dob', e.target.value)}
            helperText="Age will be calculated based on completed years"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Sum Assured"
            value={form.sumAssured}
            onChange={(e) => set('sumAssured', Number(e.target.value))}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Premium Amount"
            value={form.premiumAmount}
            onChange={(e) => set('premiumAmount', Number(e.target.value))}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Payment Frequency"
            value={form.premiumFrequency}
            onChange={(e) => set('premiumFrequency', e.target.value)}
          >
            <MenuItem value="Yearly">Yearly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Policy Term (Years)"
            value={form.termYears}
            onChange={(e) => set('termYears', Number(e.target.value))}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Enter full name for record"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Mobile Number"
            value={form.mobile}
            onChange={(e) => set('mobile', e.target.value)}
            inputProps={{ maxLength: 10 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={onCalculate}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              Calculate Illustration
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}