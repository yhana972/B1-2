import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient';

// 상세·수정 페이지의 단건 조회를 공유하는 Custom Hook입니다. UI 대신 state를 반환합니다.
function useRun(id){
    // 단건 결과는 배열이 아니라 객체 또는 null입니다. 목록처럼 length로 검사하지 않습니다.
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        // 각 Effect 실행마다 별도 변수를 가집니다. 이전 요청의 늦은 응답이 새 state를 덮어쓰지 않게 합니다.
        let ignore = false

        async function fetchRun(){
            //새요청 시 상태 초기화
            setLoading(true);   //다시 로딩 화면 표시
            setError('');       //이전 요청의 오류 제거
            setRun(null);       //이전 기록 제거

            try{
                // [SELECT: 단건 조회] 아래 SQL과 같은 조회 의도입니다. 실제 SQL 문자열을 보내는 코드는 아닙니다.
                // SELECT * FROM running_records WHERE id = :id;
                // :id는 설명용 매개변수 표시입니다. 실제 값은 .eq()의 두 번째 인자로 전달합니다.
                // RLS 정책이 현재 요청에 허용한 행만 조회할 수 있습니다.
                const { data, error } = await supabase
                    .from('running_records') // 조회할 테이블을 선택합니다.
                    .select('*') // 해당 행의 모든 컬럼을 요청합니다.
                    .eq('id', id) // WHERE id = 전달받은 id: 값이 같은 행만 남깁니다.
                    // 0행은 null, 1행은 객체로 받습니다. 2행 이상이면 오류이며, 첫 행만 고르는 기능은 아닙니다.
                    .maybeSingle()
                // data는 조회 결과, error는 요청 실패 정보입니다. 정상적인 0행 결과는 오류와 구분합니다.
                // Supabase 응답 error를 catch로 전달합니다. await 자체가 브라우저 전체를 멈추지는 않습니다.
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
        // id 변경으로 다음 Effect를 실행하기 전, 또는 화면을 떠날 때 실행하는 cleanup입니다.
        // 요청 자체를 취소하지 않고 이후 응답의 state 갱신을 무시합니다.
        return () => {
                ignore = true
        }
    },[id]) // 최초 실행 후 id가 달라지면 다시 조회합니다.

    // 호출하는 페이지가 조회 상태에 맞는 Loading/Error/Empty/성공 UI를 선택합니다.
    return {run, loading, error}
}
export default useRun
