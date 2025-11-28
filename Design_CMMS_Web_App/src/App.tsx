import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { JSX } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AssetList from './pages/AssetList';
import AssetDetail from './pages/AssetDetail';
import WorkOrderList from './pages/WorkOrderList';
import WorkOrderDetail from './pages/WorkOrderDetail';
import PMList from './pages/PMList';
import PMCreate from './pages/PMCreate';
import Reports from './pages/Reports';
import SOPLibrary from './pages/SOPLibrary';
import AdminSettings from './pages/AdminSettings';
import Layout from './components/layout/Layout';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { Button } from './components/ui/button';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Login/>
            } 
          />
          <Route path="/signup" element={localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            <Route path="/work-orders" element={<WorkOrderList />} />
            <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
            <Route path="/preventive-maintenance" element={<PMList />} />
            <Route path="/preventive-maintenance/create" element={<PMCreate />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/sop-library" element={<SOPLibrary />} />
            <Route path="/admin" element={<AdminSettings />} />
            <Route path="/logout" element={<Button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</Button>} />
          </Route>
        </Routes>
      </Router>
      <Toaster/>
    </ThemeProvider>
  );
}
