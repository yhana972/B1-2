import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient';

function useRun(id){
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

    return {run, loading, error}
}
export default useRun