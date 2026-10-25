import { Link } from "react-router"

function RunCard({id, date, distance, duration, cadence}){
    return (
        <Link className="runcard" to={`/runs/${id}`}>
            <p className="record date">{date}</p>
            <p className="record distance">{distance} km</p>
            <p className="record duration">{duration}</p>
            <p className="record cadence"> 평균 케이던스 {cadence} spm</p>
        </Link>
    )
}
export default RunCard