import { Link } from "react-router"

// 부모에게 받은 props를 표시합니다. 카드 자체는 기록 데이터를 수정하거나 조회하지 않습니다.
// 목록의 key는 컴포넌트 props로 전달되지 않으므로 이동 주소에 사용할 id를 별도로 받습니다.
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