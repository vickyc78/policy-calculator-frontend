import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ email:'', password:'', nameMasked:'', mobileMasked:'', dobMasked:'' });
  const [msg, setMsg] = useState(''); const [error, setError] = useState('');
  const set = (k,v) => setForm(prev => ({ ...prev, [k]: v }));
  const submit = async e => {
    e.preventDefault(); setError(''); setMsg('');
    try {
        const url=`http://localhost:3000/api/auth/register`
      await axios.post(url, form);
      setMsg('Registered. Please login.');
    } catch (err) {
      setError(err.response?.data?.error || 'Register failed');
    }
  };
  return (
    <form onSubmit={submit}>
      <h3>Register</h3>
      {msg && <div style={{ color:'green' }}>{msg}</div>}
      {error && <div style={{ color:'red' }}>{error}</div>}
      <input placeholder="Email" value={form.email} onChange={e=>set('email', e.target.value)} />
      <input type="password" placeholder="Password" value={form.password} onChange={e=>set('password', e.target.value)} />
      <input placeholder="Name" value={form.name} onChange={e=>set('name', e.target.value)} />
      <input placeholder="Mobile (10 digits)" value={form.mobile} onChange={e=>set('mobile', e.target.value)} />
      <input type="date" placeholder="DOB" value={form.dob} onChange={e=>set('dob', e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
