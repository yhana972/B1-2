import RunCard from "../components/RunCard";
function RunListPage(){
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
    return(
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
    )
}
export default RunListPage