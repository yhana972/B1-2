import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RunListPage from './pages/RunListPage'
import RunCreatePage from './pages/RunCreatePage' 
import RunDetailPage from './pages/RunDetailPage'
import RunEditPage from './pages/RunEditPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/runs" element={<RunListPage />} />
        <Route path="/runs/new" element={<RunCreatePage />} />
        <Route path="/runs/:id" element={<RunDetailPage />} />
        <Route path="/runs/:id/edit" element={<RunEditPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
