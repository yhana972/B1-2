import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient';

function useRun(id){
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        //이전 요처으이 늦은 응답 무시
        let ignore = false

        async function fetchRun(){
            //새요청 시 상태 초기화
            setLoading(true);   //다시 로딩 화면 표시
            setError('');       //이전 요청의 오류 제거
            setRun(null);       //이전 기록 제거

            try{
                const { data, error } = await supabase
                    .from('running_records')
                    .select('*')
                    .eq('id', id)
                    .maybeSingle()
                if(error) throw error;
                if(!ignore) setRun(data);
            }catch(error){
                if(!ignore){
                    setError('러닝 기록을 불러오던 중 오류가 발생했습니다.');
                    console.error(error);
                }
            }finally{
                if(!ignore) setLoading(false);
            }
        }
        fetchRun();
        return () => {
                ignore = true
        }
    },[id])

    return {run, loading, error}
}
export default useRun