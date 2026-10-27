import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient';
import RunForm from '../components/RunForm';

function RunEditPage(){
    const { id } = useParams();
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        async function fetchRun(){
            try{
                const{data, error} = await supabase
                    .from('running_records')
                    .select('*')
                    .eq('id',id)
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