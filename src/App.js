import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PolicyCalc from './pages/PolicyCalc';
// import Illustration from './pages/Illustration';

import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box>
      <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff', color: '#000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            INSURE-CALC
          </Typography>
          <Box>
            <Button component={Link} to="/calc" color="inherit">Calculator</Button>
            {/* <Button component={Link} to="/illustration" color="inherit">Illustration</Button> */}
            <Button component={Link} to="/login" variant="outlined" sx={{ ml: 2 }}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
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
        {/* <Route path="/illustration" element={<RequireAuth><Illustration /></RequireAuth>} /> */}
        <Route path="*" element={<Navigate to="/calc" replace />} />
      </Routes>
    </Layout>
  );
}
