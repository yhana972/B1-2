import './App.css'
import RunCard from './components/RunCard'
import RunForm from './components/RunForm'

function App() {
  const runs = [
    {
      id : 1,
      date : "2026.09.19",
      distance : 5.03,
      duration : "31:24",
      cadence : 172
    },
    {
      id : 2,
      date : "2026.09.25",
      distance : 3.21,
      duration : "20:15",
      cadence : 168
    },
    {
      id : 3,
      date : "2026.09.28",
      distance : 7.00,
      duration : "45:10",
      cadence : 175
    }
  ]
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
          {
            runs.length === 0 ? (
              <p>아직 러닝 기록이 없습니다.</p>
            ) :
            runs.map((run) => (
              <RunCard
                key={run.id}
                date={run.date}
                distance={run.distance}
                duration={run.duration}
                cadence={run.cadence}
              />
            ))
          }
        </section>
        <section className="run_form">
          <h2>새 러닝 기록</h2>
          <RunForm />
        </section>
      </main>
    </>
  )
}

export default App
