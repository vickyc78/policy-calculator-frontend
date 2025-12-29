import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async e => {
    e.preventDefault(); setError('');
    try {
        const url=`http://localhost:3000/api/auth/login`
      const { data } = await axios.post(url, { email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/calc';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };
  return (
    <form onSubmit={submit}>
      <h3>Login</h3>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
