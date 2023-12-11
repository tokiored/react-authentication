import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
/**
 * Authentication
 */
import { AuthProvider } from './auth/AuthProvider'
import ProtectedRoute from './auth/ProtectedRoute'
/*
 * Page Components & Styles
 */
import Home from './public/Home'
import Navigation from './public/Navigation'
import NotFound from './public/NotFound'
import Dashboard from './private/Dashboard'
import Profile from './private/Profile'
import './App.css'

function App() {
  return (
    <>
      <h1>React Router</h1>

      <Router>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route
              path="Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
