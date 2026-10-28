import { Link } from "react-router";
import RunCard from "../components/RunCard";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

function RunListPage(){
    // 목록은 여러 기록이므로 배열로 관리하고, JSX에서 map으로 RunCard를 만듭니다.
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 페이지 마운트 후 원격 데이터를 조회합니다. 개발 StrictMode에서는 추가 실행될 수 있습니다.
    useEffect(() => {
        async function fetchRuns(){
            try{
                // [SELECT: 목록 조회] SQL로 보면 SELECT * FROM running_records ORDER BY date DESC;
                // Supabase 클라이언트가 Data API 요청을 구성합니다. 조회 범위는 RLS 정책도 적용받습니다.
                const { data, error } = await supabase
                    .from('running_records') // 대상 테이블을 지정합니다.
                    .select('*') // 각 기록의 모든 컬럼을 가져옵니다.
                    .order('date', {ascending: false}); // ORDER BY date DESC: 날짜가 최신인 기록부터 정렬합니다.
                // 성공 시 data는 행 객체들의 배열입니다. 기록이 없으면 빈 배열 []을 받습니다.
                if(error) throw error;
                // state가 바뀌면 다시 렌더링되어 조회한 기록이 목록에 반영됩니다.
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
            {/* 로딩 → 오류 → 빈 배열 → 목록 순서로 구분해 실패와 빈 결과를 혼동하지 않습니다. */}
            {
                loading
                ?(<Loading message={"러닝 기록을 불러오는 중..."}/>)
                :error
                    ?(<ErrorState message={error}/>)
                    :runs.length === 0 
                        ? (<EmptyState message={"아직 러닝 기록이 없습니다."}/>) 
                        :runs.map((run) => (
                            <RunCard
                                key={run.id}    //key는 React가 목록 항목을 구분하는 특별한 값이어서 컴포넌트 내부의 props로 전달되지 않음. 
                                id={run.id}     //카드가 이동 주소를 만들려면 id를 별도로 받아야 함. 
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
