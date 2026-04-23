import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/Dashboard'
import { LandingPage } from './pages/landing/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

