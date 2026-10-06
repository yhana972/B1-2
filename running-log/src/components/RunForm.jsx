import { useState } from "react";

function RunForm(){
    const [formData, setFormData] = useState({
        date : '',
        distance : '',
        duration : '',
        avgPace : '',
        avgCadence : '',
    })

    const [error, setError] = useState('');

    function handleChange(event){
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        
        if(!formData.date || !formData.distance || !formData.duration || !formData.avgPace || !formData.avgCadence){
            setError('필수 항목을 모두 입력해주세요.');
        }else{
            setError('');
            console.log(formData)
        }
    }
    return(
        <form className="run-form" onSubmit={handleSubmit}>
            <input type="date" name="date" value={formData.date} onChange={handleChange}/>
            <input type="text" name="distance" value={formData.distance} onChange={handleChange}/>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange}/>
            <input type="text" name="avgPace" value={formData.avgPace} onChange={handleChange}/>
            <input type="text" name="avgCadence" value={formData.avgCadence} onChange={handleChange}/>
            {error && <p className="error">{error}</p> }
            <button type="submit">기록하기</button>
        </form>
    )
}
export default RunForm