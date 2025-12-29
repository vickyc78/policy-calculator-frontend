import React, { useState } from 'react';
import axios from 'axios';
import PolicyForm from '../components/PolicyForm';

export default function PolicyCalc() {
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    type: 'Term', dob: '', sumAssured: 500000, premiumAmount: 10000,
    premiumFrequency: 'Yearly', termYears: 10, name: '', mobile: '', riders: []
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const onCalculate = async () => {
    setError(''); setResult(null);
    try {
      const { data } = await axios.post('/api/policies/calculate', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed');
    }
  };

  return (
    <div>
      <h3>Policy Calculation</h3>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <PolicyForm form={form} setForm={setForm} onCalculate={onCalculate} />
      <button onClick={async () => {
        try {
          const { data } = await axios.post('/api/policies/save', form, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert(`Saved with id ${data.id}`);
        } catch (e) { alert('Save failed'); }
      }}>Save Policy</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
