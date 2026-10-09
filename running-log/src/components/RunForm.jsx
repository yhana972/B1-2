import { useState } from "react";
import FormField from "./FormField";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router"

function RunForm(){
    const [formData, setFormData] = useState({
        date : '',
        distance : '',
        duration : '',
        avgPace : '',
        avgCadence : '',
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const navigate = useNavigate()

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
            newErrors.duration="시간(분)을 입력해주세요."
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
            const {error} = await supabase
            .from('running_records')
            .insert([{
                date:formData.date,
                distance:Number(formData.distance),
                duration:formData.duration,
                avg_pace:formData.avgPace,
                avg_cadence:Number(formData.avgCadence)
            }])

            if(error){
                throw error;
            }
            navigate('/runs')
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
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                error={errors.distance}
            />
            <FormField 
                label="시간(분)"
                type="number"
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
            {submitError && <p className="error">{submitError}</p>}
            <button type="submit" disabled={isSubmitting}>{isSubmitting? '저장 중...' : '기록하기'}</button>
        </form>
    )
}
export default RunForm