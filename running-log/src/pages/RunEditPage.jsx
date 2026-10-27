import { useParams } from 'react-router'
import RunForm from '../components/RunForm';
import useRun from '../hooks/useRun';

function RunEditPage(){
    const { id } = useParams();
    const { run, loading, error } = useRun(id);

    return (
        <section className="record_edit">
            <h1>러닝 기록 수정</h1>
            <p>수정할 기록 ID : {id}</p>
            {
                loading
                ?(<p>러닝 기록을 불러오는 중...</p>)
                :error
                    ?(<p>{error}</p>)
                    :run === null
                        ?(<p>러닝 기록을 찾을 수 없습니다.</p>)
                        :<>
                            <RunForm initialData={run} mode="edit"/>
                        </>
            }
        </section>
    )
}
export default RunEditPage;