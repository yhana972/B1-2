import { useState } from "react";
import FormField from "./FormField";

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

    // form 제출 시 유효성 검사 및 제출 처리
    function handleSubmit(event){
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
        setIsSubmitting(true);
        setTimeout(()=>{
            console.log(formData)
            setIsSubmitting(false);
        }, 2000) //2초 기다림
            
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
            <button type="submit" disabled={isSubmitting}>{isSubmitting? '저장 중...' : '기록하기'}</button>
        </form>
    )
}
export default RunForm