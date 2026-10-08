import { useState } from "react";

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

    function handleChange(event){
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
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
            <input type="date" name="date" value={formData.date} onChange={handleChange}/>
            {errors.date && (
                <p className="error">{errors.date}</p>
            )}
            <input type="text" name="distance" value={formData.distance} onChange={handleChange}/>
            {errors.distance && (
                <p className="error">{errors.distance}</p>
            )}
            <input type="text" name="duration" value={formData.duration} onChange={handleChange}/>
            {errors.duration && (
                <p className="error">{errors.duration}</p>
            )}
            <input type="text" name="avgPace" value={formData.avgPace} onChange={handleChange}/>
            {errors.avgPace && (
                <p className="error">{errors.avgPace}</p>
            )}
            <input type="text" name="avgCadence" value={formData.avgCadence} onChange={handleChange}/>
            {errors.avgCadence && (
                <p className="error">{errors.avgCadence}</p>
            )}
            <button type="submit" disabled={isSubmitting}>{isSubmitting? '저장 중...' : '기록하기'}</button>
        </form>
    )
}
export default RunForm