function RunCard({date, distance, duration, cadence}){
    return (
        <div className="runcard">
            <p className="record date">{date}</p>
            <p className="record distance">{distance} km</p>
            <p className="record duration">{duration}</p>
            <p className="record cadence"> 평균 케이던스 {cadence} spm</p>
        </div>
    )
}
export default RunCard