import React, { useState } from 'react';
import axios from 'axios';

export default function Illustration() {
  const token = localStorage.getItem('token');
  const [rows, setRows] = useState([]);
  const [formJSON, setFormJSON] = useState('{}');
  const [error, setError] = useState('');

  const generate = async () => {
    setError('');
    try {
      const payload = JSON.parse(formJSON);
      const { data } = await axios.post('/api/policies/calculate', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRows(data.illustration || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid JSON or server error');
    }
  };

  return (
    <div>
      <h3>Illustration</h3>
      <p>Paste input JSON (matches calculation form fields) to render dynamic table.</p>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <textarea rows={6} style={{ width: '100%' }} value={formJSON} onChange={e=>setFormJSON(e.target.value)} />
      <button onClick={generate}>Generate Table</button>
      {rows.length > 0 && (
        <table border="1" cellPadding="6" style={{ marginTop: 10, width: '100%' }}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Age</th>
              <th>Premium Paid To Date</th>
              <th>Accumulated Value</th>
              <th>Projected Benefit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.year}>
                <td>{r.year}</td>
                <td>{r.age}</td>
                <td>{r.premiumPaidToDate}</td>
                <td>{r.accumulatedValue}</td>
                <td>{r.projectedBenefit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
