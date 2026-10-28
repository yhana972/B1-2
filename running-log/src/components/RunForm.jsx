import { useState } from "react";
import FormField from "./FormField";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router"
import ErrorState from '../components/ErrorState'
import SubmitButton from "./SubmitButton";

// initialData는 기존 기록, mode는 작성(create)과 수정(edit)을 구분하는 props입니다.
function RunForm({initialData = {}, mode = 'create'}){
    // useState 초기값은 첫 마운트에 사용됩니다. props 변경만으로 편집 중 입력값을 덮어쓰지 않습니다.
    // DB의 snake_case를 폼의 camelCase로 바꾸고, null/undefined는 빈 문자열로 채웁니다.
    const [formData, setFormData] = useState({
        date : initialData.date??'',
        distance : initialData.distance??'',
        duration : initialData.duration??'',
        avgPace : initialData.avg_pace??'',
        avgCadence : initialData.avg_cadence??'',
    })

    // 필드별 오류와 서버 저장 실패를 구분해, 실패해도 입력값을 유지하고 재시도할 수 있게 합니다.
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const navigate = useNavigate()
    // props에서 계산할 수 있는 값이라 별도 state가 필요하지 않습니다.
    const isEdit = mode === 'edit'

    // input의 name으로 변경할 필드를 선택합니다. 객체를 직접 수정하지 않고 새 객체로 state를 갱신합니다.
    function handleChange(event){
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })

        // 다시 입력하는 필드의 오류만 비우고 다른 필드의 오류는 유지합니다.
        if(errors[name]){
            setErrors({
                ...errors,
                [name]:''
            })
        }   
    }

    // form 제출 시 실행되는 함수
    async function handleSubmit(event){
        const newErrors = { }
        
        // 기본 폼 제출에 따른 문서 이동을 막고 아래 비동기 저장 흐름을 실행합니다.
        event.preventDefault();
        
        // 현재는 필수값 검증입니다. 시간 형식과 양수 범위까지 검사하는 로직은 아닙니다.
        if(!formData.date){
            newErrors.date="날짜를 입력해주세요."
        }
        if(!formData.distance){
            newErrors.distance="거리(km)를 입력해주세요."
        }
        if(!formData.duration){
            newErrors.duration="시간(분:초)을 입력해주세요."
        }
        if(!formData.avgPace){
            newErrors.avgPace="평균 페이스를 입력해주세요."
        }
        if(!formData.avgCadence){
            newErrors.avgCadence="평균 케이던스를 입력해주세요."
        }     
        
        // 에러가 있으면 제출하지 않고 에러 메시지 표시
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return
        }

        // 에러가 없으면 제출
        setErrors({});
        setSubmitError('');
        setIsSubmitting(true);


        try{
            // 현재 입력값을 DB 컬럼명으로 변환합니다. 숫자 input도 변경 이벤트에서는 문자열을 전달합니다.
            const recordData = { 
                date:formData.date,
                distance:Number(formData.distance),
                duration:formData.duration,
                avg_pace:formData.avgPace,
                avg_cadence:Number(formData.avgCadence)
            }

            if(isEdit){
                //기존 기록 수정
                const {data, error} = await supabase
                .from('running_records')
                .update(recordData)
                // UPDATE는 반드시 수정 대상을 지정합니다.
                .eq('id', initialData.id)
                .select()

                if(error){
                    throw error;
                }

                // 권한 정책 등으로 0개가 수정돼도 error가 없을 수 있으므로 결과도 확인합니다.
                if(data.length === 0 ){
                    throw new Error('수정된 기록이 없습니다.')
                }

                // 이동한 상세 페이지가 다시 SELECT하여 저장된 최신 값을 표시합니다.
                navigate(`/runs/${initialData.id}`)
            }else{
                //새 기록 저장
                 //서버 요청
                const {error} = await supabase
                .from('running_records')
                .insert([recordData])

                if(error){
                    throw error;
                }
                // 목록 페이지가 마운트되면서 SELECT를 다시 실행해 새 기록을 보여줍니다.
                navigate('/runs')
            }
        }
        catch(error){
            setSubmitError("기록 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
            console.error(error);
        }
        // 성공·실패와 관계없이 제출 중 상태를 해제합니다.
        finally{
            setIsSubmitting(false);
        }
    }
    return(
        <form className="run-form" onSubmit={handleSubmit}>
            <FormField
                label="날짜"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
            />
            <FormField
                label="거리(km)"
                type="number"
                step="0.01"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                error={errors.distance}
            />
            <FormField 
                label="시간(분:초)"
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                error={errors.duration}
            />
            <FormField 
                label="평균 페이스"
                type="text"
                name="avgPace"
                value={formData.avgPace}
                onChange={handleChange}
                error={errors.avgPace}
            />
            <FormField 
                label="평균 케이던스"
                type="number"
                name="avgCadence"
                value={formData.avgCadence}
                onChange={handleChange}
                error={errors.avgCadence}
            />
            {submitError && <ErrorState message={submitError}/>}
            <SubmitButton isSubmitting={isSubmitting} label={isEdit? '수정하기':'기록하기'}/>
        </form>
    )
}
export default RunForm
