import { Link } from "react-router";

// 경로 자체가 없을 때 표시합니다. 유효한 상세 경로에서 기록만 없는 경우와는 다릅니다.
function NotFoundPage(){
    return(
       <section className="not_found">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>페이지를 찾을 수 없습니다. 홈으로 돌아가세용.</p>
        <Link className="button" to={'/'}>홈으로 이동</Link>
       </section>
    )
}
export default NotFoundPage;