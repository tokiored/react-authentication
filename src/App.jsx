import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
/**
 * Authentication
 */
import { AuthProvider } from './auth/AuthProvider'
import ProtectedRoute from './auth/ProtectedRoute'
/*
 * Page Components & Styles
 */
import Login from './public/Login'
import Navigation from './public/Navigation'
import NotFound from './public/NotFound'
import Dashboard from './private/Dashboard'
import Profile from './private/Profile'
import './App.css'

function App() {
  return (
    <>
      <h1>Tokiored</h1>

      <Router>
        <AuthProvider>
          <Navigation />

          <Routes>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
