import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import RunListPage from './pages/RunListPage'
import RunCreatePage from './pages/RunCreatePage'

function App() {
  
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/runs" element={<RunListPage />} />
        <Route path="/runs/new" element={<RunCreatePage />} />
      </Routes>        
    </main>
  )
}

export default App
