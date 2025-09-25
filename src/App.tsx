import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlanProvider } from './contexts/PlanContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PlanSelectionPage from './pages/PlanSelectionPage';
import Dashboard from './pages/Dashboard';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <PlanProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/plans" element={<PlanSelectionPage />} />
              <Route path="/checkout/:planId" element={<CheckoutPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </PlanProvider>
    </AuthProvider>
  );
}

export default App;