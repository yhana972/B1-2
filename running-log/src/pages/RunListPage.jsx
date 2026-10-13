import { Link } from "react-router";
import RunCard from "../components/RunCard";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function RunListPage(){
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchRuns(){
            try{
                const { data, error } = await supabase
                    .from('running_records')
                    .select('*')
                    .order('date', {ascending: false}); // 최근 기록이 먼저 보이도록 내림차순 정렬
                if(error) throw error;
                setRuns(data);
            }catch(error){
                setError('러닝 기록을 불러오는 중 오류가 발생했습니다.');
                console.error(error);
            }finally{
                setLoading(false);
            }
        }

        fetchRuns();
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
                                cadence={run.avg_cadence}
                            />
                        ))
            }
        </section>
    )
}
export default RunListPage