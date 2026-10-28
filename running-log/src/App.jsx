import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RunListPage from './pages/RunListPage'
import RunCreatePage from './pages/RunCreatePage' 
import RunDetailPage from './pages/RunDetailPage'
import RunEditPage from './pages/RunEditPage'
import NotFoundPage from './pages/NotFoundPage'

// 페이지 공통 틀은 Layout에 두고, URL에 따라 바뀌는 화면만 Routes가 선택합니다.
function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/runs" element={<RunListPage />} />
        <Route path="/runs/new" element={<RunCreatePage />} />
        <Route path="/runs/:id" element={<RunDetailPage />} />
        <Route path="/runs/:id/edit" element={<RunEditPage/>} />
        {/* 등록된 경로와 맞지 않는 주소는 NotFoundPage로 안내합니다. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
