import './App.css'
import RunCard from './components/RunCard'

function App() {
  return (
    <>
      <main className="main">
        <section className="hero">
          <h1>Running Log</h1>
          <p>
            나의 러닝을 기록하고<br />
            케이던스에 맞는 음악 템포를 찾아보세요.
          </p>
          <button className="button" type="button">
            러닝 기록 보기
          </button>
          <button className="button" type="button">
            새 기록 작성
          </button>
          
        </section>
        <section className="recent_record">
          <h2>최근 러닝</h2>
          <RunCard />
        </section>
      </main>
    </>
  )
}

export default App
