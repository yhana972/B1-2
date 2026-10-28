import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";

// index.html의 root 요소에 앱을 연결합니다. BrowserRouter가 하위 컴포넌트에 라우팅 환경을 제공합니다.
// StrictMode는 개발 중 Effect의 setup/cleanup 등을 추가 실행해 문제를 발견하도록 돕습니다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
