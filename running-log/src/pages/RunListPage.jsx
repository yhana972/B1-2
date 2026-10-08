import { Link } from "react-router";
import RunCard from "../components/RunCard";
import { useState, useEffect } from "react";

const mockRuns = [
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

function RunListPage(){
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            const shouldFail = false

            if(shouldFail){
                setError('러닝 기록을 불러오는데 실패했습니다.');
                setLoading(false);
                return;
            }
            setRuns(mockRuns);
            setLoading(false);
        }, 2000)

        return () => {clearTimeout(timer)}
    }, [])

    return(
        <section className="recent_record">
            <h2>최근 러닝</h2>
            <Link className="button" to="/runs/new">
                새 기록 작성
            </Link>
            {
                loading
                ?(<p>러닝 기록을 불러오는 중...</p>)
                :error
                    ?(<p>{error}</p>)
                    :runs.length === 0 
                        ? (<p>아직 러닝 기록이 없습니다.</p>) 
                        :runs.map((run) => (
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