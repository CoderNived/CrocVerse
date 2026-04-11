import { Routes, Route } from 'react-router-dom'
import PageWrapper from './components/layout/PageWrapper'
import HomePage from './pages/Home'
import SpeciesDetailPage from './pages/SpeciesDetail'
import MLToolsPage from './pages/MLTools'
import DashboardPage from './pages/Dashboard'

export default function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/species/:id" element={<SpeciesDetailPage />} />
        <Route path="/ml-tools" element={<MLToolsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </PageWrapper>
  )
}