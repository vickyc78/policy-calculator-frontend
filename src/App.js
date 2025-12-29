import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PolicyCalc from './pages/PolicyCalc';
import Illustration from './pages/Illustration';

function Layout({ children }) {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/calc" style={{ marginRight: 10 }}>Policy Calculation</Link>
        <Link to="/illustration" style={{ marginRight: 10 }}>Illustration</Link>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calc" element={<RequireAuth><PolicyCalc /></RequireAuth>} />
        <Route path="/illustration" element={<RequireAuth><Illustration /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/calc" replace />} />
      </Routes>
    </Layout>
  );
}
