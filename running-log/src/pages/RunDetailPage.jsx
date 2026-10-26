import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../lib/supabaseClient';
import RunCard from '../components/RunCard';

function RunDetailPage() {
    const { id } = useParams();
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        async function fetchRun(){
            try{
                const {data, error } = await supabase
                    .from('running_records')
                    .select('*')
                    .eq('id', id)
                    .maybeSingle()
                if(error) throw error;
                setRun(data);
            }catch(error){
                setError('러닝 기록을 불러오던 중 오류가 발생했습니다.');
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchRun();
    },[id])

    return (
        <section className="record_detail">
            <h2>러닝 상세 기록</h2>
            {
                loading
                ?(<p>러닝 기록을 불러오는 중...</p>)
                :error
                    ?(<p>{error}</p>)
                    :run === null
                        ?(<p>러닝 기록을 찾을 수 없습니다.</p>)
                        :<>
                            <RunCard
                                id = {run.id}
                                date={run.date}
                                distance={run.distance}
                                duration={run.duration}
                                cadence={run.avg_cadence}
                            />
                            <div className='recommend_bpm'>
                                <h2>추천 음악 BPM</h2>
                                <p>{run.avg_cadence - 5}~{run.avg_cadence + 5} BPM</p>
                            </div>
                        </>
            }
        </section>
    )
}
export default RunDetailPage;