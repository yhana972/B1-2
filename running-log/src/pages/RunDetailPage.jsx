import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from "react-router"
import RunCard from '../components/RunCard';


function RunDetailPage() {
    const { id } = useParams();
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDeleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const navigate = useNavigate()

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

    async function handleDelete(){
        const confirmed = window.confirm('러닝 기록을 삭제하시겠습니까?')
        
        if(!confirmed) return

        setDeleteError('');
        setDeleting(true);

        try{
            const { data, error } = await supabase
                .from('running_records')
                .delete()
                .eq('id', run.id)
                .select('id')
            if(error) throw error;

            if(data.length===0){
                throw new Error('삭제된 기록이 없습니다.')
            }
            navigate('/runs')
        }catch(error){
            console.error(error);
            setDeleteError('기록 삭제 중 오류가 발생했습니다. 다시 시도해주세요.')
        }finally{
            setDeleting(false);
        }
    }

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
                            <Link className='button' to={`/runs/${run.id}/edit`}>기록 수정</Link>
                            {deleteError && <p className='error'>{deleteError}</p>}
                            <button type='button' onClick={handleDelete} disabled={isDeleting}>{isDeleting?"삭제 중...":"기록 삭제"}</button>
                        </>
            }
        </section>
    )
}
export default RunDetailPage;