import { Link } from "react-router";

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