import { Link } from "react-router";

function Navigation(){
    return(
        <nav>
            <Link to="/">홈</Link>
            <Link to="/runs">러닝 기록</Link>
            <Link to="/runs/new">새 기록 작성</Link>
        </nav>
    )
}
export default Navigation