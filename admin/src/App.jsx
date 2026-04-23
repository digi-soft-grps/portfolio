import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Customers from './pages/Customers';
import Leads from './pages/Leads';
import FeedbackManager from './pages/FeedbackManager';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      {/* Toast container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        hideProgressBar={false}
      />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes with Persistent Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/feedback" element={<FeedbackManager />} />
        </Route>

        {/* Redirect root to login for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
