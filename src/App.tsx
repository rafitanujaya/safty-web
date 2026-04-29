import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/Dashboard'
import { LandingPage } from './pages/landing/LandingPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ProtectionLogPage } from './pages/protection-log/ProtectionLogPage'
import { HistoryPage } from './pages/history/HistoryPage'
import { EducationPage } from './pages/education/EducationPage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { FileProtectionPage } from './pages/file-protection/FileProtectionPage'
import { ImageForensicPage } from './pages/image-forensic/ImageForensicPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/protection-log" element={<ProtectionLogPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/file-protection" element={<FileProtectionPage />} />
        <Route path="/image-forensic" element={<ImageForensicPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
