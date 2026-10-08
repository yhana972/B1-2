
import {Link} from "react-router"

function HomePage(){
    return(
        <section className="hero">
            <h1>Running Log</h1>
            <p>
                나의 러닝을 기록하고<br />
                케이던스에 맞는 음악 템포를 찾아보세요.
            </p>
            <Link className="button" to="/runs">
                러닝 기록 보기
            </Link>
            <Link className="button" to="/runs/new">
                새 기록 작성
            </Link>
            
        </section>
    )
}
export default HomePage