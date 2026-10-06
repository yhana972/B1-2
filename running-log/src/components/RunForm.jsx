import { useState } from "react";

function RunForm(){
    const [formData, setFormData] = useState({
        date : '',
        distance : '',
        duration : '',
        avgPace : '',
        avgCadence : '',
    })

    function handleChange(event){
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    return(
        <form className="run-form">
            <input type="date" name="date" value={formData.date} onChange={handleChange}/>
            <input type="text" name="distance" value={formData.distance} onChange={handleChange}/>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange}/>
            <input type="text" name="avgPace" value={formData.avgPace} onChange={handleChange}/>
            <input type="text" name="avgCadence" value={formData.avgCadence} onChange={handleChange}/>
            <button type="submit">기록하기</button>
        </form>
    )
}
export default RunForm