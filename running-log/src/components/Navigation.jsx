import { Link } from "react-router";

// Link는 브라우저 전체 문서를 새로 받지 않고 React Router를 통해 앱 내부 경로를 이동합니다.
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