import { useState } from "react";
import FormField from "./FormField";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router"
import ErrorState from '../components/ErrorState'
import SubmitButton from "./SubmitButton";

function RunForm({initialData = {}, mode = 'create'}){
    const [formData, setFormData] = useState({
        date : initialData.date??'',
        distance : initialData.distance??'',
        duration : initialData.duration??'',
        avgPace : initialData.avg_pace??'',
        avgCadence : initialData.avg_cadence??'',
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const navigate = useNavigate()
    const isEdit = mode === 'edit'

    // input 값이 변경될 때마다 formData 상태를 업데이트
    function handleChange(event){
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })

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
        
        event.preventDefault();
        
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
            //데이터 준비
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
                .eq('id', initialData.id)
                .select()

                if(error){
                    throw error;
                }

                if(data.length === 0 ){
                    throw new Error('수정된 기록이 없습니다.')
                }

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
                navigate('/runs')
            }
        }
        catch(error){
            setSubmitError("기록 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
            console.error(error);
        }
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
