import { useParams } from 'react-router'
import RunForm from '../components/RunForm';
import useRun from '../hooks/useRun';
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

function RunEditPage(){
    // URL의 :id 값을 읽어 조회 Hook에 전달합니다. id는 URL에서 가져온 문자열입니다.
    const { id } = useParams();
    // Hook은 조회 로직을 공유하지만 호출하는 페이지마다 독립적인 state를 가집니다.
    const { run, loading, error } = useRun(id);

    return (
        <section className="record_edit">
            <h1>러닝 기록 수정</h1>
            <p>수정할 기록 ID : {id}</p>
            {/* 조회 완료 후 기록이 있을 때 폼을 마운트해야 기존 값이 최초 state에 반영됩니다. */}
            {
                loading
                ?(<Loading message={"러닝 기록을 불러오는 중..."}/>)
                :error
                    ?(<ErrorState message={error}/>)
                    :run === null
                        ?(<EmptyState message={"러닝 기록을 찾을 수 없습니다."}/>)
                        :<>
                            <RunForm initialData={run} mode="edit"/>
                        </>
            }
        </section>
    )
}
export default RunEditPage;