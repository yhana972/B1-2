import { useState } from 'react'
import { useParams, Link } from 'react-router'
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from "react-router"
import RunCard from '../components/RunCard';
import useRun from '../hooks/useRun';
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'


function RunDetailPage() {
    // 주소의 id를 Hook에 전달해 이 기록 하나를 조회합니다.
    const { id } = useParams();
    const {run, loading, error} = useRun(id)
    // 삭제 실패가 상세 조회 결과를 없애지 않도록 조회 오류와 별도로 관리합니다.
    const [isDeleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const navigate = useNavigate()

    async function handleDelete(){
        const confirmed = window.confirm('러닝 기록을 삭제하시겠습니까?')
        
        // 취소하면 네트워크 요청 전에 함수를 종료합니다.
        if(!confirmed) return

        setDeleteError('');
        setDeleting(true);

        try{
            const { data, error } = await supabase
                .from('running_records')
                .delete()
                // 현재 기록만 삭제하고, 삭제된 ID를 반환받아 실제 처리 여부를 확인합니다.
                .eq('id', run.id)
                .select('id')
            if(error) throw error;

            // error가 없어도 삭제 결과가 0개면 성공으로 이동하지 않습니다.
            if(data.length===0){
                throw new Error('삭제된 기록이 없습니다.')
            }
            // 이동한 목록에서 SELECT를 다시 수행하므로 삭제한 카드가 사라집니다.
            navigate('/runs')
        }catch(error){
            console.error(error);
            setDeleteError('기록 삭제 중 오류가 발생했습니다. 다시 시도해주세요.')
        }finally{
            // 실패해도 버튼을 다시 활성화해 재시도할 수 있게 합니다.
            setDeleting(false);
        }
    }

    return (
        <section className="record_detail">
            <h2>러닝 상세 기록</h2>
            {
                loading
                ?(<Loading message={"러닝 기록을 불러오는 중..."}/>)
                :error
                    ?(<ErrorState message={error}/>)
                    :run === null
                        ?(<EmptyState message={"러닝 기록을 찾을 수 없습니다."}/>)
                        :<>
                            <RunCard
                                id = {run.id}
                                date={run.date}
                                distance={run.distance}
                                duration={run.duration}
                                cadence={run.avg_cadence}
                            />
                            {/* run이 있을 때만 계산합니다. 케이던스에서 계산 가능한 값은 별도 state가 필요 없습니다. */}
                            <div className='recommend_bpm'>
                                <h2>추천 음악 BPM</h2>
                                <p>{run.avg_cadence - 5}~{run.avg_cadence + 5} BPM</p>
                            </div>
                            <Link className='button' to={`/runs/${run.id}/edit`}>기록 수정</Link>
                            {deleteError && <ErrorState message={deleteError}/>}
                            <button type='button' onClick={handleDelete} disabled={isDeleting}>{isDeleting?"삭제 중...":"기록 삭제"}</button>
                        </>
            }
        </section>
    )
}
export default RunDetailPage;